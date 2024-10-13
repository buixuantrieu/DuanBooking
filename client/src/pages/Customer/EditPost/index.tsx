/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Row, Form, Col, Input, Button, Select, Radio, Checkbox, InputNumber, notification } from "antd";
import * as S from "./styles";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useMemo, useState } from "react";
import { b64DecodeUnicode, b64EncodeUnicode } from "../../../ultils/file";
import { getDistrictRequest, getProvinceRequest, getWardRequest } from "@slices/address.slice";
import {
  getRoomTypeRequest,
  getAmenityRequest,
  getRoomDetailRequest,
  updateRoomRequest,
  updateSubImageRequest,
} from "@slices/room.slice";
import { FcEditImage } from "react-icons/fc";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import { ROUTES } from "@constants/routes";

function EditPost() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomTypeRequest());
    dispatch(getProvinceRequest());
    dispatch(getAmenityRequest());
    dispatch(getRoomDetailRequest({ id: Number(id) }));
  }, []);

  const [contentProduct, setContentProduct] = useState("");
  const { provinceList } = useSelector((state: RootState) => state.address);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { districtList } = useSelector((state: RootState) => state.address);
  const { wardList } = useSelector((state: RootState) => state.address);
  const { roomTypeList, amenityList, roomDetail } = useSelector((state: RootState) => state.room);
  const description = b64DecodeUnicode(roomDetail.data.description);

  useEffect(() => {
    if (userInfo.data.Partner) {
      if (!userInfo.data.Partner.isApproved) {
        navigate(ROUTES.USER.HOME);
      }
    }
  }, [userInfo.data.Partner]);
  useEffect(() => {
    const amenities = roomDetail.data?.RoomAmenity?.map((item) => item.amenityId);

    form.setFieldsValue({
      roomName: roomDetail.data.roomName,
      title: roomDetail.data.title,
      pricePerNight: roomDetail.data.pricePerNight,
      address: roomDetail.data.location?.split(",")[0],
      roomTypeId: roomDetail.data.roomTypeId,
      amenities,
    });
  }, [roomDetail.data]);

  const renderRoomTypeOptions = useMemo(() => {
    return roomTypeList.data.map((item) => (
      <Col span={4} key={item.id}>
        <Radio value={item.id}>{item.typeName}</Radio>
      </Col>
    ));
  }, [roomTypeList.data]);
  const renderAmenityOptions = useMemo(() => {
    return amenityList.data.map((item) => (
      <Col span={4} key={item.id}>
        <Checkbox value={item.id}>{item.amenityName}</Checkbox>
      </Col>
    ));
  }, [amenityList.data]);

  const renderProvincesOptions = useMemo(() => {
    return provinceList.data.map((province) => (
      <Select.Option key={province.province_id} value={province.province_id}>
        {province.name}
      </Select.Option>
    ));
  }, [provinceList.data]);
  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((district) => (
      <Select.Option key={district.district_id} value={district.district_id}>
        {district.name}
      </Select.Option>
    ));
  }, [districtList.data]);

  const renderWardOptions = useMemo(() => {
    return wardList.data.map((ward) => (
      <Select.Option key={ward.wards_id} value={ward.wards_id}>
        {ward.name}
      </Select.Option>
    ));
  }, [wardList.data]);

  const handleEditorChange = (content: string) => {
    setContentProduct(content);
  };

  const handleUploadSubImage = async (imageId: number, file: any) => {
    try {
      const storageRef = ref(storage, `images/${file[0].name}`);
      await uploadBytes(storageRef, file[0]);
      const url = await getDownloadURL(storageRef);
      dispatch(updateSubImageRequest({ id: imageId, productId: Number(id), data: { image: url } }));
    } catch (e) {
      notification.error({ message: "Tải ảnh thất bại" });
    }
  };
  const handleUpdateImage = async (file: any) => {
    try {
      const storageRef = ref(storage, `images/${file[0].name}`);
      await uploadBytes(storageRef, file[0]);
      const url = await getDownloadURL(storageRef);
      dispatch(
        updateRoomRequest({
          id: Number(id),
          data: { image: url },
          callback: () => {
            dispatch(getRoomDetailRequest({ id: Number(id) }));
            notification.success({ message: "Cập nhật ảnh đại diện thành công!" });
          },
        })
      );
    } catch (e) {
      notification.error({ message: "Tải ảnh thất bại" });
    }
  };

  const handleUpdateRoom = async (values: {
    title: string;
    roomName: string;
    province: number;
    ward: number;
    district: number;
    roomTypeId: number;
    address: string;
    pricePerNight: number;
    amenities: number;
  }) => {
    const description = b64EncodeUnicode(contentProduct);
    const provinceData = provinceList.data.find((item) => item.province_id === values.province);
    const districtData = districtList.data.find((item) => item.district_id === values.district);
    const wardData = wardList.data.find((item) => item.wards_id === values.ward);
    const address = `${values.address}, ${wardData?.name}, ${districtData?.name}, ${provinceData?.name}`;
    const newData = {
      roomName: values.roomName,
      title: values.title,
      location: address,
      pricePerNight: values.pricePerNight,
      roomTypeId: values.roomTypeId,
      amenities: values.amenities,
      description,
      districtId: values.district,
      provinceId: values.province,
      wardId: values.ward,
    };
    dispatch(
      updateRoomRequest({
        id: Number(id),
        data: newData,
        callback: () => notification.success({ message: "Cập nhật thành công" }),
      })
    );
  };
  const renderSubImage = useMemo(
    () =>
      roomDetail.data.RoomImage?.map((item, index) => {
        return (
          <Col key={index} span={8}>
            <S.SubBoxImage>
              <S.EditIcon htmlFor={item.id + "subImage"}>
                <input
                  id={item.id + "subImage"}
                  style={{ display: "none" }}
                  onChange={(e) => handleUploadSubImage(Number(item.id), e.target.files)}
                  type="file"
                />
                <FcEditImage />
              </S.EditIcon>
              <img style={{ aspectRatio: "3/2" }} width="100%" src={item.image} alt="" />
            </S.SubBoxImage>
          </Col>
        );
      }),
    [roomDetail.data]
  );

  return (
    <S.CreatePostWrapper>
      <Card title="Chỉnh sửa bài đăng">
        <Form form={form} layout="vertical" onFinish={handleUpdateRoom}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="roomName"
                label="Tên phòng:"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Tiêu đề bài viết:"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả:">
                <Editor
                  apiKey="wx24lnxfdf57f0ws653fif0kkt3bggp0rz6snp9d9uzv3zib"
                  init={{
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                    setup: (editor) => {
                      editor.on("GetContent", (e) => {
                        if (e.format === "html") {
                          e.content = e.content.replace(/<img([^>]*)>/g, "<img$1 />");
                        }
                      });
                    },
                  }}
                  initialValue={description}
                  onEditorChange={handleEditorChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                {/* <Col span={12}>
                  <Form.Item
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    name="avatar"
                    label="Ảnh đại diện phòng:"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
                      <Button icon={<FaCloudUploadAlt />}>Bấm để tải ảnh lên</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    name="images"
                    label="Ảnh chi tiết phòng (Tối đa 10 ảnh):"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Upload multiple listType="picture" beforeUpload={() => false} maxCount={10}>
                      <Button icon={<FaCloudUploadAlt />}>Bấm để tải ảnh lên</Button>
                    </Upload>
                  </Form.Item>
                </Col> */}

                <Col span={8}>
                  <Card style={{ width: "100%" }} title="Ảnh đại diện:">
                    <S.SubBoxImage>
                      <S.EditIcon htmlFor={roomDetail.data.id + "image"}>
                        <input
                          id={roomDetail.data.id + "image"}
                          style={{ display: "none" }}
                          onChange={(e) => handleUpdateImage(e.target.files)}
                          type="file"
                        />
                        <FcEditImage />
                      </S.EditIcon>
                      <img style={{ aspectRatio: "3/2" }} width="100%" src={roomDetail.data.image} alt="" />
                    </S.SubBoxImage>
                  </Card>
                </Col>
                <Col span={16}>
                  <Card style={{ width: "100%" }} title="Ảnh mô tả:">
                    <Row gutter={[16, 16]}>{renderSubImage}</Row>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card title="Loại phòng">
                    <Form.Item
                      name="roomTypeId"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống!",
                        },
                      ]}
                    >
                      <Radio.Group style={{ width: "100%" }}>
                        <Row gutter={[16, 16]}>{renderRoomTypeOptions}</Row>
                      </Radio.Group>
                    </Form.Item>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card title="Tiện nghi">
                    <Form.Item
                      name="amenities"
                      rules={[
                        {
                          required: true,
                          message: "Không được để trống!",
                        },
                      ]}
                    >
                      <Checkbox.Group style={{ width: "100%" }}>
                        <Row gutter={[16, 16]}>{renderAmenityOptions}</Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </Card>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="pricePerNight"
                    label="Giá phòng 1 đêm:"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                      {
                        type: "number",
                        message: "Định dạng số!",
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Địa chỉ:"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <span style={{ fontWeight: "bold" }}>Địa chỉ cũ: </span>
                  <span>{roomDetail.data.location}</span>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Tỉnh/ Thành phố:"
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getDistrictRequest({ province_id: value }));
                        form.setFieldsValue({
                          district: undefined,
                          ward: undefined,
                        });
                      }}
                    >
                      {renderProvincesOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Quận/ Huyện:"
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getWardRequest({ district_id: value }));
                        form.setFieldsValue({
                          ward: undefined,
                        });
                      }}
                      disabled={!form.getFieldValue("province")}
                    >
                      {renderDistrictOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Phường/ Xã:"
                    name="ward"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Select disabled={!form.getFieldValue("district")}>{renderWardOptions}</Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Button type="primary" loading={amenityList.loading} htmlType="submit">
            Cập nhật
          </Button>
        </Form>
      </Card>
    </S.CreatePostWrapper>
  );
}

export default EditPost;
