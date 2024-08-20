import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-between w-full max-w-2xl mx-auto">
      <div>
        <div>hello</div>
        <div>welcome to notishake</div>
      </div>
      <Link href="/signup">시작하기</Link>
      <div>
        <span>이미 계정이 있으신가요?</span>
        <Link href="/login">로그인</Link>
      </div>
    </main>
  );
}
