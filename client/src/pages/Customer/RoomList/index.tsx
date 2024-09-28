/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col, Card, Checkbox, Input, Slider, Select, Rate, Button } from "antd";
import * as S from "./style";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineFavorite } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

import { getAmenityRequest, getRoomTypeRequest, getRoomRequest } from "@slices/room.slice";
import { RootState } from "store";
import { ROUTES } from "@constants/routes";

function RoomList() {
  const [pricePerNight, setPricePerNight] = useState([0, 10000000]);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });

    return {
      q: (params.q as string) || "",
      sort: typeof params.sort === "string" ? params.sort : undefined,
      amenityIds: Array.isArray(params.amenityIds) ? params.amenityIds.map((item) => Number(item)) : [],
      priceRange: Array.isArray(params.priceRange) ? params.priceRange.map((price) => Number(price)) : pricePerNight,
      typeRoomId: typeof params.typeRoomId === "string" ? Number(params.typeRoomId) : undefined,
    };
  }, [search]);

  useEffect(() => {
    dispatch(getAmenityRequest());
    dispatch(getRoomTypeRequest());
  }, []);

  useEffect(() => {
    dispatch(getRoomRequest({ data: searchParams }));
  }, [searchParams]);

  const { roomTypeList, amenityList, roomList } = useSelector((state: RootState) => state.room);

  const handleFilter = (key: string, value: string | string[] | number | number[] | undefined) => {
    const newFilterParams = { ...searchParams, [key]: value };
    navigate(`${ROUTES.USER.ROOM_LIST}?${qs.stringify(newFilterParams)}`);
  };

  const renderRoomList = useMemo(
    () =>
      roomList.data.map((item, index) => {
        const rate = item.Review?.reduce((total, item) => (total += Number(item.rate)), 0);
        const valueRate = Number(rate) / Number(item.Review?.length);

        return (
          <Col key={index} span={8}>
            <S.BoxRoomContainer>
              <S.RoomImage src={item.image} />
              <S.TypeRoomTitle>{item.roomType?.typeName}</S.TypeRoomTitle>
              <S.RoomTitle to={generatePath(ROUTES.USER.ROOM_DETAIL, { id: item.id })}>{item.roomName}</S.RoomTitle>
              <Rate style={{ fontSize: 16, color: "#ee4d2d" }} disabled value={valueRate} allowHalf /> /
              <span style={{ fontSize: 10 }}> ( {item.Review?.length} đánh giá )</span>
              <S.LabelContainer>
                <S.RoomLabel>Địa chỉ: </S.RoomLabel>
                <S.Address> {item.location}</S.Address>
              </S.LabelContainer>
              <S.LabelContainer>
                <S.RoomLabel>Chủ: </S.RoomLabel>
                <S.Owner href="#"> {item.user?.profile?.fullName}</S.Owner>
              </S.LabelContainer>
              <S.LabelContainer>
                <S.RoomLabel>Giá thuê:</S.RoomLabel>
                <S.PricePerNight>{item.pricePerNight?.toLocaleString()}</S.PricePerNight>
                <GiMoneyStack style={{ fontSize: 18 }} />/
                <span style={{ color: "gray", fontSize: 10, transform: "translateY(10px)" }}>đêm</span>
              </S.LabelContainer>
              <S.IconWrapper>
                <S.IconContainer>
                  <S.LabelIcon>{item.Favorite?.length}</S.LabelIcon>
                  <MdOutlineFavorite />
                </S.IconContainer>
                <S.IconContainer>
                  <S.LabelIcon>{item.view}</S.LabelIcon>
                  <FaEye />
                </S.IconContainer>
                <S.IconContainer>
                  <S.LabelIcon>
                    1.000 <span style={{ fontStyle: "italic", fontSize: 12 }}>lượt đặt</span>
                  </S.LabelIcon>
                </S.IconContainer>
              </S.IconWrapper>
            </S.BoxRoomContainer>
          </Col>
        );
      }),
    [roomList.data]
  );

  const renderTypeList = useMemo(
    () =>
      roomTypeList.data.map((item, index) => {
        return (
          <S.BoxTypeRoom
            $active={searchParams.typeRoomId == item.id}
            key={index}
            onClick={() => handleFilter("typeRoomId", item.id as number)}
          >
            <S.ImageTypeRoom src={item.imageUrl} />
            <S.TypeRoomName>{item.typeName}</S.TypeRoomName>
          </S.BoxTypeRoom>
        );
      }),
    [roomTypeList.data, searchParams]
  );
  const renderAmenityList = useMemo(
    () =>
      amenityList.data.map((item, index) => {
        return (
          <Col key={index} span={12}>
            <Checkbox value={item.id}>{item.amenityName}</Checkbox>
          </Col>
        );
      }),
    [amenityList.data]
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Input
                value={searchParams.q}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter("q", e.target.value)}
                placeholder="Nhập phòng cần tìm..."
              />
            </Col>
            <Col span={24}>
              <S.LabelFilter>Tiện nghi:</S.LabelFilter>
            </Col>
            <Col span={24}>
              <Checkbox.Group
                value={searchParams.amenityIds}
                style={{ width: "100%" }}
                onChange={(value) => handleFilter("amenityIds", value)}
              >
                <Row>{renderAmenityList}</Row>
              </Checkbox.Group>
            </Col>
            <Col span={24}>
              <S.LabelFilter>Giá thuê phòng:</S.LabelFilter>
            </Col>
            <Col span={24}>
              <Slider
                range
                value={searchParams.priceRange}
                min={0}
                max={10000000}
                onChange={(value) => {
                  setPricePerNight(value);
                  handleFilter("priceRange", value);
                }}
              />
            </Col>
            <Col span={24}>
              <S.LabelFilter>Sắp xếp:</S.LabelFilter>
            </Col>
            <Col span={24}>
              <Select
                allowClear
                value={searchParams.sort}
                style={{ width: "100%" }}
                onChange={(value) => handleFilter("sort", value)}
                options={[
                  {
                    label: "Giá thuê phòng tăng dần",
                    value: "pricePerNight_asc",
                  },
                  {
                    label: "Giá thuê phòng giảm dần",
                    value: "pricePerNight_desc",
                  },
                  {
                    label: "Lượt xem",
                    value: "view_desc",
                  },
                  {
                    label: "Lượt yêu thích",
                    value: "pricePerNight1_desc",
                  },
                  {
                    label: "Lượt đặt phòng",
                    value: "pricePerNight2_desc",
                  },
                ]}
              />
            </Col>
            <Col>
              <Button onClick={() => navigate(ROUTES.USER.ROOM_LIST)}>Làm mới</Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={18}>
        <Card>
          <S.BoxTypeRoomWrapper>
            <S.BoxTypeRoomLeft></S.BoxTypeRoomLeft>
            <S.BoxTypeRoomCenterWrapper>
              <S.BoxTypeRoomContainer>
                <S.BoxTypeRoom
                  $active={searchParams.typeRoomId == undefined}
                  onClick={() => handleFilter("typeRoomId", undefined)}
                >
                  <S.ImageTypeRoom src="https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg" />
                  <S.TypeRoomName>Tất cả</S.TypeRoomName>
                </S.BoxTypeRoom>
                {renderTypeList}
              </S.BoxTypeRoomContainer>
            </S.BoxTypeRoomCenterWrapper>
            <S.BoxTypeRoomRight></S.BoxTypeRoomRight>
          </S.BoxTypeRoomWrapper>
          <Row gutter={[24, 24]}>{renderRoomList}</Row>
        </Card>
      </Col>
    </Row>
  );
}
export default RoomList;
