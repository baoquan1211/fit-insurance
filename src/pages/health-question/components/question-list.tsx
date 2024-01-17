import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

export type Question = {
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
      "Người được bảo hiểm bị bất kỳ Công ty bảo hiểm nào từ chối bảo hiểm/ từ chối tái tục Hợp đồng bảo hiểm y tế tương tự; hoặc được chấp nhận nhưng với điều kiện áp dụng các điều khoản bổ sung đặc biệt?",
  },
];

function QuestionList() {
  return (
    <div className="flex max-w-3xl flex-col gap-6 rounded-lg bg-background p-6">
      <h2 className="text-2xl font-semibold">
        Người được bảo hiểm có gặp một trong các vấn đề về sức khoẻ sau đây
        không?
      </h2>
      <div className="rounded-lg border-[1px] border-primary bg-primary/5 p-3 text-sm text-primary">
        Vui lòng đọc kỹ và trả lời trung thực 04 câu hỏi về tình trạng sức khoẻ
        để đảm bảo quyền lợi khi đăng ký và bồi thường bảo hiểm
      </div>

      {questions.map((question, index) => (
        <React.Fragment key={index}>
          <h3 className="text-base font-semibold">
            {index + 1} {". "} {question.question}
          </h3>
          {question.information ? (
            <Sheet>
              <SheetTrigger className="w-fit text-left font-medium text-cyan-500">
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
  );
}

export default QuestionList;
