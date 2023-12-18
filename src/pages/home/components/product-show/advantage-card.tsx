import React from "react";

function AdvantageCard({ advantages }: { advantages: string[] }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="mt-2 flex items-center justify-between font-semibold"
      >
        {"Xem ưu điểm sản phẩm"}
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          data-icon="down"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          className={`transition-all duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            clipRule="evenodd"
            d="M5.43 8.43a.8.8 0 011.14 0L12 13.87l5.43-5.44a.8.8 0 011.14 1.14l-6 6a.8.8 0 01-1.14 0l-6-6a.8.8 0 010-1.14z"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={`flex flex-col items-stretch justify-center gap-3 overflow-y-hidden opacity-100 transition-all duration-300 ease-in-out ${
          open ? "h-[160px]" : "h-0 opacity-0"
        }`}
      >
        {advantages.map((advantage, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-primary">
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                data-icon="check-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
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
            {advantage}
          </div>
        ))}
      </div>
    </>
  );
}

export default AdvantageCard;
