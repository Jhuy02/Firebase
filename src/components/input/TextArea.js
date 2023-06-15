import React from "react";
import { useController } from "react-hook-form";

const TextArea = ({ name, control, className, children, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  const handleResize = (event) => {
    field.onChange(event);
    if (!event.target.value) {
      event.target.style.height = "46px";
    } else {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    }
  };

  return (
    <div className="relative">
      <textarea
        style={{ height: "46px" }}
        className={`${className} resize-none overflow-hidden w-full p-3 outline-none`}
        value={field.value}
        onInput={handleResize}
        {...field}
        {...rest}
      />
      {children ? (
        <div className="flex absolute justify-center items-center right-0 top-[50%] -translate-y-[50%] cursor-pointer w-[50px] h-[50px] rounded-full hover:bg-[#ababab]">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default TextArea;
