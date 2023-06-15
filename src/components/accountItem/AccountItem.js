import Tippy from "@tippyjs/react/headless";
import React from "react";
import { useNavigate } from "react-router-dom";
import TippyAccount from "./TippyAccount";
import IconCheck from "../icons/IconCheck";

const AccountItem = ({ data }) => {
  console.log(data?.id);
  const navigate = useNavigate();
  return (
    <Tippy
      interactive
      render={(attrs) => (
        <div
          onClick={() => navigate(`/profile?id=${data?.id}`)}
          className="min-w-[200px] max-h-[200px] cursor-pointer"
          tabIndex="-1"
          {...attrs}
        >
          <TippyAccount data={data}></TippyAccount>
        </div>
      )}
    >
      <div
        onClick={() => navigate(`/profile?id=${data?.id}`)}
        className="flex mb-1 items-center py-1 px-4 cursor-pointer hover:bg-slate-300"
      >
        <img
          className="w-10 h-10 object-cover rounded-[50%]"
          src={data?.imageUser?.imageAvt || "/backgroud.png"}
          alt="Hoaa"
        />
        <div className="flex ml-3">
          <h4 className="text-base font-medium flex">
            <span>{data.fullname}</span>
            {data?.check && (
              <IconCheck className="text-[#0000ff] mr-2"></IconCheck>
            )}
          </h4>
        </div>
      </div>
    </Tippy>
  );
};

export default AccountItem;
