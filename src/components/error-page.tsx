import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

function ErrorPage() {
  const location = useLocation();

  return (
    <main className="absolute top-[72px] flex h-[calc(100dvh-72px)] w-screen items-center justify-center bg-muted text-center">
      <section className="flex flex-col items-center justify-center gap-4 p-6">
        <img src="/not-found.svg" alt="not-found" />
        {location.pathname !== "/" ? (
          <>
            <h1 className="text-xl font-bold">Không tìm thấy trang này</h1>
            <p className="text-slate-600">
              Rất tiếc, có thể trang này đã bị xoá hoặc đường dẫn URL sai. Vui
              lòng thử lại, hoặc liên hệ với chúng tôi để được trợ giúp.
            </p>
            <a href="/">
              <Button>Về trang chủ</Button>
            </a>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold">
              Hệ thống hiện đang bảo trì. Vui lòng thử lại sau.
            </h1>
          </>
        )}
      </section>
    </main>
  );
}

export default ErrorPage;
