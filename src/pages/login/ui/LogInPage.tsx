import LogInForm from "@/features/login/ui/LoginForm";
import Link from "next/link";

const snsList = [
  { name: "sms", path: "/sms", icon: "sms" },
  { name: "google", path: "/google/login", icon: "google" },
  { name: "naver", path: "/naver/login", icon: "naver" },
  { name: "kakaotalk", path: "/kakao/login", icon: "kakaotalk" },
];

const LoginPage = () => {
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
            서비스 이용을 위해 아래의 방법 중 하나를 선택하여 회원가입해주세요.
          </span>
        </div>
        <LogInForm />
      </div>
      <div className="relative">
        <div className="border-b border-neutral-400" />
        <span className="absolute pb-1 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-100 px-6 rounded-full text-sm font-semibold text-neutral-400">
          or Continue With
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-4 gap-2">
          {snsList.map((sns) => (
            <Link
              key={sns.name}
              href={sns.path}
              className="my-4 flex h-12 cursor-pointer items-center justify-center select-none font-medium active:scale-98 text-base px-6 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none bg-teal-500 hover:bg-teal-600 text-white rounded w-full"
            >
              {sns.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 justify-center">
          <div>계정이 없으신가요?</div>
          <Link href="/signup" className="text-indigo-500 font-bold">
            계정 만들기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
