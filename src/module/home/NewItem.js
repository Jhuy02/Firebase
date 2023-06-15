import React from "react";
import IconDost from "../../components/icons/IconDost";
import useToggle from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import TippyHeader from "@tippyjs/react/headless";
import { useAuth } from "../../contexts/auth-context";
import IconComment from "../../components/icons/IconComment";
import PostAvt from "../../components/postItem/PostAvt";
import PostUser from "../../components/postItem/PostUser";
import ModuleUpdatepost from "../update/ModuleUpdatepost";
import Like from "../interact/Like";

const NewItem = ({ data }) => {
  const { userInfor } = useAuth();
  const [isToggled, toggle] = useToggle(false);
  const navigate = useNavigate();

  if (!data || !data.id) return null;

  return (
    <div className="flex py-3 px-4 hover:bg-slate-100 border-b border-neutral-200">
      <PostAvt data={data.user}></PostAvt>
      <div className="flex-1">
        <div className="flex justify-between">
          <PostUser data={data}></PostUser>
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
            {data.userId === userInfor?.uid && (
              <div className="relative z-20 w-[35px] h-6 rounded-full hover:bg-slate-400 hover:text-blue-500">
                <IconDost onClick={toggle}></IconDost>
              </div>
            )}
          </TippyHeader>
        </div>
        <div className="relative">
          {data?.content && <div className="py-3">{data.content}</div>}
          {data?.linkTag && (
            <span className="absolute -translate-y-4 text-sm text-blue-700">
              #{data?.linkTag}
            </span>
          )}
        </div>
        {data.image ? (
          <div className="">
            <img
              src={data.image}
              alt=""
              className="max-h-[500px] object-cover w-full h-full rounded-xl my-5"
            />
          </div>
        ) : null}
        <div className="interact flex justify-between mt-2">
          <Like data={data}></Like>
          <Tippy content="Bình Luận">
            <button
              onClick={() => {
                userInfor
                  ? navigate(`/thread?id=${data?.id}`)
                  : navigate("/sign-up");
              }}
              className="cursor-pointer text-center p-2 mx-1 rounded-lg flex-1 flex items-center justify-center border border-sky-300 hover:bg-slate-300"
            >
              <IconComment></IconComment>
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
