export type InformationItem = {
  title?: string;
  item: string[];
};

type InformationCardProps = {
  informations: InformationItem[];
  title: string;
};

function InformationCard({ informations, title }: InformationCardProps) {
  return (
    <div className="flex w-[95dvw] flex-col items-start justify-start gap-6 rounded-3xl bg-primary-foreground px-6 py-10 drop-shadow-xl lg:flex-row lg:px-14 xl:w-[1048px]">
      <h2 className="text-start text-xl font-semibold md:text-3xl">{title}</h2>
      <div className="flex flex-col gap-6">
        {informations.map((condition, index) => (
          <div className="flex flex-col gap-3" key={index}>
            {condition.title && (
              <h3 className="text-base font-semibold md:text-xl">
                {condition.title}
              </h3>
            )}
            {condition.item.map((line, index) => (
              <div className="flex gap-2" key={index}>
                <span className="text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    data-icon="check-circle"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12 3.75A8.28 8.28 0 003.75 12 8.28 8.28 0 0012 20.25 8.28 8.28 0 0020.25 12c0-.76-.08-1.5-.25-2.16a.75.75 0 111.46-.36c.2.79.29 1.66.29 2.52A9.78 9.78 0 0112 21.75 9.78 9.78 0 012.25 12a9.78 9.78 0 0114.92-8.29.75.75 0 11-.8 1.28A8.15 8.15 0 0012 3.75z"
                      fillRule="evenodd"
                    ></path>
                    <path
                      clipRule="evenodd"
                      d="M23.53 2.47c.3.3.3.77 0 1.06l-11 11c-.3.3-.77.3-1.06 0l-4-4a.75.75 0 111.06-1.06L12 12.94 22.47 2.47c.3-.3.77-.3 1.06 0z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InformationCard;
