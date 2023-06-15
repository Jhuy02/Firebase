import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import IconX from "../../components/icons/IconX";
import ImageUpload from "../../components/image/ImageUpload";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextArea from "../../components/input/TextArea";
import IconDelete from "../../components/icons/IconDelete";
import { deleteObject, getStorage, ref } from "firebase/storage";

const ModuleUpdate = ({ toggle }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [user, setUser] = useState(null);
  const { control, getValues, setValue, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: { imageUser: {} },
  });
  const { handleSelectImage } = useFirebaseImage(
    getValues,
    setValue,
    "imageUser"
  );
  const [params] = useSearchParams();
  const userId = params.get("id");
  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const dataDoc = await getDoc(colRef);
      setUser(dataDoc.data());
      reset(dataDoc.data());
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);
  const imageUser = getValues("imageUser");

  const handleUpdate = async (values) => {
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        selectedDate,
      });
      toast.success("Thành Công");
      toggle();
    } catch (error) {
      toast.error("Lỗi");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDeleteImageAvt = async () => {
    const colRef = doc(db, "users", userId);
    const bg = user?.imageUser?.imageBg;
    const storage = getStorage();
    const image_regex = /%2F(\S+)\?/gm.exec(user?.imageUser?.imageAvt);
    const image_name = image_regex ? image_regex[1] : getValues("image_name");
    const imageRef = ref(storage, "images/" + image_name);
    deleteObject(imageRef);
    await updateDoc(colRef, {
      imageUser: { imageBg: bg, imageAvt: "" },
    });
    toast.success("Thành Công");
    const dataDoc = await getDoc(colRef);
    setUser(dataDoc.data());
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      autoComplete="off"
      className="fixed overflow-auto inset-0 w-[70vh] h-[70vh] m-auto my-20 bg-white z-[99] rounded-xl"
    >
      <div className="flex justify-between sticky top-0 z-[99] bg-white">
        <div className="flex items-center">
          <IconX
            onClick={toggle}
            className="m-2 p-2 rounded-full hover:bg-slate-200 cursor-pointer"
          ></IconX>
          <span className="text-lg font-semibold">Edit Profile</span>
        </div>
        <div className="">
          <Button
            type="submit"
            style={{
              width: "50px",
              backgroundColor: "#000",
              height: "40px",
              fontSize: "12px",
              margin: "12px",
            }}
          >
            SAVE
          </Button>
        </div>
      </div>
      <div className="p-2">
        <div className="w-full h-[200px] bg-[#f0f8ff] relative">
          {imageUser && (
            <img
              src={imageUser?.imageBg}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          <ImageUpload
            onChange={handleSelectImage}
            name="imageBg"
            style={{ position: "absolute" }}
            className={"inset-0 m-auto"}
          ></ImageUpload>
        </div>
        <div className="relative flex justify-end ">
          <div className="absolute w-[20%] min-h-[92px] rounded-full translate-x-[25%] translate-y-[-50%] left-0 bg-white">
            <img
              src={imageUser?.imageAvt || "/user-avt.png"}
              alt=""
              className="w-[90%] h-[90%] max-h-[92px] min-h-[92px] mx-auto my-1 rounded-full object-cover"
            />
            <ImageUpload
              onChange={handleSelectImage}
              name="imageAvt"
              style={{ position: "absolute" }}
              className={"bottom-0 right-0 m-auto z-[99]"}
            ></ImageUpload>
            {imageUser?.imageAvt && (
              <button
                type="button"
                className="absolute bottom-0 left-0 z-10 flex items-center justify-center transition-all rounded-full cursor-pointer hover:bg-slate-100"
                onClick={handleDeleteImageAvt}
              >
                <IconDelete></IconDelete>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-[50px]">
          <div className="my-3 w-full">
            <Label htmlFor="fullname" style={{ fontWeight: 500 }}>
              Name
            </Label>
            <Input
              name="fullname"
              placeholder="Nhập Name"
              control={control}
            ></Input>
          </div>
          <div className="my-3 w-full">
            <Label htmlFor="nickname" style={{ fontWeight: 500 }}>
              Nickname
            </Label>
            <Input
              name="nickname"
              placeholder="Nhập Nickname"
              control={control}
            ></Input>
          </div>
          <div className="my-3 w-full">
            <Label htmlFor="Bio" style={{ fontWeight: 500 }}>
              Bio
            </Label>
            <TextArea
              name="Bio"
              placeholder="Nhập Bio"
              className={"bg-[#e7ecf3]"}
              control={control}
            ></TextArea>
          </div>
          <div className="my-3 w-full">
            <Label style={{ fontWeight: 500 }}>Ngày Sinh</Label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Nhập năm rồi chọn ngày tháng"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModuleUpdate;
