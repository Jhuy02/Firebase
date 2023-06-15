import React from "react";
import Wrapper from "../popper/Wrapper";
import IconBirthday from "../icons/IconBirthday";
import IconCheckV from "../icons/IconCheckV";

const TippyAccount = (data) => {
  const datas = data?.data;
  const date = datas?.selectedDate?.seconds
    ? new Date(datas?.selectedDate?.seconds * 1000)
    : "";
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <Wrapper
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        objectFit: "cover",
        backgroundImage: `url(${datas?.imageUser?.imageBg})`,
      }}
      className={"bg-[#f8f8f8] b-test h-full shadow-lg shadow-cyan-500/50"}
    >
      <div className="flex text-white justify-start">
        <div className="bg-white flex items-center justify-center p-1 mx-5 my-2 w-12 h-12 rounded-full object-cover">
          <img
            src={datas?.imageUser?.imageAvt || "/user-avt.png"}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex-1 max-w-[250px] py-3 mx-3">
          <h3 className="flex items-center text-xl font-semibold bg-black max-w-max px-2 rounded-xl text-white">
            {datas?.fullname}
            {datas?.check && (
              <IconCheckV className="text-[#0000ff]"></IconCheckV>
            )}
          </h3>
          <div className="bg-black whitespace-nowrap rounded-xl mt-2 overflow-hidden max-h-[70px] max-w-[250px] flex items-center px-3">
            <span className="text-ellipsis overflow-hidden">{datas?.Bio}</span>
          </div>
          <span className="bg-black max-w-max px-2 rounded-xl mt-2 flex items-center">
            <div className="mr-3">
              <IconBirthday></IconBirthday>
            </div>
            {formatDate !== "Invalid Date" ? formatDate : "Chưa Cập Nhập"}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default TippyAccount;
