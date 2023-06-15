import React from "react";
import PostAvt from "../../components/postItem/PostAvt";
import TippyHeader from "@tippyjs/react/headless";
import TippyAccount from "../../components/accountItem/TippyAccount";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IconCheck from "../../components/icons/IconCheck";
import useToggle from "../../hooks/useToggle";
import ModuleUpdatepost from "../update/ModuleUpdatepost";
import IconDost from "../../components/icons/IconDost";
import { useAuth } from "../../contexts/auth-context";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";

const Comment = ({ data }) => {
  const { userInfor } = useAuth();
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchUserData() {
      if (!data?.user?.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", data?.user?.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }
    fetchUserData();
  }, [data?.user?.email]);
  const navigate = useNavigate();
  const [isToggled, toggle] = useToggle(false);
  const currentTime = moment().format("HH");
  const currentDay = moment().format("YYYY-MM-DD");
  const day = moment(data.day);
  const calcHour = currentTime - data.dateHour;
  return (
    <div className="flex mt-4 last:mb-5">
      <PostAvt data={user}></PostAvt>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex">
            <TippyHeader
              interactive
              render={(attrs) => (
                <div
                  onClick={() => navigate(`/profile?id=${data?.userId}`)}
                  className="min-w-[250px] min-h-[20vh] max-h-[40vh] cursor-pointer overflow-hidden"
                  tabIndex="-1"
                  {...attrs}
                >
                  <TippyAccount data={user}></TippyAccount>
                </div>
              )}
            >
              <h3
                onClick={() => navigate(`/profile?id=${data?.userId}`)}
                className="text-center font-semibold cursor-pointer text-lg text-black"
              >
                {data?.user?.fullname}
              </h3>
            </TippyHeader>
            {data?.user?.check && (
              <IconCheck className="text-[#0000ff]"></IconCheck>
            )}
            <span className="mx-2">.</span>
            <span className="text-blue-500">
              {day.isBefore(currentDay) &&
                data.day + " - lúc " + data.dateHour + " giờ"}
              {calcHour === 0 && !day.isBefore(currentDay) && "Mới Đăng"}
              {!day.isBefore(currentDay) &&
                calcHour !== 0 &&
                calcHour + " Giờ Trước"}
            </span>
          </div>
          <TippyHeader
            interactive
            visible={isToggled}
            render={(attrs) => (
              <div
                tabIndex="-1"
                {...attrs}
                className="absolute w-[250px] -left-44 text-white bg-[#0f0f0f] rounded-lg "
              >
                <ModuleUpdatepost data={data}></ModuleUpdatepost>
              </div>
            )}
            onClickOutside={toggle}
          >
            {data.user?.email === userInfor?.email && (
              <div className="relative z-20 w-[35px] h-6 mr-5 rounded-full hover:bg-slate-400 hover:text-blue-500">
                <IconDost onClick={toggle}></IconDost>
              </div>
            )}
          </TippyHeader>
        </div>
        <div className="">{data.comment}</div>
      </div>
    </div>
  );
};

export default Comment;
