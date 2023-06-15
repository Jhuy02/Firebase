import React, { Fragment } from "react";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { Button, ButtonBorder } from "../../components/button";
import IconDelete from "../../components/icons/IconDelete";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { db } from "../../firebase-app/firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Label from "../../components/label/Label";
import { useState } from "react";
import ImageUpload from "../../components/image/ImageUpload";
import slugify from "react-slugify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "../../components/input/TextArea";

const PostAddNew = () => {
  const [btn, setBtn] = useState(false);
  const [valueContent, setValueContent] = useState("");
  const { userInfor } = useAuth();
  const { control, setValue, getValues, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      content: "",
      likes: "",
      comment: "",
      image: "",
      tag: "",
      linkTag: "",
      user: {},
    },
  });

  const [user, setUser] = useState([]);
  const userId = userInfor?.uid || "";
  useEffect(() => {
    if (userId !== "") {
      async function fetchData() {
        const colRef = doc(db, "users", userId);
        const dataDoc = await getDoc(colRef);
        setUser(dataDoc.data());
      }
      fetchData();
    } else {
      setUser([]);
    }
  }, [userId]);

  useEffect(() => {
    async function fetchUserData() {
      if (!userInfor?.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfor?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfor?.email]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
    setValueContent(value);
  };

  const {
    setImage,
    image,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(getValues, setValue);

  const claerTextarea = () => {
    const textarea = document.getElementById("content");
    textarea.style.height = "46px";
  };

  const addPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.linkTag = slugify(cloneValues.tag, {
      lower: true,
    });
    const colRefPosts = collection(db, "posts");
    const colRefTag = collection(db, "tag");
    const dateHour = moment().format("HH");
    const day = moment().format("YYYY-MM-DD");

    if (values.tag) {
      const addDocTag = await addDoc(colRefTag, {
        dateHour,
        day,
        timestamp: new Date(),
        likes: "",
        comment: "",
        tag: values.tag,
        linkTag: slugify(cloneValues.tag, {
          lower: true,
        }),
      });
      await addDoc(colRefPosts, {
        ...cloneValues,
        dateHour,
        day,
        timestamp: new Date(),
        likes: "",
        comment: "",
        image,
        userId: userInfor.uid,
        tagId: addDocTag.id,
      });
    }
    if (!values.tag) {
      await addDoc(colRefPosts, {
        ...cloneValues,
        dateHour,
        day,
        timestamp: new Date(),
        likes: "",
        comments: "",
        image,
        userId: userInfor.uid,
        tagId: "",
      });
    }
    toast.success("Thành Công");
    setImage("");
    setBtn(false);
    setProgress(0);
    reset({ content: "", image: "", tag: "", linkTag: "", values: "" });
    setValueContent("");
    claerTextarea();
  };

  const handleBtn = () => {
    setBtn(!btn);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (userInfor?.uid) {
      navigate(`/profile?id=${userInfor?.uid}`);
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <div className="border-b border-s-black">
      <form onSubmit={handleSubmit(addPost)} autoComplete="off">
        <div className="m-2">
          <div className="p-2 relative">
            <div className="flex flex-wrap justify-between items-center w-full">
              <div
                onClick={handleNavigate}
                className="w-[66px] rounded-full object-cover cursor-pointer"
              >
                <img
                  srcSet={user?.imageUser?.imageAvt || "/user-avt.png 6x"}
                  alt=""
                  className="object-cover w-full h-full rounded-full max-h-[66px]"
                />
              </div>
              <div className="flex-1 min-w-[70%] felx">
                <TextArea
                  id="content"
                  name="content"
                  placeholder="Bạn Đang Nghĩ Thế"
                  control={control}
                  onChange={handleInputChange}
                ></TextArea>
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
              {image && (
                <Fragment>
                  <img
                    src={image}
                    className="max-h-[500px] object-cover w-full h-full rounded-xl my-5"
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
    </div>
  );
};

export default PostAddNew;
