import React from "react";
import { FieldConten } from "../../components/field";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import Swal from "sweetalert2";
import IconDelete from "../../components/icons/IconDelete";
import { useNavigate } from "react-router-dom";
import IconUpdate from "../../components/icons/IconUpdate";

const ModuleUpdatepost = ({ data }) => {
  const navigate = useNavigate();

  const handleDeletePost = async (docId, tagId) => {
    const colRef = doc(db, "posts", docId);
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể hoàn nguyên điều này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa nó!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        if (tagId) {
          const colRefTag = doc(db, "tag", tagId);
          await deleteDoc(colRefTag);
        }
        Swal.fire("Đã xóa!", "bài của bạn đã được xóa.", "success");
      }
    });
  };

  return (
    <div className="my-5 text-base">
      <FieldConten
        onClick={() => handleDeletePost(data?.id, data?.tagId)}
        className={
          "py-3 m-auto max-w-[170px] rounded-lg text-base hover:bg-slate-900 group:"
        }
      >
        <IconDelete className="mx-2 group-hover:bg-slate-900"></IconDelete>
        Xóa bài viết
      </FieldConten>
      <FieldConten
        onClick={() => navigate(`/update?id=${data?.id}`)}
        className={
          "py-3 m-auto max-w-[170px] rounded-lg text-base hover:bg-slate-900 group:"
        }
      >
        <IconUpdate className="group-hover:bg-slate-900"></IconUpdate>
        Sửa bài viết
      </FieldConten>
    </div>
  );
};

export default ModuleUpdatepost;
