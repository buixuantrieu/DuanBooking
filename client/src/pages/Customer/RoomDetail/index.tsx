/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getRoomDetailRequest } from "@slices/room.slice";
import { createCommentRequest, createReviewRequest, getCommentRequest, getReviewRequest } from "@slices/rate.slice";
import * as S from "./style";

import { Row, Col, Card, Tabs, Form, Input, Button, Rate, notification, DatePicker } from "antd";
import { RootState } from "store";
import { b64DecodeUnicode } from "ultils/file";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { TbNorthStar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
dayjs.extend(isSameOrBefore);

dayjs.extend(isBetween);
import "dayjs/locale/vi";
import { addInfoBookingTemporary, getBookingByRoomIdRequest } from "@slices/booking.slice";
import { ROUTES } from "@constants/routes";
dayjs.extend(relativeTime);
dayjs.locale("vi");
function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { RangePicker } = DatePicker;

  const [formComment] = Form.useForm();
  const [formReview] = Form.useForm();
  const [formBooking] = Form.useForm();
  const [dateBooking, setDateBooking] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const { roomDetail } = useSelector((state: RootState) => state.room);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { bookingList } = useSelector((state: RootState) => state.booking);
  const { commentList, reviewList } = useSelector((state: RootState) => state.rate);

  const [imageMain, setImageMain] = useState<string | undefined>("");

  const [showMore, setShowMore] = useState(false);

  const description = b64DecodeUnicode(roomDetail.data.description);

  const dispatch = useDispatch();

  const valueRate = useMemo(
    () => reviewList.data.reduce((total, item) => (total += Number(item.rate)), 0),
    [reviewList]
  );

  useEffect(() => {
    setImageMain(roomDetail.data.image);
  }, [roomDetail.data.image]);
  useEffect(() => {
    dispatch(getRoomDetailRequest({ id: Number(id) }));
    dispatch(getCommentRequest({ id }));
    dispatch(getReviewRequest({ id }));
    dispatch(getBookingByRoomIdRequest({ roomId: Number(id) }));
  }, []);

  const bookedDates = useMemo(
    () =>
      bookingList.data.map((item) => {
        return [
          dayjs(item.checkIn).subtract(1, "day").startOf("day"),
          dayjs(item.checkOut).subtract(1, "day").startOf("day"),
        ];
      }),
    [bookingList.data]
  );

  const disabledDate = (current: Dayjs) => {
    if (!current) return false;

    if (current.isBefore(dayjs().startOf("day"))) {
      return true;
    }

    return bookedDates.some(([start, end]) => {
      if (dateBooking) {
        if (current.isBetween(start, end, "day", "[]")) {
          return true;
        }
      } else {
        if (current.isBetween(start, end, "day", "(]")) {
          return true;
        }
      }
      return current.isAfter(start, "day") && current.isBefore(end, "day");
    });
  };
  const onCalendarChange = (dates: [Dayjs | null, Dayjs | null]) => {
    const [checkIn, checkOut] = dates;
    if (checkIn) {
      setDateBooking(false);
    } else {
      setDateBooking(true);
    }
    if (checkIn && checkOut) {
      setTotalPrice(checkOut.diff(checkIn, "day"));
      bookedDates.forEach(([start]) => {
        if (checkIn.isBefore(start) && checkOut.isAfter(start)) {
          setTotalPrice(0);
          notification.warning({ message: "Vui lòng chọn khoản thời gian trống" });
        }
      });
    }
  };

  const renderComment = useMemo(
    () =>
      commentList.data.map((item, index) => {
        return (
          <S.BoxComment key={index}>
            <S.InfoCommentContainer>
              <S.AvatarComment src={item.user?.profile?.avatar} />
              <S.InfoComment>
                <S.UserName>
                  {item.user?.profile?.fullName}{" "}
                  {item.userId == roomDetail.data.user?.id && (
                    <span>
                      <TbNorthStar /> Chủ phòng
                    </span>
                  )}
                </S.UserName>
                <S.DateComment>{dayjs(item.createdAt).fromNow()}</S.DateComment>
              </S.InfoComment>
            </S.InfoCommentContainer>
            <S.ContentComment>{item.content}</S.ContentComment>
          </S.BoxComment>
        );
      }),
    [commentList.data]
  );
  const renderReview = useMemo(
    () =>
      reviewList.data.map((item, index) => {
        return (
          <S.BoxComment key={index}>
            <S.InfoCommentContainer>
              <S.AvatarComment src={item.user?.profile?.avatar} />
              <S.InfoComment>
                <S.UserName>
                  {item.user?.profile?.fullName}
                  {item.userId == roomDetail.data.user?.id && (
                    <span>
                      <TbNorthStar /> Chủ phòng
                    </span>
                  )}
                </S.UserName>
                <Rate value={item.rate} style={{ color: "#ee4d2d", fontSize: 10 }} disabled />
                <S.DateComment>{dayjs(item.createdAt).fromNow()}</S.DateComment>
              </S.InfoComment>
            </S.InfoCommentContainer>
            <S.ContentComment>{item.content}</S.ContentComment>
          </S.BoxComment>
        );
      }),
    [reviewList.data, roomDetail.data]
  );

  const renderBoxImage = useMemo(
    () =>
      roomDetail.data.RoomImage?.map((item, index) => {
        return (
          <S.BoxImage
            $active={imageMain === item.image}
            onClick={() => setImageMain(item.image)}
            key={index}
            src={item.image}
          />
        );
      }),
    [roomDetail.data, imageMain]
  );

  const handleBooking = (value: { dateBooking: Date[] }) => {
    const checkIn = dayjs(value.dateBooking[0]).add(1, "day").toISOString();
    const checkOut = dayjs(value.dateBooking[1]).add(1, "day").toISOString();

    const infoBooking = {
      checkIn,
      checkOut,
      total: totalPrice * Number(roomDetail.data.pricePerNight),
      roomId: Number(id),
      image: roomDetail.data.image,
      countDay: totalPrice,
      price: roomDetail.data.pricePerNight,
      roomName: roomDetail.data.roomName,
    };
    if (!userInfo.data.id) {
      notification.warning({ message: "Bạn cần đăng nhập để thực hiện chức năng này" });
    } else if (totalPrice !== 0) {
      dispatch(addInfoBookingTemporary({ data: infoBooking, callback: () => navigate(ROUTES.USER.BOOKING) }));
    } else {
      notification.warning({ message: "Ngày nhận phòng và trả phòng không thể trùng 1 ngày được!" });
    }
  };

  const checkRate = useMemo(() => {
    return userInfo.data.Booking?.filter((item) => item.roomId == id);
  }, [userInfo.data, id]);

  const checkReview = useMemo(
    () =>
      reviewList.data.filter((item) => {
        return item.roomId == id && item.userId == userInfo.data?.id;
      }),
    [reviewList.data, userInfo.data]
  );

  const handleAddComment = (value: { content: string | undefined }) => {
    const dataComment = { content: value.content, roomId: id };
    dispatch(
      createCommentRequest({
        data: dataComment,
        id: id,
        callback: () => {
          formComment.resetFields();
          notification.success({ message: "Bình luận thành công!" });
        },
      })
    );
  };
  const handelAddReview = (value: { content: string | undefined; rate: number | undefined }) => {
    const dataReview = { content: value.content, rate: value.rate, roomId: id };
    dispatch(
      createReviewRequest({
        data: dataReview,
        id,
        callback: () => {
          formReview.resetFields();
          notification.success({ message: "Bình luận thành công!" });
        },
      })
    );
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={14}>
        <Card>
          <S.RoomImageMain src={imageMain} />
          <S.TitlePost>{roomDetail.data.title}</S.TitlePost>
          <S.BoxImageWrapper>
            <S.BoxImageContainer>{renderBoxImage}</S.BoxImageContainer>
          </S.BoxImageWrapper>
          <S.ContentWrapper>
            <S.RoomDescription $active={showMore} dangerouslySetInnerHTML={{ __html: description }}></S.RoomDescription>
            <S.ButtonShowMore>
              {showMore ? (
                <Button onClick={() => setShowMore(false)}>Thu gọn</Button>
              ) : (
                <Button onClick={() => setShowMore(true)}>Xem thêm</Button>
              )}
            </S.ButtonShowMore>
          </S.ContentWrapper>
        </Card>
      </Col>
      <Col span={10}>
        <Card>
          <S.TitleRoomType>{roomDetail.data.roomType?.typeName}</S.TitleRoomType>
          <S.TitleRoom>{roomDetail.data.roomName}</S.TitleRoom>
          <Rate style={{ color: "#ee4d2d" }} value={valueRate / reviewList.data.length} allowHalf disabled /> /
          <span style={{ fontSize: 12 }}> ( {reviewList.data.length} đánh giá )</span>
          <S.TotalPrice>
            <S.LabelTotal>Giá thuê phòng:</S.LabelTotal>
            <S.PriceTotal>
              <span style={{ fontWeight: 500 }}>{roomDetail.data.pricePerNight?.toLocaleString("en-US")}</span>.00$
              <i style={{ color: "gray", fontWeight: 300 }}>/</i>
              <p style={{ fontSize: 10, color: "gray", transform: "translateY(14px)", fontWeight: 300 }}>ngày</p>
            </S.PriceTotal>
          </S.TotalPrice>
          <Form form={formBooking} onFinish={handleBooking}>
            <Form.Item
              name="dateBooking"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày!",
                },
              ]}
            >
              <RangePicker
                style={{ width: 350 }}
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                showTime={false}
                onCalendarChange={onCalendarChange}
                placeholder={["Ngày nhận phòng", "Ngày trả phòng"]}
              />
            </Form.Item>
            <S.TotalPrice>
              <S.LabelTotal>Tổng tiền:</S.LabelTotal>
              <S.PriceTotal>
                <span style={{ fontWeight: 600, color: "#a8071a" }}>
                  {(Number(roomDetail.data.pricePerNight) * totalPrice).toLocaleString("en-US")} .00$
                </span>
                {totalPrice !== 0 && (
                  <>
                    <i style={{ color: "gray", fontWeight: 300 }}>/</i>
                    <p style={{ fontSize: 10, color: "gray", fontWeight: 300, transform: "translateY(14px)" }}>
                      {" "}
                      {totalPrice} ngày
                    </p>
                  </>
                )}
              </S.PriceTotal>
            </S.TotalPrice>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Đặt phòng
            </Button>
          </Form>
          <Tabs
            style={{ marginTop: 36 }}
            defaultActiveKey="1"
            centered
            items={[
              {
                label: <p style={{ fontWeight: 500, fontSize: 16 }}>Bình luận</p>,
                key: "comment",
                children: (
                  <>
                    <S.FormCommentWrapper>
                      {userInfo.data.id ? (
                        <Form form={formComment} onFinish={handleAddComment}>
                          <Form.Item
                            name="content"
                            rules={[
                              {
                                required: true,
                                message: "Không được để trống!",
                              },
                            ]}
                          >
                            <Input.TextArea style={{ height: 100 }} />
                          </Form.Item>
                          <Button htmlType="submit">Gửi bình luận</Button>
                        </Form>
                      ) : (
                        "Bạn cần đăng nhập để có thể bình luận"
                      )}
                    </S.FormCommentWrapper>
                    {renderComment}
                  </>
                ),
              },
              {
                label: <p style={{ fontWeight: 500, fontSize: 16 }}>Đánh giá</p>,
                key: "rate",
                children: (
                  <>
                    <S.FormCommentWrapper>
                      {!userInfo.data.id ? (
                        "Bạn cần đăng nhập để có thể đánh giá"
                      ) : checkRate?.length == 0 ? (
                        "Bạn cần đặt phòng thành công mới có thể đánh giá"
                      ) : checkReview.length != 0 ? (
                        "Bạn đã đánh giá về phòng này rồi!"
                      ) : (
                        <Form form={formReview} onFinish={handelAddReview}>
                          <Form.Item
                            name="rate"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn sao!",
                              },
                            ]}
                          >
                            <Rate style={{ color: "#ee4d2d" }} />
                          </Form.Item>
                          <Form.Item
                            name="content"
                            rules={[
                              {
                                required: true,
                                message: "Không được để trống!",
                              },
                            ]}
                          >
                            <Input.TextArea style={{ height: 100 }} />
                          </Form.Item>
                          <Button htmlType="submit">Gửi đánh giá</Button>
                        </Form>
                      )}
                    </S.FormCommentWrapper>
                    {renderReview}
                  </>
                ),
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default RoomDetail;
