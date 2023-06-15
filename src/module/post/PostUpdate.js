import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import IconDelete from "../../components/icons/IconDelete";
import ImageUpload from "../../components/image/ImageUpload";
import { Button, ButtonBorder } from "../../components/button";
import { useForm } from "react-hook-form";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebase-app/firebase-config";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import slugify from "react-slugify";
import { toast } from "react-toastify";
import moment from "moment";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const [valueContent, setValueContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [btn, setBtn] = useState(true);
  const { userInfor } = useAuth();
  const navigate = useNavigate();
  const postId = params.get("id");

  const { control, getValues, setValue, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: { content: "", image: "", tag: "", linkTag: "" },
  });
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const dataDoc = await getDoc(colRef);
      setPostImage(dataDoc.data().image);
      reset(dataDoc.data());
      setValueContent(dataDoc.data().content);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);
  const { image, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(getValues, setValue);
  if (!postId) return null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
    setValueContent(value);
  };

  const handleUpdate = async (values) => {
    const colRef = doc(db, "posts", postId);
    const colRefTag = collection(db, "tag");
    const dateHour = moment().format("HH");
    const day = moment().format("YYYY-MM-DD");
    if (image) {
      await updateDoc(colRef, {
        image,
        content: values.content,
        linkTag: slugify(values.tag, { lower: true }),
        tag: values.tag,
        hourUpdate: dateHour,
        dayUpdate: day,
      });
    } else {
      await updateDoc(colRef, {
        content: values.content,
        linkTag: slugify(values.tag, { lower: true }),
        tag: values.tag,
        hourUpdate: dateHour,
        dayUpdate: day,
      });
    }
    if (values.tag && values.tagId) {
      const tagId = values?.tagId;
      const colRefTagId = doc(db, "tag", tagId);
      await updateDoc(colRefTagId, {
        tag: values.tag,
        linkTag: slugify(values.tag, { lower: true }),
        hourUpdate: dateHour,
        dayUpdate: day,
      });
    } else {
      await addDoc(colRefTag, {
        dateHour,
        day,
        tag: values.tag,
        linkTag: slugify(values.tag, {
          lower: true,
        }),
      });
    }
    toast.success("update thành công");
    navigate("/");
  };

  const handleBtn = () => {
    setBtn(!btn);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)} autoComplete="off">
      <div className="m-2">
        <div className="p-2 relative">
          <div className="flex flex-wrap justify-between items-center w-full">
            <div className="w-[66px]">
              <img
                srcSet="/logo-signup.png 6x"
                alt=""
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-[70%]">
              <Input
                name="content"
                onChange={handleInputChange}
                placeholder="Bạn Đang Nghĩ Thế"
                control={control}
                bgWhite
              ></Input>
            </div>
            {btn && (
              <div className="mt-3 w-full">
                <Label htmlFor="tag" style={{ fontWeight: 500 }}>
                  Tag
                </Label>
                <Input
                  name="tag"
                  placeholder="Nhập tag"
                  control={control}
                ></Input>
              </div>
            )}
          </div>
          <div className="relative">
            {!image && postImage && (
              <Fragment>
                <img
                  src={postImage}
                  className="object-cover w-full h-full rounded-xl my-5"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 z-10 flex items-center justify-center w-16 h-16 text-red-500 transition-all rounded-full cursor-pointer hover:bg-slate-100"
                  onClick={handleDeleteImage}
                >
                  <IconDelete></IconDelete>
                </button>
              </Fragment>
            )}
            {image && (
              <Fragment>
                <img
                  src={image}
                  className="object-cover w-full h-full rounded-xl my-5"
                  alt=""
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 z-10 flex items-center justify-center w-16 h-16 text-red-500 transition-all rounded-full cursor-pointer hover:bg-slate-100"
                  onClick={handleDeleteImage}
                >
                  <IconDelete></IconDelete>
                </button>
              </Fragment>
            )}
          </div>
          {!image && (
            <div
              className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress"
              style={{
                width: `${Math.ceil(progress)}%`,
              }}
            ></div>
          )}
        </div>
        <div className="p-2 flex justify-between items-center">
          <div className="flex flex-1 flex-wrap">
            <div className="mx-1">
              <ImageUpload onChange={handleSelectImage}></ImageUpload>
            </div>
            <div className="mx-1">
              <ButtonBorder onClick={handleBtn}></ButtonBorder>
            </div>
          </div>
          {image && !valueContent && userInfor && (
            <Button
              elementStyle="blue"
              type="submit"
              center
              style={{ maxWidth: "150px", height: "40px", margin: 0 }}
            >
              Đăng Bài
            </Button>
          )}
          {valueContent !== "" && userInfor && (
            <Button
              elementStyle="blue"
              type="submit"
              center
              style={{ maxWidth: "150px", height: "40px", margin: 0 }}
            >
              Đăng Bài
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PostUpdate;
