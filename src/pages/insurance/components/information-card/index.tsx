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
    <div className="flex px-6 lg:px-14 py-10 items-start justify-start rounded-3xl bg-primary-foreground gap-6 flex-col xl:w-[1048px] w-[95dvw] lg:flex-row drop-shadow-xl">
      <h2 className="font-semibold text-xl md:text-3xl text-start">{title}</h2>
      <div className="flex flex-col gap-6">
        {informations.map((condition, index) => (
          <div className="flex flex-col gap-3" key={index}>
            {condition.title && (
              <h3 className="text-base md:text-xl font-semibold">
                {condition.title}
              </h3>
            )}
            {condition.item.map((i, index) => (
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
                    className="w-6 h-6"
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
                <span>{i}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InformationCard;
