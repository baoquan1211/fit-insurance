import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="h-[calc(100dvh-72px)] absolute top-[72px] w-screen bg-gray-100 flex items-center justify-center text-center">
      <section className="flex flex-col gap-4 items-center justify-center p-6">
        <img src="/not-found.svg" alt="not-found" />
        {location.pathname !== "/" ? (
          <>
            <h1 className="font-bold text-xl">Không tìm thấy trang này</h1>
            <p className="text-slate-600">
              Rất tiếc, có thể trang này đã bị xoá hoặc đường dẫn URL sai. Vui
              lòng thử lại, hoặc liên hệ với chúng tôi để được trợ giúp.
            </p>
            <Button onClick={() => navigate("/")}>Về trang chủ</Button>{" "}
          </>
        ) : (
          <>
            <h1 className="font-bold text-xl">
              Hệ thống hiện đang bảo trì. Vui lòng thử lại sau.
            </h1>
          </>
        )}
      </section>
    </main>
  );
}

export default ErrorPage;
