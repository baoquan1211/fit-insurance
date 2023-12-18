import { cn } from "@/lib/utils";
import Spinner from "./ui/spinner";

type LoadingPageProps = {
  isLayout?: boolean;
};

function LoadingPage({ isLayout = true }: LoadingPageProps) {
  return (
    <section
      className={cn(
        "fixed left-0 top-0 z-50 h-screen w-screen",
        isLayout ? "bg-primary-foreground/80" : "bg-primary-foreground",
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
