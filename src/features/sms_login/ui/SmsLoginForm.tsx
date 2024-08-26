"use client";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import { useFormState } from "react-dom";
import { smsLogin } from "../model/sms_login";

// type SmsLoginProps = {
//   token: boolean | number;
//   error: string | null;
// };

const initialState = { token: false, error: undefined };

const SmsLoginForm = () => {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  console.log(state, "state");
  // console.log(state, "state");
  return (
    <form action={dispatch} className="flex flex-col gap-2">
      {state.token ? (
        <Input
          key="token"
          name="token"
          type="number"
          placeholder="인증번호"
          min={100000}
          max={999999}
          // errors={state?.fieldErrors.username}
          // minLength={USERNAME_MIN_LENGTH}
        />
      ) : (
        <Input
          key="phone_number"
          name="phone_number"
          type="text"
          placeholder="핸드폰 번호"
          required
          // errors={state?.fieldErrors.username}
          // minLength={USERNAME_MIN_LENGTH}
        />
      )}
      <Button name={state.token ? "Verify Token" : "Send Verification SMS"} />
    </form>
  );
};

export default SmsLoginForm;
