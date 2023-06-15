import React, { useEffect, useState } from "react";
import AuthenticationPage from "./AuthenticationPage";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { IconHas, IconHasClose } from "../components/icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const schema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập Email")
    .email("Vui lòng nhập đúng định dạng email"),
  password: yup
    .string()
    .required("Vui lòng nhập password")
    .min(6, "password phải dài hơn 6 ký tự"),
});

const SignInPage = () => {
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
  const { userInfor } = useAuth();

  useEffect(() => {
    document.title = "Đăng Nhập ";
    if (userInfor?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfor]);

  const handleSignUp = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    toast.success("Đăng Nhập thành công");
    navigate("/");
  };
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoCapitalize="off"
      >
        <Field>
          <Label htmlFor="email">Email Đăng Nhập</Label>
          <Input
            name="email"
            type="email"
            placeholder="Điền Email Đăng Nhập"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type={togglePassword ? "text" : "password"}
            placeholder="Điền Password"
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
          Bạn chưa có tài khoản hãy <NavLink to={"/sign-up"}>Đăng Ký</NavLink>
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
          Đăng Nhập
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
