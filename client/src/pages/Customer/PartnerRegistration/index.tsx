import React, { useEffect, useMemo, useState } from "react";
import { Button, message, Steps, Form, Select, Row, Col, Input, Radio } from "antd";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getDistrictRequest, getProvinceRequest, getWardRequest } from "@slices/address.slice";
import { RootState } from "store";

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProvinceRequest());
  }, []);
  const { provinceList } = useSelector((state: RootState) => state.address);
  const { districtList } = useSelector((state: RootState) => state.address);
  const { wardList } = useSelector((state: RootState) => state.address);

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
  const steps = [
    {
      title: "Điều khoản hợp đồng",
      content: (
        <S.ClauseWrapper>
          <S.ClauseTitle>
            ĐIỀU KHOẢN HỢP TÁC ĐĂNG BÀI QUẢN LÝ PHÒNG HOMESTAY, KHÁCH SẠN TRÊN NỀN TẢNG MINGSU
          </S.ClauseTitle>
          <S.Title>1. Đối tượng hợp tác:</S.Title>
          <S.Description>
            Các đối tác sở hữu hoặc quản lý các cơ sở lưu trú như homestay, khách sạn, nhà nghỉ (sau đây gọi chung là
            "Đối Tác") muốn đăng bài quản lý phòng trên nền tảng Mingsu (sau đây gọi là "Nền Tảng").
          </S.Description>
          <S.Title>2. Phạm vi hợp tác:</S.Title>
          <S.Description>
            - Đối Tác đồng ý sử dụng Nền Tảng để đăng tải thông tin và quảng cáo các dịch vụ lưu trú của mình. <br />-
            Nền Tảng sẽ cung cấp các dịch vụ quảng bá, quản lý đặt phòng, và hỗ trợ thanh toán cho các khách hàng đặt
            phòng thông qua Nền Tảng.
          </S.Description>
          <S.Title>3. Phí dịch vụ:</S.Title>
          <S.Description>
            - Nền Tảng sẽ thu phí dịch vụ bằng 10% trên tổng số tiền mà khách hàng thanh toán cho mỗi lần đặt phòng
            thành công qua Nền Tảng. <br />- Phí dịch vụ sẽ được trừ trực tiếp từ số tiền thanh toán của khách hàng
            trước khi chuyển đến Đối Tác.
          </S.Description>
          <S.Title>4. Quy trình thanh toán:</S.Title>
          <S.Description>
            - Số tiền sau khi trừ phí dịch vụ sẽ được chuyển vào tài khoản ngân hàng mà Đối Tác đã cung cấp cho Nền Tảng
            theo chu kỳ thanh toán định kỳ hàng tuần hoặc theo thỏa thuận khác giữa hai bên. <br />- Đối Tác có trách
            nhiệm cung cấp đầy đủ và chính xác thông tin tài khoản ngân hàng để nhận thanh toán.
          </S.Description>
          <S.Title>5. Trách nhiệm của các bên:</S.Title>
          <S.Description>
            <S.Title>- Trách nhiệm của Nền Tảng:</S.Title>
            <div>+ Đảm bảo các thông tin đăng tải trên Nền Tảng chính xác, rõ ràng và thu hút khách hàng.</div>
            <div>
              + Hỗ trợ Đối Tác trong việc quản lý đặt phòng và giải quyết các vấn đề phát sinh liên quan đến dịch vụ đặt
              phòng.
            </div>
            <S.Title>- Trách nhiệm của Đối Tác:</S.Title>
            <div>
              + Cung cấp đầy đủ và chính xác các thông tin về cơ sở lưu trú và dịch vụ đi kèm để đăng tải trên Nền Tảng.
            </div>
            <div>+ Đảm bảo các dịch vụ cung cấp cho khách hàng đúng như thông tin đã đăng tải trên Nền Tảng.</div>
          </S.Description>
          <S.Title>6. Điều khoản chấm dứt hợp tác:</S.Title>
          <S.Description>
            <p>- Mỗi bên có quyền chấm dứt hợp tác bằng cách thông báo trước cho bên kia ít nhất 30 ngày.</p>
            <div>
              - Trong trường hợp vi phạm các điều khoản hợp tác, bên không vi phạm có quyền chấm dứt hợp tác ngay lập
              tức và yêu cầu bồi thường nếu có thiệt hại xảy ra.
            </div>
          </S.Description>
          <S.Title>7. Các điều khoản khác:</S.Title>
          <S.Description>
            <div>
              - Các tranh chấp phát sinh từ hoặc liên quan đến hợp đồng này sẽ được giải quyết thông qua thương lượng
              giữa các bên. Nếu không thể thương lượng, tranh chấp sẽ được giải quyết tại tòa án có thẩm quyền.
            </div>
            <div>
              - Hợp đồng này có hiệu lực từ ngày ký và có thời hạn cho đến khi một trong hai bên chấm dứt hợp tác theo
              điều khoản 6.
            </div>
          </S.Description>
        </S.ClauseWrapper>
      ),
    },
    {
      title: "Second",
      content: (
        <S.InfoWrapper>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Họ tên đầy đủ:"
                name="fullName"
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
                label="Số điện thoại:"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Không đúng định dạng!",
                  },
                  {
                    min: 10,
                    max: 11,
                    message: "Từ 10 - 11 số!",
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
            <Col span={24}>
              <Form.Item
                label="Địa chỉ:"
                name="address"
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
              <Form.Item name="method" label="Phương thức nhận tiền:" initialValue="paypal">
                <Radio.Group
                  name="method"
                  options={[
                    {
                      label: "Paypal",
                      value: "paypal",
                    },
                    {
                      label: "ATM",
                      value: "ATM",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
            <Col span={24}>
              <Form.Item
                label="Email nhận tiền (Paypal):"
                name="paypal"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                  {
                    type: "email",
                    message: "Không đúng định dạng!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </S.InfoWrapper>
      ),
    },
    {
      title: "Last",
      content: "Processing complete!",
    },
  ];

  const next = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData((prevData) => ({ ...prevData, ...values }));
        setCurrent(current + 1);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleDone = () => {
    message.success("Processing complete!");
    console.log("All form data:", formData);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      <S.ContentWrapper>
        <Form form={form} layout="vertical" name={`stepForm-${current}`}>
          {steps[current].content}
        </Form>
      </S.ContentWrapper>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleDone}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default App;
