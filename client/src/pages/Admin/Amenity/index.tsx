/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Modal, Form, Input, Button, notification, Upload } from "antd";
import * as S from "./style";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import {
  createAmenityRequest,
  createRoomTypeRequest,
  getAmenityDetailRequest,
  getAmenityRequest,
  updateAmenityRequest,
} from "@slices/room.slice";
import { RootState } from "store";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AmenityManager() {
  const [formUpload] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [amenityId, setAmenityId] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAmenityRequest());
  }, [dispatch]);
  const { amenityList, amenityDetail } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    formUpload.setFieldsValue({
      amenityName: amenityDetail.data.amenityName,
      description: amenityDetail.data.description,
    });
    setAmenityId(Number(amenityDetail.data.id));
  }, [amenityDetail.data]);

  const handleShowModal = async (id: number) => {
    setShowModal(true);
    dispatch(getAmenityDetailRequest({ id }));
  };
  const handleSubmit = (value: any) => {
    dispatch(
      updateAmenityRequest({
        id: Number(amenityId),
        data: {
          amenityName: value.amenityName,
          description: value.description,
        },
      })
    );
    setShowModal(false);
  };
  const handleCreateType = async (value: any) => {
    dispatch(
      createAmenityRequest({
        data: { amenityName: value.amenityName, description: value.description },
      })
    );
    setShowModalCreate(false);
  };
  const columns = [
    {
      title: "Tên tiện nghi",
      dataIndex: "amenityName",
      key: "amenityName",
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
        title="Cập nhật tiện nghi"
        open={showModal}
        footer={null}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <Form form={formUpload} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Tên tiện nghi:" name="amenityName">
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
          <Form.Item label="Tên tiện nghi:" name="amenityName">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả:" name="description">
            <Input />
          </Form.Item>
          <Button loading={isLoading} style={{ width: "100%" }} type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form>
      </Modal>
      <S.TypeTitle>Quản lí tiện nghi</S.TypeTitle>
      <Button onClick={() => setShowModalCreate(true)} type="primary" style={{ marginBottom: 12 }}>
        Thêm mới
      </Button>
      <Table rowKey="id" dataSource={amenityList.data} columns={columns} />
    </S.TypeWrapper>
  );
}
export default AmenityManager;
