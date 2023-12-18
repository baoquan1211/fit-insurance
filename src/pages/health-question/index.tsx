import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InsuranceRegistrationState } from "../insurance/components/product-list/insurance-fee-form";
import ErrorPage from "@/components/error-page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Question = {
  question: string;
  information?: {
    title: string;
    header: string;
    discription?: string;
    infos: string[];
  };
};

const questions: Question[] = [
  {
    question:
      "Trong ba năm qua, Người được bảo hiểm đã mắc và/hoặc điều trị một hay nhiều các chứng bệnh sau không?",
    information: {
      title: "Xem danh sách các chứng bệnh",
      header: "Danh sách các chứng bệnh",
      infos: [
        "Viêm hệ thần kinh trung ương (não); Parkinson; thoái hóa khác của hệ thần kinh; mất trí nhớ, hôn mê, bại não, bại liệt;",
        "Đái tháo đường;",
        "Suy phổi, tràn khí/dịch phổi, suy hô hấp mãn tính;",
        "Bệnh mạch máu não, đột quỵ (xuất huyết não/xơ cứng động mạch);",
        "Suy tim, nhồi máu cơ tim, phẫu thuật tim;",
        "Viêm gan, xơ gan; suy thận, teo thận, sỏi thận, chạy thận nhân tạo;",
        "Viêm tuỵ; ghép tủy;",
        "Lupus ban đỏ;",
        "Lao các loại; phong;",
        "U bướu các loại; ung thư các loại; suy tủy; bạch cầu;",
        "Các bệnh lây qua đường tình dục, hội chứng suy giảm miễn dịch;",
        "Bệnh bẩm sinh, bệnh di truyền, dị dạng về gen, khuyết tật cơ thể, down",
      ],
    },
  },
  {
    question:
      "Trong ba năm qua, Người được bảo hiểm đã từng đi khám/tư vấn y tế/được chỉ định điều trị/điều trị tại phòng khám/bệnh viện/viện điều dưỡng/tổ chức y tế hoặc các tổ chức tương tự?",
    information: {
      title: "Danh sách các bệnh không cần kê khai",
      header: "Danh sách các bệnh không cần kê khai",
      discription:
        "Đi khám/được chỉ định điều trị/điều trị do các bệnh/tình trạng sau có thể không cần kê khai, bao gồm:",
      infos: [
        "Rối loạn tiêu hóa, ngộ độc thức ăn,",
        "Cảm lạnh, cúm, sốt xuất huyết, sốt virus (không bao gồm Covid-19),",
        "Viêm tai/mũi/họng cấp, viêm kết mạc,",
        "Khám thai, ngừa thai, viêm ruột thừa, sinh con,",
        "Cạo vôi răng, nhổ răng, viêm lợi,",
        "Chấn thương đã khỏi hoàn toàn và không cần theo dõi hoặc điều trị tiếp,",
        "Dị ứng, tiêm chủng",
      ],
    },
  },
  {
    question:
      "Người được bảo hiểm đang được theo dõi hoặc điều trị thương tật, bệnh hoặc có triệu chứng sức khỏe không ổn định hoặc được chỉ định phải điều trị trong vòng 12 tháng tới không?",
  },
  {
    question:
      "Người được bảo hiểm đã từng được Bảo Việt giải quyết bồi thường theo một Hợp đồng bảo hiểm y tế tương tự; hoặc bị bất kỳ Công ty bảo hiểm nào từ chối bảo hiểm/ từ chối tái tục Hợp đồng bảo hiểm y tế tương tự; hoặc được chấp nhận nhưng với điều kiện áp dụng các điều khoản bổ sung đặc biệt?",
  },
];

function HealthQuestionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const feeCalculateState = location.state as InsuranceRegistrationState;
  console.log("dasd");

  if (feeCalculateState === null) return <ErrorPage />;

  return (
    <main className="relative flex w-full flex-col items-center bg-gray-100 px-3 py-6 md:py-16">
      <div>
        <h1 className="mb-4 self-start text-2xl font-semibold">
          Câu hỏi sức khỏe
        </h1>
        <section className="flex flex-col gap-1 md:flex-row md:gap-6">
          <div className="flex max-w-3xl flex-col gap-6 rounded-lg bg-background p-6">
            <h2 className="text-2xl font-semibold">
              Người được bảo hiểm có gặp một trong các vấn đề về sức khoẻ sau
              đây không?
            </h2>
            <div className="rounded-lg border-[1px] border-primary bg-primary/5 p-3 text-sm text-primary">
              Vui lòng đọc kỹ và trả lời trung thực 04 câu hỏi về tình trạng sức
              khoẻ để đảm bảo quyền lợi khi đăng ký và bồi thường bảo hiểm
            </div>

            {questions.map((question, index) => (
              <React.Fragment key={index}>
                <h3 className="text-base font-semibold">
                  {index + 1} {". "} {question.question}
                </h3>
                {question.information ? (
                  <Sheet>
                    <SheetTrigger className="w-fit font-medium text-cyan-500">
                      {question.information.title}
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      <SheetHeader className="mb-3">
                        <SheetTitle>{question.information.header}</SheetTitle>
                      </SheetHeader>
                      {question.information.discription ? (
                        <p>{question.information.discription}</p>
                      ) : null}
                      <ul className="ml-6 mt-6 flex list-disc flex-col gap-1">
                        {question.information.infos.map((info, index) => (
                          <li key={index} className="text-base">
                            {" "}
                            {info}
                          </li>
                        ))}
                      </ul>
                    </SheetContent>
                  </Sheet>
                ) : null}
              </React.Fragment>
            ))}
          </div>

          <div className="sticky bottom-0 left-0 flex h-fit w-full flex-row gap-3 rounded-lg bg-background p-3 md:flex-col md:p-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="font-me w-full border-[1px] border-primary text-primary hover:bg-primary/5 hover:text-primary md:min-w-[250px]"
                >
                  Có
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center">
                <span className="h-12 w-12 fill-primary text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    data-icon="info"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12 3.5a8.5 8.5 0 104.27 15.85.75.75 0 11.76 1.3 10 10 0 114.23-4.86.75.75 0 11-1.39-.57A8.5 8.5 0 0012 3.5zm0 6.91c.41 0 .75.34.75.75v5.05a.75.75 0 01-1.5 0v-5.05c0-.41.34-.75.75-.75zm.84-2.61a.84.84 0 11-1.68 0 .84.84 0 011.68 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <DialogHeader>
                  <DialogTitle>Không đủ điều kiện mua bảo hiểm</DialogTitle>
                  <DialogDescription>
                    Lịch sử bệnh lý của Người được bảo hiểm chưa đảm bảo điều
                    kiện tham gia bảo hiểm sức khỏe
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex w-full gap-1">
                  <Button
                    variant={"outline"}
                    onClick={() => navigate("/")}
                    className="flex-1 border-primary text-primary hover:bg-primary/5 hover:text-primary"
                  >
                    Quay về trang chủ
                  </Button>

                  <Button
                    onClick={() => navigate("/baohiem/suc-khoe")}
                    className="flex-1"
                  >
                    Thay đổi Người được bảo hiểm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => navigate("/baohiem/suc-khoe")}
              variant={"outline"}
              className="w-full border-[1px] border-primary font-medium text-primary hover:bg-primary/5 hover:text-primary md:min-w-[250px]"
            >
              Không
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HealthQuestionPage;
