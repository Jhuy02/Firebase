import React from "react";
import TippyHeader from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";
import TippyAccount from "../accountItem/TippyAccount";
import IconCheck from "../icons/IconCheck";
import moment from "moment";

const PostUser = ({ data }) => {
  const navigate = useNavigate();
  const currentTime = moment().format("HH");
  const currentDay = moment().format("YYYY-MM-DD");
  const day = moment(data.day);
  const calcHour = currentTime - data.dateHour;
  return (
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
            <TippyAccount data={data?.user}></TippyAccount>
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
      {data?.user?.check && <IconCheck className="text-[#0000ff]"></IconCheck>}
      <span className="mx-2">.</span>
      <span className="text-blue-500">
        {day.isBefore(currentDay) &&
          data.day + " - lúc " + data.dateHour + " giờ"}
        {calcHour === 0 && !day.isBefore(currentDay) && "Mới Đăng"}
        {!day.isBefore(currentDay) && calcHour !== 0 && calcHour + " Giờ Trước"}
      </span>
    </div>
  );
};

export default PostUser;
