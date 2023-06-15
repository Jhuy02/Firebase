import React, { useEffect, useState } from "react";
import { FieldConten } from "../../components/field";
import { useSearchParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import ModuleUpdate from "../update/ModuleUpdate";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import NewItem from "./NewItem";
import IconBirthday from "../../components/icons/IconBirthday";
import { useAuth } from "../../contexts/auth-context";
import IconCheck from "../../components/icons/IconCheck";

const HomeProfile = () => {
  const [isToggled, toggle] = useToggle(false);
  const [params] = useSearchParams();
  const paramId = params.get("id");
  const { userInfor } = useAuth();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (paramId !== "") {
      async function fetchData() {
        const colRef = doc(db, "users", paramId);
        const dataDoc = await getDoc(colRef);
        setUser(dataDoc.data());
      }
      fetchData();
    } else {
      setUser([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setPosts(results);
      });
    });
  }, []);
  const postUser = posts.filter((post) => post.userId === paramId);

  const date = user?.selectedDate?.seconds
    ? new Date(user?.selectedDate?.seconds * 1000)
    : "";
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <>
      <div className="">
        <div className="w-full h-[200px] bg-[#f0f8ff]">
          {user?.imageUser && (
            <img
              src={user?.imageUser?.imageBg}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="">
          <div className="relative flex justify-end">
            <div className="absolute w-[20%] rounded-full translate-x-[25%] translate-y-[-50%] left-0 bg-white">
              <img
                src={user?.imageUser?.imageAvt || "/user-avt.png"}
                alt=""
                className="w-[90%] h-[90%] max-h-[107px] min-h-[107px] mx-auto my-1 rounded-full object-cover"
              />
            </div>
            {paramId === userInfor?.uid ? (
              <div
                onClick={toggle}
                className="border border-sky-500 p-2 m-2 rounded-2xl hover:bg-slate-300"
              >
                <FieldConten className="mx-1">Edit Profile</FieldConten>
              </div>
            ) : (
              <div className="my-6"></div>
            )}
          </div>
          <div className="mt-3 mx-5 flex flex-col">
            <div className="flex text-xl font-extrabold">
              <h3>{user.fullname}</h3>
              {user?.check && (
                <IconCheck className="text-[#0000ff] ml-1"></IconCheck>
              )}
              {user?.nickname && (
                <span className="mx-2">{"( " + user?.nickname + " )"}</span>
              )}
            </div>
            <span className="mt-2 w-full">{user?.Bio}</span>
            <span className="mt-2 flex items-center">
              <div className="mr-3">
                <IconBirthday></IconBirthday>
              </div>
              {formatDate !== "Invalid Date" ? formatDate : "Chưa Cập Nhập"}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <span className="text-base font-semibold p-3">POSTS</span>
        <div className="mt-1">
          {postUser.map((post) => (
            <NewItem key={post.id} data={post}></NewItem>
          ))}
        </div>
      </div>
      {isToggled && (
        <div className="module">
          <div className="fixed inset-0 m-auto z-[99] bg-slate-400 opacity-50"></div>
          <ModuleUpdate toggle={toggle}></ModuleUpdate>
        </div>
      )}
    </>
  );
};

export default HomeProfile;
