import SmsLoginForm from "@/features/sms_login/ui/SmsLoginForm";
import Link from "next/link";

const SmsPage = () => {
  return (
    <div className="flex flex-col mx-auto max-w-md min-h-dvh p-6 gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 items-center">
          {/* <h1 className="text-xl font-bold">Welcome to&nbsp;</h1> */}
          <Link
            href={"/"}
            className="text-indigo-500 tracking-tight text-3xl font-bold"
          >
            notishake
          </Link>
          <span className="text-neutral-500 font-medium text-center break-keep">
            아래의 방법 중 하나를 선택하여 회원가입해주세요.
          </span>
        </div>
        <SmsLoginForm />
      </div>
    </div>
  );
};

export default SmsPage;
