import { HealthDocument } from "@/services/app/payout-request";

type HealthDocumentShowProps = {
  documents: HealthDocument[];
};

function HealthDocumentShow({ documents }: HealthDocumentShowProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-background p-6">
      <h2 className="text-xl font-semibold">Các giấy tờ liên quan</h2>
      <div className="mt-2 flex flex-col gap-2">
        {documents.map((document, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-lg border-[1px] border-primary p-3"
          >
            <img
              src={document.url}
              alt={document.name}
              loading="lazy"
              className="max-w-full"
            />
            <h4 className="mt-2 text-lg font-semibold text-slate-500">
              {document.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthDocumentShow;
