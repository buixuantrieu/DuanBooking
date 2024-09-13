import { Button, Row, Col } from "antd";
import * as S from "./styles";
import { GiHomeGarage } from "react-icons/gi";
import { IoMdStar } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { GoComment } from "react-icons/go";
import { GrFormView } from "react-icons/gr";
import { Collapse, Rate } from "antd";
import { FaQuoteLeft } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";
function Home() {
  return (
    <S.HomeWrapper>
      <S.BannerContainer>
        <Row gutter={{ xl: 100, sm: 40 }}>
          <Col xs={24} sm={12}>
            <S.BannerContent>
              <S.TitleBanner>Khám Phá Những Homestay Đẹp Nhất Cho Kỳ Nghỉ Của Bạn</S.TitleBanner>
              <S.DescriptionBanner>
                Với hơn 1,000 homestay, villa, và căn hộ trải dài khắp Việt Nam, chúng tôi mang đến cho bạn trải nghiệm
                tìm kiếm và đặt chỗ dễ dàng. Chỉ với vài cú nhấp chuột, bạn có thể nhanh chóng tìm được nơi nghỉ dưỡng
                hoàn hảo cho kỳ nghỉ của mình. Tận hưởng sự tiện lợi và đa dạng trong lựa chọn chỗ ở, từ những căn hộ
                hiện đại đến những homestay ấm cúng, tất cả đều sẵn sàng chờ đón bạn.
              </S.DescriptionBanner>
              <Button type="primary" ghost>
                Khám phá ngay
              </Button>
            </S.BannerContent>
          </Col>
          <Col xs={24} sm={12}>
            <S.BannerImage>
              <img src="src/assets/image/Banner-Home.png" alt="" />
            </S.BannerImage>
          </Col>
        </Row>
      </S.BannerContainer>
      <S.BannerSlogan src="src/assets/image/BannerSlogan.png" />
      <Row gutter={{ xs: 48, sm: 100, md: 40, xl: 125 }}>
        <Col xs={12} md={8}>
          <S.BoxHome>
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-1187667217831248481/original/44c3ce21-b40a-4df6-a62f-a01ee544a819.jpeg?im_w=720"
              alt=""
            />
          </S.BoxHome>
        </Col>
        <Col xs={12} md={8}>
          <S.BoxHome className="background-one">
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-858313563150392687/original/f47850e4-6896-4f8a-b1ac-0351c55269bd.jpeg?im_w=720"
              alt=""
            />
          </S.BoxHome>
        </Col>
        <Col xs={0} md={8}>
          <S.BoxHome>
            <img src="https://a0.muscache.com/im/pictures/42576437-124d-4c76-a498-d90528579560.jpg?im_w=720" alt="" />
          </S.BoxHome>
        </Col>
      </Row>
      <S.StatisticalWrapper>
        <Row gutter={{ xs: 20 }}>
          <Col span={8}>
            <S.BoxStatistical>
              <S.TitleStatistical>HomeStay</S.TitleStatistical>
              <S.DesStatistical>
                1.500 <GiHomeGarage />
              </S.DesStatistical>
            </S.BoxStatistical>
          </Col>
          <Col span={8}>
            <S.BoxStatistical>
              <S.TitleStatistical>Đánh giá</S.TitleStatistical>
              <S.DesStatistical>
                4,1
                <span>
                  <IoMdStar />
                </span>
                / (111 rate)
              </S.DesStatistical>
            </S.BoxStatistical>
          </Col>
          <Col span={8}>
            <S.BoxStatistical>
              <S.TitleStatistical>Booking</S.TitleStatistical>
              <S.DesStatistical>1.500 lượt</S.DesStatistical>
            </S.BoxStatistical>
          </Col>
        </Row>
      </S.StatisticalWrapper>
      <S.PartnerContainer>
        <Row gutter={{ sm: 16, md: 40 }}>
          <Col xs={24} sm={10} md={12}>
            <img src="src/assets/image/HomePartner.png" alt="" />
          </Col>
          <Col xs={24} sm={14} md={12}>
            <S.PartnerContent>
              <S.TitlePartner>Bạn có muốn làm đối tác với MingSu?</S.TitlePartner>
              <Collapse
                items={[
                  {
                    key: "1",
                    label: <S.LabelPartner>Lợi ích khi trở thành đối tác của Mingsu</S.LabelPartner>,
                    children: (
                      <S.UlPartner>
                        <li>
                          <b>Đăng tin miễn phí</b>: Đăng tin cho thuê nhà miễn phí với hệ thống quản lý đơn giản và tiện
                          lợi.
                        </li>
                        <li>
                          <b>Tiếp cận khách hàng tiềm năng</b>: Tiếp cận hàng nghìn khách hàng đang tìm kiếm chỗ ở phù
                          hợp.
                        </li>
                        <li>
                          <b>Hỗ trợ marketing</b>: Được hỗ trợ quảng bá bài đăng để thu hút sự chú ý của nhiều khách
                          hàng hơn.
                        </li>
                        <li>
                          <b>Tăng doanh thu</b>: Tối ưu hóa tỷ lệ cho thuê và tăng doanh thu từ bất động sản của bạn.
                        </li>
                      </S.UlPartner>
                    ),
                  },
                  {
                    key: "2",
                    label: <S.LabelPartner>Quy trình hợp tác dễ dàng</S.LabelPartner>,
                    children: (
                      <S.UlPartner>
                        <li>
                          <b>Bước 1</b>: Đăng ký tài khoản đối tác trên Mingsu.
                        </li>
                        <li>
                          <b>Bước 2</b>: Đăng bài cho thuê nhà với mô tả chi tiết và hình ảnh.
                        </li>
                        <li>
                          <b>Bước 3</b>: Quản lý các yêu cầu thuê và đặt chỗ từ khách hàng.
                        </li>
                      </S.UlPartner>
                    ),
                  },
                  {
                    key: "3",
                    label: <S.LabelPartner>Các gói dịch vụ đa dạng</S.LabelPartner>,
                    children: (
                      <S.UlPartner>
                        <li>
                          <b>Gói cơ bản</b>: Đăng tin miễn phí với hỗ trợ cơ bản.
                        </li>
                        <li>
                          <b>Gói nâng cao</b>: Đăng tin với hỗ trợ SEO, đẩy tin lên đầu trang.
                        </li>
                        <li>
                          <b>Gói Vip</b>: Hỗ trợ quảng cáo mạnh mẽ, bài viết nổi bật trên trang chủ.
                        </li>
                      </S.UlPartner>
                    ),
                  },
                  {
                    key: "4",
                    label: <S.LabelPartner>Hướng dẫn đăng ký và bắt đầu</S.LabelPartner>,
                    children: (
                      <S.UlPartner>
                        <li>
                          <b>Tạo tài khoản</b>: Đăng ký nhanh chóng và miễn phí.
                        </li>
                        <li>
                          <b>Hướng dẫn đăng tin</b>: Hướng dẫn chi tiết từng bước về cách đăng tin cho thuê.
                        </li>
                        <li>
                          <b>Liên hệ hỗ trợ</b>: Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ 24/7.
                        </li>
                      </S.UlPartner>
                    ),
                  },
                ]}
              />
            </S.PartnerContent>
          </Col>
        </Row>
      </S.PartnerContainer>
      <S.TitleTopHome>HomeStay nổi bật</S.TitleTopHome>
      <S.TopHomeContainer>
        <Row gutter={[24, 24]}>
          <Col xs={12} md={6}>
            <S.HomeStayBox>
              <S.HomeImage src="https://a0.muscache.com/im/pictures/miso/Hosting-44400573/original/06d9b4f1-af9b-411e-942e-526ba4063096.jpeg?im_w=720" />
              <S.TitleBoxHome>HomeStay</S.TitleBoxHome>
              <S.RateHomeContainer>
                <Rate style={{ color: "#ffa200", fontSize: 10 }} allowHalf disabled value={4.5} />

                <S.RateDes>/ (114 đánh giá)</S.RateDes>
              </S.RateHomeContainer>
              <S.Owner>
                <S.OwnerTitle>Người cho thuê: </S.OwnerTitle>
                <S.OwnerName to={""}>Bùi Xuân Triều</S.OwnerName>
              </S.Owner>
              <S.PriceViewLike>
                <S.PriceBoxHome>
                  <S.PriceTitle>Giá:</S.PriceTitle>
                  <S.PriceNumber> 4.000.000</S.PriceNumber> / ngày
                </S.PriceBoxHome>
              </S.PriceViewLike>
              <S.PriceViewLike style={{ margin: "16px 0 0 0" }}>
                <S.ViewLikeContainer>
                  <span>1000</span> lượt đặt phòng
                </S.ViewLikeContainer>
                <S.ViewLikeContainer>
                  109 <MdFavorite /> 22 <GoComment /> 1000 <GrFormView />
                </S.ViewLikeContainer>
              </S.PriceViewLike>
            </S.HomeStayBox>
          </Col>
          <Col xs={12} md={6}>
            <S.HomeStayBox>
              <S.HomeImage src="https://a0.muscache.com/im/pictures/miso/Hosting-44400573/original/06d9b4f1-af9b-411e-942e-526ba4063096.jpeg?im_w=720" />
              <S.TitleBoxHome>HomeStay</S.TitleBoxHome>
              <S.RateHomeContainer>
                <Rate style={{ color: "#ffa200", fontSize: 10 }} disabled value={1} />

                <S.RateDes>/ (114 đánh giá)</S.RateDes>
              </S.RateHomeContainer>
              <S.Owner>
                <S.OwnerTitle>Người cho thuê: </S.OwnerTitle>
                <S.OwnerName to={""}>Bùi Xuân Triều</S.OwnerName>
              </S.Owner>
              <S.PriceViewLike>
                <S.PriceBoxHome>
                  <S.PriceTitle>Giá:</S.PriceTitle>
                  <S.PriceNumber> 4.000.000</S.PriceNumber> / ngày
                </S.PriceBoxHome>
              </S.PriceViewLike>
              <S.PriceViewLike style={{ margin: "16px 0 0 0" }}>
                <S.ViewLikeContainer>
                  <span>1000</span> lượt đặt phòng
                </S.ViewLikeContainer>
                <S.ViewLikeContainer>
                  109 <MdFavorite /> 22 <GoComment /> 1000 <GrFormView />
                </S.ViewLikeContainer>
              </S.PriceViewLike>
            </S.HomeStayBox>
          </Col>
          <Col xs={12} md={6}>
            <S.HomeStayBox>
              <S.HomeImage src="https://a0.muscache.com/im/pictures/miso/Hosting-44400573/original/06d9b4f1-af9b-411e-942e-526ba4063096.jpeg?im_w=720" />
              <S.TitleBoxHome>HomeStay</S.TitleBoxHome>
              <S.RateHomeContainer>
                <Rate style={{ color: "#ffa200", fontSize: 10 }} disabled value={1} />

                <S.RateDes>/ (114 đánh giá)</S.RateDes>
              </S.RateHomeContainer>
              <S.Owner>
                <S.OwnerTitle>Người cho thuê: </S.OwnerTitle>
                <S.OwnerName to={""}>Bùi Xuân Triều</S.OwnerName>
              </S.Owner>
              <S.PriceViewLike>
                <S.PriceBoxHome>
                  <S.PriceTitle>Giá:</S.PriceTitle>
                  <S.PriceNumber> 4.000.000</S.PriceNumber> / ngày
                </S.PriceBoxHome>
              </S.PriceViewLike>
              <S.PriceViewLike style={{ margin: "16px 0 0 0" }}>
                <S.ViewLikeContainer>
                  <span>1000</span> lượt đặt phòng
                </S.ViewLikeContainer>
                <S.ViewLikeContainer>
                  109 <MdFavorite /> 22 <GoComment /> 1000 <GrFormView />
                </S.ViewLikeContainer>
              </S.PriceViewLike>
            </S.HomeStayBox>
          </Col>
          <Col xs={12} md={6}>
            <S.HomeStayBox>
              <S.HomeImage src="https://a0.muscache.com/im/pictures/miso/Hosting-44400573/original/06d9b4f1-af9b-411e-942e-526ba4063096.jpeg?im_w=720" />
              <S.TitleBoxHome>HomeStay</S.TitleBoxHome>
              <S.RateHomeContainer>
                <Rate style={{ color: "#ffa200", fontSize: 10 }} disabled value={1} />

                <S.RateDes>/ (114 đánh giá)</S.RateDes>
              </S.RateHomeContainer>
              <S.Owner>
                <S.OwnerTitle>Người cho thuê: </S.OwnerTitle>
                <S.OwnerName to={""}>Bùi Xuân Triều</S.OwnerName>
              </S.Owner>
              <S.PriceViewLike>
                <S.PriceBoxHome>
                  <S.PriceTitle>Giá:</S.PriceTitle>
                  <S.PriceNumber> 4.000.000</S.PriceNumber> / ngày
                </S.PriceBoxHome>
              </S.PriceViewLike>
              <S.PriceViewLike style={{ margin: "16px 0 0 0" }}>
                <S.ViewLikeContainer>
                  <span>1000</span> lượt đặt phòng
                </S.ViewLikeContainer>
                <S.ViewLikeContainer>
                  109 <MdFavorite /> 22 <GoComment /> 1000 <GrFormView />
                </S.ViewLikeContainer>
              </S.PriceViewLike>
            </S.HomeStayBox>
          </Col>
        </Row>
      </S.TopHomeContainer>
      <S.TitleTopHome>Phản hồi từ khách hàng</S.TitleTopHome>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <S.ReviewBox>
            <S.IconReview>
              <FaQuoteLeft />
            </S.IconReview>
            Chúng tôi rất hài lòng khi trở thành đối tác của Mingsu. Từ khi hợp tác, việc quản lý và đăng tải homestay
            trở nên vô cùng dễ dàng và hiệu quả. Giao diện quản lý trực quan, dễ sử dụng và cung cấp đầy đủ công cụ để
            chúng tôi có thể tùy chỉnh, quảng bá các căn hộ của mình một cách tối ưu nhất. Không chỉ vậy, đội ngũ hỗ trợ
            của website rất nhiệt tình, luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ chúng tôi trong việc nâng cao chất
            lượng dịch vụ. Chúng tôi nhận thấy lượng khách hàng tìm đến homestay của mình tăng lên rõ rệt từ khi bắt đầu
            hợp tác. Đây thực sự là một nền tảng tuyệt vời cho những ai muốn cho thuê homestay một cách chuyên nghiệp và
            hiệu quả!"
            <S.IconReview>
              <FaQuoteRight />
            </S.IconReview>
          </S.ReviewBox>
        </Col>
        <Col xs={24} md={12}>
          <S.ReviewBox>
            <S.IconReview>
              <FaQuoteLeft />
            </S.IconReview>
            Tôi đã có một trải nghiệm tuyệt vời khi sử dụng Mingsu để tìm và đặt homestay cho kỳ nghỉ của mình. Giao
            diện website rất thân thiện và dễ sử dụng, giúp tôi dễ dàng tìm kiếm và so sánh giữa nhiều lựa chọn homestay
            phù hợp với nhu cầu của mình. Tất cả các thông tin về giá cả, tiện nghi, và đánh giá đều rất rõ ràng và minh
            bạch, giúp tôi tự tin hơn khi đưa ra quyết định. Đặt phòng nhanh chóng, dễ dàng và không gặp bất kỳ rắc rối
            nào. Tôi chắc chắn sẽ tiếp tục sử dụng [Tên Website] cho những chuyến đi sắp tới và sẽ giới thiệu cho bạn
            bè, người thân để họ cũng có được những trải nghiệm tuyệt vời như tôi!
            <S.IconReview>
              <FaQuoteRight />
            </S.IconReview>
          </S.ReviewBox>
        </Col>
      </Row>
    </S.HomeWrapper>
  );
}
export default Home;
