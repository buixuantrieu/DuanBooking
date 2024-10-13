/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Modal, Form, Input, Button, notification, Upload } from "antd";
import * as S from "./style";
import { FaCloudUploadAlt, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import {
  createRoomTypeRequest,
  getRoomTypeDetailRequest,
  getRoomTypeRequest,
  updateRoomTypeRequest,
} from "@slices/room.slice";
import { RootState } from "store";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function TypeHomeManager() {
  const [formUpload] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [imageType, setImageType] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomTypeRequest());
  }, [dispatch]);
  const { roomTypeList, roomTypeDetail } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    formUpload.setFieldsValue({
      typeName: roomTypeDetail.data.typeName,
      description: roomTypeDetail.data.description,
    });
    setImageType(roomTypeDetail.data.imageUrl as string);
    setTypeId(Number(roomTypeDetail.data.id));
  }, [roomTypeDetail.data]);

  const handleShowModal = async (id: number) => {
    setShowModal(true);
    dispatch(getRoomTypeDetailRequest({ id }));
  };
  const handleUpdateImage = async (file: any) => {
    try {
      setLoading(true);
      const storageRef = ref(storage, `images/${file[0].name}`);
      await uploadBytes(storageRef, file[0]);
      const url = await getDownloadURL(storageRef);
      setImageType(url);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notification.error({ message: "Tải ảnh thất bại" });
    }
  };
  const handleSubmit = (value: any) => {
    dispatch(
      updateRoomTypeRequest({
        id: Number(typeId),
        data: {
          typeName: value.typeName,
          description: value.description,
          imageUrl: imageType,
        },
      })
    );
    setShowModal(false);
  };
  const handleCreateType = async (value: any) => {
    try {
      setLoading(true);
      const storageRef = ref(storage, `images/${value.image[0].originFileObj.name}`);
      await uploadBytes(storageRef, value.image[0].originFileObj);
      const imageUrl = await getDownloadURL(storageRef);
      dispatch(
        createRoomTypeRequest({
          data: { typeName: value.typeName, description: value.description, imageUrl },
          callback: () => {
            formCreate.resetFields();
            setShowModalCreate(false);
          },
        })
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (item: string) => <img width="30px" src={item} alt="" />,
    },
    {
      title: "Loại phòng",
      dataIndex: "typeName",
      key: "typeName",
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (item: string) => <p>{item}</p>,
    },
    {
      title: "Thao tác",
      dataIndex: "control",
      key: "control",
      render: (_: any, item: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <S.IconUpdate onClick={() => handleShowModal(item.id)}>
            <FaRegEdit />
          </S.IconUpdate>
          <S.IconDelete>
            <MdDeleteForever />
          </S.IconDelete>
        </div>
      ),
    },
  ];
  return (
    <S.TypeWrapper>
      <Modal
        title="Cập nhật loại phòng"
        open={showModal}
        footer={null}
        onCancel={() => {
          setShowModal(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      >
        <Form form={formUpload} layout="vertical" onFinish={handleSubmit}>
          <S.BoxImage>
            <S.IconEdit htmlFor={"id" + typeId}>
              <input
                ref={fileInputRef}
                onChange={(e) => handleUpdateImage(e.target.files)}
                type="file"
                style={{ display: "none" }}
                id={"id" + typeId}
              />
              <FaRegEdit />
            </S.IconEdit>
            <img src={imageType} alt="" />
          </S.BoxImage>
          <Form.Item label="Tên loại phòng:" name="typeName">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả:">
            <Input />
          </Form.Item>

          <Button loading={isLoading} htmlType="submit" type="primary" style={{ width: "100%" }}>
            Cập nhật
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Thêm mới"
        open={showModalCreate}
        footer={null}
        onCancel={() => {
          setShowModalCreate(false);
        }}
      >
        <Form onFinish={handleCreateType} form={formCreate} layout="vertical">
          <Form.Item label="Tên loại phòng:" name="typeName">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả:" name="description">
            <Input />
          </Form.Item>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            name="image"
            label="Hình ảnh:"
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
          <Button loading={isLoading} style={{ width: "100%" }} type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form>
      </Modal>
      <S.TypeTitle>Quản lí loại phòng</S.TypeTitle>
      <Button onClick={() => setShowModalCreate(true)} type="primary" style={{ marginBottom: 12 }}>
        Thêm mới
      </Button>
      <Table rowKey="id" dataSource={roomTypeList.data} columns={columns} />
    </S.TypeWrapper>
  );
}
export default TypeHomeManager;
