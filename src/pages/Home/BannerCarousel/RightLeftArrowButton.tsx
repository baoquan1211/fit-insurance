import { Button } from "@/components/ui/button";

export interface IRightLeftArrowButtonProps {
  arrow: "right" | "left";
}

function RightLeftArrowButton({ arrow }: IRightLeftArrowButtonProps) {
  return (
    <Button
      variant={"ghost"}
      className="absolute top-[50%] z-50 bg-slate-500/50"
    >
      {arrow == "right" ? (
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          data-icon="right"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            d="M8.43 5.43a.8.8 0 011.14 0l6 6a.8.8 0 010 1.14l-6 6a.8.8 0 11-1.14-1.14L13.87 12 8.43 6.57a.8.8 0 010-1.14z"
            fill-rule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          data-icon="left"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            d="M15.57 5.43a.8.8 0 010 1.14L10.13 12l5.44 5.43a.8.8 0 11-1.14 1.14l-6-6a.8.8 0 010-1.14l6-6a.8.8 0 011.14 0z"
            fill-rule="evenodd"
          ></path>
        </svg>
      )}
    </Button>
  );
}

export default RightLeftArrowButton;
