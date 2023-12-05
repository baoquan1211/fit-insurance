import { cn } from "@/lib/utils";
import Spinner from "./ui/spinner";

type LoadingPageProps = {
  isLayout?: boolean;
};

function LoadingPage({ isLayout = true }: LoadingPageProps) {
  return (
    <section
      className={cn(
        "w-screen h-screen fixed top-0 left-0 z-50",
        isLayout ? "bg-primary-foreground/80" : "bg-primary-foreground"
      )}
    >
      <div
        role="status"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Spinner size={96} />
      </div>
    </section>
  );
}

export default LoadingPage;
