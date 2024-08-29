"use client";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { createAccount } from "../model/create_account";
import { useFormState } from "react-dom";
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/shared/config/constants";

const SignUpForm = () => {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <form action={dispatch} className="flex flex-col gap-2">
      <Input
        type="username"
        placeholder="이름"
        name="username"
        errors={state?.fieldErrors.username}
        minLength={USERNAME_MIN_LENGTH}
      />
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
      <Input
        type="password"
        placeholder="비밀번호 확인"
        name="password_confirm"
        errors={state?.fieldErrors.password_confirm}
        minLength={PASSWORD_MIN_LENGTH}
      />
      <Button name="회원가입" type="submit" />
    </form>
  );
};

export default SignUpForm;
