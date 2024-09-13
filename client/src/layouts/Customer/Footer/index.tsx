import * as S from "./styles";
function Footer() {
  return (
    <S.FooterContainer>
      <S.FooterSection>
        &copy; {new Date().getFullYear()} Dịch vụ Thuê Nhà. Bản quyền thuộc về công ty Mingsu.
      </S.FooterSection>
      <S.FooterSection>
        <S.FooterLink to={""}>Giới Thiệu</S.FooterLink>
        <S.FooterLink to={""}>Liên Hệ</S.FooterLink>
        <S.FooterLink to={""}>Điều Khoản Dịch Vụ</S.FooterLink>
        <S.FooterLink to={""}>Chính Sách Bảo Mật</S.FooterLink>
      </S.FooterSection>
      <S.FooterSection>
        Theo dõi chúng tôi:
        <S.FooterLink to={""}>Facebook</S.FooterLink>|<S.FooterLink to={""}>Twitter</S.FooterLink>|
        <S.FooterLink to={""}>Instagram</S.FooterLink>
      </S.FooterSection>
    </S.FooterContainer>
  );
}
export default Footer;
