/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "./style";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useEffect, useMemo } from "react";
import { getBookingByUserIdRequest, updateCreateBookingRequest } from "@slices/booking.slice";
import dayjs from "dayjs";
import Paypal from "../../../Paypal";
import { Empty } from "antd";
function BookingHistory() {
  const dispatch = useDispatch();

  const { bookingList } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    dispatch(getBookingByUserIdRequest());
  }, []);
  const renderBookingList = useMemo(
    () =>
      bookingList.data.map((item, index) => {
        return (
          <S.BoxContainer key={index}>
            <S.ContentContainer>
              {item.Payment?.status == 0 ? (
                <S.StatusPending>Đang chờ thanh toán</S.StatusPending>
              ) : item.Payment?.status == 1 ? (
                <S.StatusSuccess>Đã thanh toán</S.StatusSuccess>
              ) : item.Payment?.status === 2 ? (
                <S.StatusUnavailable>Phòng đã được người khác đặt</S.StatusUnavailable>
              ) : (
                <S.StatusRefund>Chờ hoàn tiền</S.StatusRefund>
              )}

              <S.Label>Tên Phòng:</S.Label>
              <S.Content>{item.room?.roomName}</S.Content>
            </S.ContentContainer>
            <S.ContentContainer>
              <S.Label>Địa chỉ:</S.Label>
              <S.Content>{item.room?.location}</S.Content>
            </S.ContentContainer>
            <S.ContentContainer>
              <S.Label>Tổng tiền:</S.Label>
              <S.Content>{item.totalPrice?.toLocaleString("en-US")}.00$</S.Content>
            </S.ContentContainer>
            <S.ContentContainer>
              <S.Label>Ngày nhận phòng:</S.Label>
              <S.Content>2:00 - {dayjs(item.checkIn).subtract(1, "day").format("DD/MM/YYYY")}</S.Content>
            </S.ContentContainer>
            <S.ContentContainer>
              <S.Label>Ngày trả phòng:</S.Label>
              <S.Content>12:00 - {dayjs(item.checkOut).subtract(1, "day").format("DD/MM/YYYY")}</S.Content>
            </S.ContentContainer>
            <S.ContentContainer>
              <S.Label>Tên khách hàng:</S.Label>
              <S.Content>{item.customerName}</S.Content>
            </S.ContentContainer>
            <S.ContentContainer>
              <S.Label>Số điện thoại:</S.Label>
              <S.Content>{item.phone}</S.Content>
            </S.ContentContainer>
            <S.ContentContainer>
              <S.Label>Email:</S.Label>
              <S.Content>{item.email}</S.Content>
            </S.ContentContainer>
            {item.Payment?.status === 0 && (
              <div style={{ width: 100, marginTop: 16 }}>
                <Paypal
                  createBooking={() => null}
                  callback={() =>
                    dispatch(
                      updateCreateBookingRequest({
                        data: {
                          checkIn: item.checkIn,
                          checkOut: item.checkOut,
                          customerId: item.customerId,
                          roomId: item.roomId,
                        },
                      })
                    )
                  }
                  amount={Number(item.totalPrice)}
                />
              </div>
            )}
          </S.BoxContainer>
        );
      }),
    [bookingList.data]
  );
  return (
    <S.BookingHistoryWrapper>
      <S.BookingHistoryTitle>Lịch sử đặt phòng</S.BookingHistoryTitle>
      {bookingList.data.length == 0 ? (
        <Empty style={{ marginTop: 100 }} description="Bạn chưa đặt phòng nào cả!" />
      ) : (
        renderBookingList
      )}
    </S.BookingHistoryWrapper>
  );
}
export default BookingHistory;
