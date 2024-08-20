"use client";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { useFormState } from "react-dom";
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/shared/config/constants";
import { logIn } from "../model/logIn";

const LogInForm = () => {
  const [state, dispatch] = useFormState(logIn, null);
  return (
    <form action={dispatch} className="flex flex-col gap-2">
      <Input
        type="email"
        placeholder="이메일"
        name="email"
        errors={state?.fieldErrors.email}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        name="password"
        errors={state?.fieldErrors.password}
        minLength={PASSWORD_MIN_LENGTH}
      />
      <Button name="로그인" />
    </form>
  );
};

export default LogInForm;
