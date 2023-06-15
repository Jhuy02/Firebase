import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase-app/firebase-config";
import TippyHeader from "@tippyjs/react/headless";
import useToggle from "../../hooks/useToggle";
import { useAuth } from "../../contexts/auth-context";
import IconDost from "../../components/icons/IconDost";
import PostAvt from "../../components/postItem/PostAvt";
import PostUser from "../../components/postItem/PostUser";
import ModuleUpdatepost from "../update/ModuleUpdatepost";
import Like from "../interact/Like";
import { Label } from "../../components/label";
import { useForm } from "react-hook-form";
import IconEnter from "../../components/icons/IconEnter";
import { toast } from "react-toastify";
import Comment from "../interact/Comment";
import moment from "moment";
import TextArea from "../../components/input/TextArea";

const ThreadPost = () => {
  const { userInfor } = useAuth();
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [post, setPost] = useState([]);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState([]);
  const [isToggled, toggle] = useToggle(false);
  const { control, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: { comments: "" },
  });

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userInfor?.uid);
      const dataDoc = await getDoc(colRef);
      setUser(dataDoc.data());
    }
    fetchData();
  }, [userInfor?.uid]);

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const dataDoc = await getDoc(colRef);
      setComment(dataDoc.data()?.comments);
      setPost(dataDoc.data());
    }
    fetchData();
  }, [postId]);

  const handleUpdate = async (values) => {
    const colRef = doc(db, "posts", postId);
    const day = moment().format("YYYY-MM-DD");
    const dateHour = moment().format("HH");
    const cloneValues = {
      user: user,
      comment: values.comments,
      day,
      dateHour,
    };
    await updateDoc(colRef, {
      comments: [...post?.comments, cloneValues],
    });
    reset({ comment: "" });
    toast.success("Thành Công");
  };

  return (
    <>
      <div className="flex py-3 px-4 hover:bg-slate-100 border-b border-neutral-200">
        <PostAvt data={post?.user}></PostAvt>
        <div className="flex-1">
          <div className="flex justify-between">
            <PostUser data={post}></PostUser>
            <TippyHeader
              interactive
              visible={isToggled}
              render={(attrs) => (
                <div
                  tabIndex="-1"
                  {...attrs}
                  className="absolute w-[250px] -left-44 text-white bg-[#0f0f0f] rounded-lg "
                >
                  <ModuleUpdatepost data={post}></ModuleUpdatepost>
                </div>
              )}
              onClickOutside={toggle}
            >
              {post.userId === userInfor?.uid && (
                <div className="relative z-20 w-[35px] h-6 rounded-full hover:bg-slate-400 hover:text-blue-500">
                  <IconDost onClick={toggle}></IconDost>
                </div>
              )}
            </TippyHeader>
          </div>
          <div className="relative">
            {post?.content && <div className="py-3">{post.content}</div>}
            {post?.linkTag && (
              <span className="absolute -translate-y-4 text-sm text-blue-700">
                #{post?.linkTag}
              </span>
            )}
          </div>
          {post.image ? (
            <div className="">
              <img
                src={post.image}
                alt=""
                className="max-h-[500px] object-cover w-full h-full rounded-xl my-5"
              />
            </div>
          ) : null}
          <div className="interact flex justify-between mt-2">
            <Like data={post}></Like>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdate)}
            autoComplete="off"
            className="mt-3 w-full"
          >
            <Label htmlFor="comments" style={{ fontWeight: 500 }}>
              Bình luận gì đó!
            </Label>
            <TextArea
              name="comments"
              placeholder="Nhập comment"
              control={control}
            >
              <button type="submit">
                <IconEnter className="text-blue-600"></IconEnter>
              </button>
            </TextArea>
          </form>
        </div>
      </div>
      <Label>Bình Luận:</Label>
      {comment &&
        comment.map((data, index) => (
          <Comment key={index} data={data}></Comment>
        ))}
    </>
  );
};

export default ThreadPost;
