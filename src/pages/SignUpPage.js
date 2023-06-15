import React, { useEffect, useState } from "react";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { Input } from "../components/input";
import { Field } from "../components/field";
import { IconHas, IconHasClose } from "../components/icons";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import { NavLink, useNavigate } from "react-router-dom";
import slugify from "react-slugify";

const schema = yup.object({
  fullname: yup.string().required("Vui lòng nhập Tên Người Dùng"),
  email: yup
    .string()
    .required("Vui lòng nhập Email")
    .email("Vui lòng nhập đúng định dạng email"),
  password: yup
    .string()
    .required("Vui lòng nhập password")
    .min(6, "password phải dài hơn 6 ký tự"),
});

const SignUpPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);
  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.fullname, { lower: true }),
      });
      toast.success("Đăng ký thành công");
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      toast.error(error.code);
    }
  };

  useEffect(() => {
    document.title = "Đăng Ký ";
  }, []);

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoCapitalize="off"
      >
        <Field>
          <Label htmlFor="fullname">Tên Người Dùng</Label>
          <Input
            name="fullname"
            type="text"
            placeholder="Điền tên hiển thị"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="Tên Email Đăng Nhập"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type={togglePassword ? "text" : "password"}
            placeholder="Mật Khẩu Đăng Nhập"
            control={control}
          >
            {!togglePassword ? (
              <IconHasClose
                onClick={() => setTogglePassword(true)}
              ></IconHasClose>
            ) : (
              <IconHas onClick={() => setTogglePassword(false)}></IconHas>
            )}
          </Input>
        </Field>
        <div className="have-account">
          Bạn đãng có tài khoản hãy <NavLink to={"/sign-in"}>Đăng Nhập</NavLink>
        </div>
        <Button
          elementStyle="primary"
          type="submit"
          style={{
            maxWidth: 300,
            margin: "0 auto",
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Đăng Ký
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
