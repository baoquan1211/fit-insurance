import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberToCurrency(n: number) {
  const result = String(n);
  return result.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
