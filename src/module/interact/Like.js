import Tippy from "@tippyjs/react";
import React from "react";
import { useAuth } from "../../contexts/auth-context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import IconLike from "../../components/icons/IconLike";
import IconUnlike from "../../components/icons/IconUnLike";
import { useNavigate } from "react-router-dom";

const Like = ({ data }) => {
  const { userInfor } = useAuth();
  const navigate = useNavigate();
  if (!data) return null;

  const handleLike = async (postId, likes) => {
    if (!userInfor) {
      navigate("/sign-up");
      return;
    }
    const colRef = doc(db, "posts", postId);
    if (likes === 0) {
      await updateDoc(colRef, {
        likes: [userInfor.uid],
      });
      return;
    }

    if (likes?.includes(userInfor.uid)) {
      const updatedLikes = likes.filter((uid) => uid !== userInfor.uid);
      //filter để tạo một mảng mới updatedLikes chỉ chứa các phần tử khác với userInfor.uid
      await updateDoc(colRef, { likes: updatedLikes });
    } else {
      await updateDoc(colRef, {
        likes: [...likes, userInfor.uid],
      });
    }
  };
  return (
    <Tippy
      content={`${
        data?.likes?.includes(userInfor?.uid)
          ? "Hủy Thích Bài Viết"
          : "Thích Bài Viết"
      }`}
    >
      <button
        onClick={() => handleLike(data?.id, data?.likes || 0)}
        className="cursor-pointer text-center p-2 mx-1 rounded-lg flex-1 flex items-center justify-center border border-sky-300 hover:bg-slate-300"
      >
        {data?.likes?.includes(userInfor?.uid) ? (
          <IconLike className="text-pink-500"></IconLike>
        ) : (
          <IconUnlike></IconUnlike>
        )}
        <span className="mx-2">{data?.likes?.length || "0"}</span>
      </button>
    </Tippy>
  );
};

export default Like;
