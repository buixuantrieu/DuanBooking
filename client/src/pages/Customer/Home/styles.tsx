import styled from "styled-components";
import { media } from "@constants/media";
import { Link } from "react-router-dom";

export const HomeWrapper = styled.div``;
export const BannerContainer = styled.div`
  padding: 28px;
  width: 100%;
  @media ${media.desktop} {
    padding: 24px;
  }
  @media ${media.tablet} {
    padding: 20px;
  }
  @media ${media.mobile} {
    padding: 16px;
  }
`;
export const BannerContent = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
  & button {
    width: max-content;
  }
  @media ${media.tablet} {
    & button {
      font-size: 11px;
    }
  }
  @media ${media.mobile} {
    & button {
      font-size: 13px;
    }
  }
`;
export const BannerImage = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
export const TitleBanner = styled.div`
  font-weight: bold;
  font-size: 40px;
  color: #50547f;
  @media ${media.desktop} {
    font-size: 28px;
  }
  @media ${media.tablet} {
    font-size: 24px;
  }
  @media ${media.mobile} {
    font-size: 24px;
  }
`;
export const DescriptionBanner = styled.div`
  font-weight: 300;
  line-height: 1.4;
  margin: 28px 0;
  color: gray;
  @media ${media.tablet} {
    margin: 8px 0;
    font-size: 11px;
  }
  @media ${media.mobile} {
    margin: 14px 0;
    font-size: 13px;
  }
`;
export const BannerSlogan = styled.img`
  margin: 100px 0;
  margin-bottom: 200px;
  @media ${media.desktop} {
    margin-bottom: 150px;
  }
  @media ${media.tablet} {
    margin-bottom: 125px;
  }
  @media ${media.mobile} {
    margin-bottom: 100px;
  }
`;
export const BoxHome = styled.div`
  width: 100%;
  background-image: url(src/assets/image/BoxHomeStay.png);
  background-size: 100%;
  background-position: center;
  padding: 15%;
  & img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 0 10px #50547f;
  }
`;
export const StatisticalWrapper = styled.div`
  padding: 40px;
  margin: 100px 0;
  background: linear-gradient(to right, #dfd5f918, #dfd5f9, #dfd5f918);
  @media ${media.desktop} {
    padding: 32px 14px;
  }
  @media ${media.tablet} {
    padding: 28px 12px;
  }
  @media ${media.mobile} {
    padding: 28px 12px;
    margin-bottom: 40px;
  }
`;
export const BoxStatistical = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  gap: 18px;
  @media ${media.desktop} {
    gap: 16px;
  }
  @media ${media.tablet} {
    gap: 12px;
  }
  @media ${media.mobile} {
    gap: 12px;
  }
`;
export const TitleStatistical = styled.span`
  font-size: 19px;
  font-weight: 500;
  color: #50547f;
  @media ${media.desktop} {
    font-size: 18px;
  }
  @media ${media.tablet} {
    font-size: 17px;
  }
  @media ${media.mobile} {
    font-size: 16px;
  }
`;
export const DesStatistical = styled.span`
  font-size: 18px;
  font-weight: 300;
  font-style: italic;
  color: black;
  display: flex;
  align-items: start;
  & span {
    color: #ffa200;
    font-size: 20px;
  }
  @media ${media.desktop} {
    font-size: 15px;
    & span {
      font-size: 18px;
    }
  }
  @media ${media.tablet} {
    font-size: 14px;
    & span {
      font-size: 18px;
    }
  }
  @media ${media.mobile} {
    font-size: 12px;
    & span {
      font-size: 16px;
    }
  }
`;
export const PartnerContainer = styled.div``;
export const PartnerContent = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
`;
export const TitlePartner = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #50547f;
  margin-bottom: 24px;
  @media ${media.tablet} {
    font-size: 14px;
  }
  @media ${media.mobile} {
    font-size: 16px;
  }
`;
export const TopHomeContainer = styled.div``;
export const LabelPartner = styled.div`
  color: #50547f;
  font-weight: 500;
  @media ${media.tablet} {
    font-size: 13px;
  }
`;
export const UlPartner = styled.ul`
  color: #50547f;
  @media ${media.tablet} {
    font-size: 11px;
  }
`;
export const TitleTopHome = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #50547f;
  margin-top: 100px;
  margin-bottom: 40px;
  text-align: center;
`;
export const HomeStayBox = styled.div`
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 4px;
`;
export const HomeImage = styled.img``;
export const TitleBoxHome = styled.div`
  margin: 6px 0 4px 0;
  font-size: 18px;
  font-weight: 500;
  /* min-height: 43px; */
  @media ${media.desktop} {
    font-size: 16px;
    margin: 4px 0 2px 0;
  }
  @media ${media.mobile} {
    font-size: 16px;
    margin: 4px 0 2px 0;
  }
`;
export const RateHomeContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 8px;
  @media ${media.desktop} {
    gap: 2px;
  }
  @media ${media.mobile} {
    gap: 2px;
  }
`;
export const RateNumber = styled.span`
  color: black;
`;
export const RateDes = styled.span`
  color: gray;
  font-size: 10px;
  @media ${media.desktop} {
    font-size: 6px;
  }
  @media ${media.mobile} {
    font-size: 6px;
  }
`;
export const RateStar = styled.span`
  color: #ffa200;
  font-size: 16px;
  @media ${media.desktop} {
    font-size: 5px;
  }
  @media ${media.mobile} {
    font-size: 5px;
  }
`;
export const PriceBoxHome = styled.div`
  display: flex;
  align-items: end;
  font-size: 12px;
  color: gray;
  @media ${media.desktop} {
    font-size: 6px;
  }
  @media ${media.mobile} {
    font-size: 6px;
  }
`;
export const PriceTitle = styled.span`
  color: black;
  font-size: 16px;
  font-weight: 500;
  @media ${media.desktop} {
    font-size: 10px;
  }
  @media ${media.mobile} {
    font-size: 10px;
  }
`;
export const PriceNumber = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: red;
  margin-left: 4px;
  @media ${media.desktop} {
    font-size: 12px;
  }
  @media ${media.mobile} {
    font-size: 12px;
  }
`;
export const Owner = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;
  font-size: 12px;
  @media ${media.desktop} {
    font-size: 6px;
    gap: 4px;
  }
  @media ${media.mobile} {
    font-size: 6px;
    gap: 4px;
  }
`;
export const OwnerTitle = styled.span``;
export const OwnerName = styled(Link)`
  @media ${media.desktop} {
    font-size: 8px;
  }
  @media ${media.mobile} {
    font-size: 8px;
  }
`;
export const PriceViewLike = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  @media ${media.desktop} {
    margin-top: 6px;
  }
  @media ${media.mobile} {
    margin-top: 6px;
  }
`;
export const ViewLikeContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 4px;
  font-size: 12px;
  font-style: italic;
  & span {
    color: black;
    font-weight: 500;
  }
  @media ${media.desktop} {
    font-size: 6px;
    gap: 1px;
  }
  @media ${media.mobile} {
    font-size: 6px;
    gap: 1px;
  }
`;
export const ReviewBox = styled.div`
  padding: 40px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: justify;
  border-radius: 8px;
  height: 100%;
  background-color: #e3e4f3;
  font-weight: 300;
  @media ${media.desktop} {
    padding: 16px;
    font-size: 13px;
  }
  @media ${media.mobile} {
    padding: 16px;
    font-size: 13px;
  }
`;
export const IconReview = styled.span`
  font-size: 28px;
  margin: 0 12px;
  color: #6f76b8;
`;
