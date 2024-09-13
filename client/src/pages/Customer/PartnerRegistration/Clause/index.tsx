import * as S from "./styles";

function Clause() {
  return (
    <S.ClauseWrapper>
      <S.ClauseTitle>ĐIỀU KHOẢN HỢP TÁC ĐĂNG BÀI QUẢN LÝ PHÒNG HOMESTAY, KHÁCH SẠN TRÊN NỀN TẢNG MINGSU</S.ClauseTitle>
      <S.Title>1. Đối tượng hợp tác:</S.Title>
      <S.Description>
        Các đối tác sở hữu hoặc quản lý các cơ sở lưu trú như homestay, khách sạn, nhà nghỉ (sau đây gọi chung là "Đối
        Tác") muốn đăng bài quản lý phòng trên nền tảng Mingsu (sau đây gọi là "Nền Tảng").
      </S.Description>
      <S.Title>2. Phạm vi hợp tác:</S.Title>
      <S.Description>
        - Đối Tác đồng ý sử dụng Nền Tảng để đăng tải thông tin và quảng cáo các dịch vụ lưu trú của mình. <br />- Nền
        Tảng sẽ cung cấp các dịch vụ quảng bá, quản lý đặt phòng, và hỗ trợ thanh toán cho các khách hàng đặt phòng
        thông qua Nền Tảng.
      </S.Description>
      <S.Title>3. Phí dịch vụ:</S.Title>
      <S.Description>
        - Nền Tảng sẽ thu phí dịch vụ bằng 10% trên tổng số tiền mà khách hàng thanh toán cho mỗi lần đặt phòng thành
        công qua Nền Tảng. <br />- Phí dịch vụ sẽ được trừ trực tiếp từ số tiền thanh toán của khách hàng trước khi
        chuyển đến Đối Tác.
      </S.Description>
      <S.Title>4. Quy trình thanh toán:</S.Title>
      <S.Description>
        - Số tiền sau khi trừ phí dịch vụ sẽ được chuyển vào tài khoản ngân hàng mà Đối Tác đã cung cấp cho Nền Tảng
        theo chu kỳ thanh toán định kỳ hàng tuần hoặc theo thỏa thuận khác giữa hai bên. <br />- Đối Tác có trách nhiệm
        cung cấp đầy đủ và chính xác thông tin tài khoản ngân hàng để nhận thanh toán.
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
          - Trong trường hợp vi phạm các điều khoản hợp tác, bên không vi phạm có quyền chấm dứt hợp tác ngay lập tức và
          yêu cầu bồi thường nếu có thiệt hại xảy ra.
        </div>
      </S.Description>
      <S.Title>7. Các điều khoản khác:</S.Title>
      <S.Description>
        <div>
          - Các tranh chấp phát sinh từ hoặc liên quan đến hợp đồng này sẽ được giải quyết thông qua thương lượng giữa
          các bên. Nếu không thể thương lượng, tranh chấp sẽ được giải quyết tại tòa án có thẩm quyền.
        </div>
        <div>
          - Hợp đồng này có hiệu lực từ ngày ký và có thời hạn cho đến khi một trong hai bên chấm dứt hợp tác theo điều
          khoản 6.
        </div>
      </S.Description>
    </S.ClauseWrapper>
  );
}
export default Clause;
