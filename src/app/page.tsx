import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
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
