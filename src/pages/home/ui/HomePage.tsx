import "@/shared/config/database";
import Button from "@/shared/ui/Button";
import { Link as NextUILink } from "@nextui-org/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center w-full max-w-2xl mx-auto pb-56">
      <div className="flex flex-col w-full px-10 gap-2">
        <div className="text-3xl *:tacking-tight">
          <div className="font-light text-indigo-700">Hello</div>
          <div className="text-indigo-400 text-4xl">welcome to</div>
          <div className="text-indigo-500 font-bold text-6xl">notishake</div>
        </div>
        <Link href="/signup">
          <Button name="시작하기" />
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-lg">이미 계정이 있으신가요?</span>
          <Link href="/login">
            <NextUILink size="lg" className="font-semibold text-indigo-500">
              로그인
            </NextUILink>
          </Link>
        </div>
      </div>
    </main>
  );
}
