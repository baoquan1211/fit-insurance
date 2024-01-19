import useFetchContractById from "@/hooks/useFetchContractById";
import useFetchInsuranceById from "@/hooks/useFetchInsuranceById";
import { useLocation, useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";
import ContractInformantion from "./components/contract-information";
import BenefitTable from "./components/benefit-table";
import { signal, useSignal } from "@preact/signals-react";
import HealthDocuments from "./components/health-documents";
import { useAppSelector } from "@/hooks/redux.hook";
import { useToast } from "@/components/ui/use-toast";
import useCreatePayoutRequest from "./hooks/useCreatePayoutRequest";
import { PayoutRequestCreation } from "@/services/app/payout-request";
import LoadingPage from "@/components/loading-page";
import SubmitBox from "./components/submit-box";

const payoutRequestStateSchema = z.object({
  contractId: z.number(),
});

const validationSchema = z.object({
  benefits: z
    .number()
    .array()
    .nonempty({ message: "Vui lòng chọn ít nhất một quyền lợi" }),
  buyer: z.string().email({ message: "Email của người mua không hợp lệ" }),
  contractId: z.number().int(),
});

export const selectedBenefits = signal<number[]>([]);

export type PayoutRequestState = z.infer<typeof payoutRequestStateSchema>;
type ValidationData = z.infer<typeof validationSchema>;

function PayoutRequestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const healthDocuments = useSignal<File[]>([]);
  const formState = location.state as PayoutRequestState;
  payoutRequestStateSchema.parse(formState);
  const { data: contract } = useFetchContractById(formState.contractId);
  const { data: insurance } = useFetchInsuranceById(
    Number(contract?.insurance.id),
  );
  const auth = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const { mutateAsync, isPending } = useCreatePayoutRequest();

  const sumbitHandle = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (healthDocuments.value.length == 0) {
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra!",
        description: "Vui lòng upload ít nhất một file giấy tờ",
      });
      return;
    }
    validationSchema
      .parseAsync({
        benefits: selectedBenefits.value,
        buyer: auth.email,
        contractId: formState.contractId,
      })
      .then((data: ValidationData) => {
        if (!isPending) {
          const requestData: PayoutRequestCreation = {
            buyer: data.buyer,
            benefits: data.benefits,
            contractId: data.contractId,
            files: healthDocuments.value,
          };
          mutateAsync(requestData)
            .then((payoutRequest) => {
              if (payoutRequest?.id) {
                toast({
                  variant: "success",
                  title: "Thành công",
                  description: "Gửi yêu cầu bồi thường thành công",
                });
                navigate(`/hopdong/chi-tiet/${contract?.id}`);
              }
            })
            .catch(() => {
              toast({
                variant: "destructive",
                title: "Có lỗi xảy ra!",
                description: "Vui lòng thử lại sau!",
              });
            });
        }
      })
      .catch((err: string) => {
        const error: ZodError[] = JSON.parse(err);
        toast({
          variant: "destructive",
          title: "Có lỗi xảy ra!",
          description: error[0].message,
        });
      });
  };
  if (contract)
    return (
      <main className="relative flex min-h-[calc(100dvh-72px)] w-full flex-col items-center bg-gray-100 px-3 py-6 md:py-16">
        {isPending ? <LoadingPage isLayout={true} /> : null}
        <section className="w-full md:w-auto">
          <h1 className="mb-4 w-fit self-start text-2xl font-semibold">
            Gửi yêu cầu bồi thường
          </h1>
          <form
            onSubmit={sumbitHandle}
            className="flex w-full flex-col gap-1 md:gap-6 lg:flex-row"
          >
            <div className="flex flex-col gap-3">
              <ContractInformantion
                contract={contract!}
                insurance={insurance!}
              />

              <BenefitTable contractId={contract?.id} />

              <HealthDocuments healthDocuments={healthDocuments} />
            </div>

            <SubmitBox />
          </form>
        </section>
      </main>
    );
}

export default PayoutRequestPage;
