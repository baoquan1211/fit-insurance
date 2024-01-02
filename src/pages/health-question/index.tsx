import React from "react";
import { useLocation } from "react-router-dom";
import { InsuranceRegistrationState } from "../insurance/components/product-list/insurance-fee-form";
import AnswerBox from "./components/answer-box";
import QuestionList from "./components/question-list";

const ErrorPage = React.lazy(() => import("@/components/error-page"));

function HealthQuestionPage() {
  const location = useLocation();
  const insuranceRegistrationState =
    location.state as InsuranceRegistrationState;

  if (insuranceRegistrationState === null) return <ErrorPage />;

  return (
    <main className="relative flex min-h-[calc(100dvh-72px)] w-full flex-col items-center bg-gray-100 px-3 py-6 md:py-16">
      <section>
        <h1 className="mb-4 self-start text-2xl font-semibold">
          Câu hỏi sức khỏe
        </h1>
        <div className="flex flex-col gap-1 md:flex-row md:gap-6">
          <QuestionList />
          <AnswerBox state={insuranceRegistrationState} />
        </div>
      </section>
    </main>
  );
}

export default HealthQuestionPage;
