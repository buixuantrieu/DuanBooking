/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getRoomDetailRequest, updateRoomRequest } from "@slices/room.slice";
import { RootState } from "store";
import * as S from "./style";
import { b64DecodeUnicode } from "ultils/file";
import { Button, notification } from "antd";
import { ROUTES } from "@constants/routes";
function PostDetailManager() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { roomDetail } = useSelector((state: RootState) => state.room);
  const [imageMain, setImageMain] = useState<string | undefined>("");
  useEffect(() => {
    setImageMain(roomDetail.data.image);
  }, [roomDetail.data]);

  const description = b64DecodeUnicode(roomDetail.data.description);
  const renderBoxImage = useMemo(
    () =>
      roomDetail.data.RoomImage?.map((item, index) => {
        return (
          <S.BoxImage
            $active={imageMain === item.image}
            onClick={() => setImageMain(item.image)}
            key={index}
            src={item.image}
          />
        );
      }),
    [roomDetail.data, imageMain]
  );

  useEffect(() => {
    dispatch(getRoomDetailRequest({ id: Number(id) }));
  }, []);

  const handleApprove = (id: number) => {
    dispatch(
      updateRoomRequest({
        id,
        data: { isApproved: true },
        callback: () => {
          navigate(ROUTES.ADMIN.POST);
          notification.success({ message: "Phê duyệt bài viết thành công!" });
        },
      })
    );
  };
  const handleDelete = (id: number) => {
    dispatch(
      updateRoomRequest({
        id,
        data: { isDelete: true },
        callback: () => {
          navigate(ROUTES.ADMIN.POST);
          notification.success({ message: "Đã từ chối bài viết!" });
        },
      })
    );
  };

  return (
    <>
      <S.ButtonWrapper>
        <Button onClick={() => navigate(ROUTES.ADMIN.POST)} type="text">
          Quay lại
        </Button>
        <S.ButtonContainer>
          {!roomDetail.data.isApproved ? (
            <>
              <Button onClick={() => handleApprove(Number(roomDetail.data.id))} type="primary">
                Phê duyệt
              </Button>
              <Button onClick={() => handleDelete(Number(roomDetail.data.id))} danger>
                Từ chối
              </Button>
            </>
          ) : (
            <Button onClick={() => handleDelete(Number(roomDetail.data.id))} danger>
              Xóa bài viết
            </Button>
          )}
        </S.ButtonContainer>
      </S.ButtonWrapper>
      <S.PostDetailWrapper>
        <S.PostName>{roomDetail.data.roomName}</S.PostName>
        <S.RoomImageMain src={imageMain} />
        <S.BoxImageWrapper>
          <S.BoxImageContainer>{renderBoxImage}</S.BoxImageContainer>
        </S.BoxImageWrapper>
        <S.RoomDescription dangerouslySetInnerHTML={{ __html: description }}></S.RoomDescription>
      </S.PostDetailWrapper>
    </>
  );
}
export default PostDetailManager;
