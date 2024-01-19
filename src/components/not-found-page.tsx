import { Button } from "@/components/ui/button";

function NotFoundPage() {
  return (
    <main className="absolute top-[72px] flex h-[calc(100dvh-72px)] w-screen items-center justify-center bg-gray-100 text-center">
      <section className="flex flex-col items-center justify-center gap-4 p-6">
        <img src="/not-found.svg" alt="not-found" />
        <h1 className="text-xl font-bold">Không tìm thấy trang này</h1>
        <p className="text-slate-600">
          Rất tiếc, có thể trang này đã bị xoá hoặc đường dẫn URL sai. Vui lòng
          thử lại, hoặc liên hệ với chúng tôi để được trợ giúp.
        </p>
        <a href="/">
          <Button>Về trang chủ</Button>
        </a>
      </section>
    </main>
  );
}

export default NotFoundPage;
