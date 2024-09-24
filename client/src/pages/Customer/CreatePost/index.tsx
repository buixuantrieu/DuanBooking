/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Row, Form, Col, Input, Button, Select, Upload, Radio, Checkbox } from "antd";
import * as S from "./styles";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useMemo, useState } from "react";
import { b64EncodeUnicode } from "../../../ultils/file";

import { RcFile } from "antd/lib/upload";
import { getDistrictRequest, getProvinceRequest, getWardRequest } from "@slices/address.slice";
import { getRoomTypeRequest, getAmenityRequest, createRoomRequest } from "@slices/room.slice";

import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { FaCloudUploadAlt } from "react-icons/fa";

function CreatePost() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomTypeRequest());
    dispatch(getProvinceRequest());
    dispatch(getAmenityRequest());
  }, []);
  const [contentProduct, setContentProduct] = useState("");
  const { provinceList } = useSelector((state: RootState) => state.address);
  const { districtList } = useSelector((state: RootState) => state.address);
  const { wardList } = useSelector((state: RootState) => state.address);
  const { roomTypeList, amenityList } = useSelector((state: RootState) => state.room);

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

  const handleCreate = async (values: {
    title: string;
    roomName: string;
    province: number;
    ward: number;
    district: number;
    roomTypeId: number;
    address: string;
    pricePerNight: number;
    amenities: number;
    images: { originFileObj: RcFile }[];
    avatar: { originFileObj: RcFile }[];
  }) => {
    const description = b64EncodeUnicode(contentProduct);
    const provinceData = provinceList.data.find((item) => item.province_id === values.province);
    const districtData = districtList.data.find((item) => item.district_id === values.district);
    const wardData = wardList.data.find((item) => item.wards_id === values.ward);
    const address = `${values.address}, ${wardData?.name}, ${districtData?.name}, ${provinceData?.name}`;

    try {
      const uploadPromises = values.images.map(async (item) => {
        const storageRef = ref(storage, `images/${item.originFileObj.name}`);
        await uploadBytes(storageRef, item.originFileObj);
        return getDownloadURL(storageRef);
      });
      const uploadPromise = async () => {
        const storageRef = ref(storage, `images/${values.avatar[0].originFileObj.name}`);
        await uploadBytes(storageRef, values.avatar[0].originFileObj);
        return getDownloadURL(storageRef);
      };
      const imageUrls = await Promise.all(uploadPromises);
      const avatar = await uploadPromise();

      dispatch(
        createRoomRequest({
          data: {
            title: values.title,
            roomName: values.roomName,
            image: avatar,
            description: description,
            districtId: values.district,
            provinceId: values.province,
            wardId: values.ward,
            location: address,
            pricePerNight: Number(values.pricePerNight),
            roomTypeId: values.roomTypeId,
            amenities: values.amenities,
            imageList: imageUrls,
          },
        })
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <S.CreatePostWrapper>
      <Card title="Tạo bài đăng">
        <Form form={form} layout="vertical" onFinish={handleCreate}>
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
                  initialValue="<h3>Mingsu booking xin chào!<h1/>"
                  onEditorChange={handleEditorChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
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
                    <Upload listType="picture" beforeUpload={() => false} maxCount={10}>
                      <Button icon={<FaCloudUploadAlt />}>Bấm để tải ảnh lên</Button>
                    </Upload>
                  </Form.Item>
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
                  <Form.Item name="pricePerNight" label="Giá phòng 1 đêm:">
                    <Input />
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
          <Button htmlType="submit">Tạo bài đăng</Button>
        </Form>
      </Card>
    </S.CreatePostWrapper>
  );
}

export default CreatePost;
