import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberToCurrency(n: number) {
  const result = String(n);
  return result.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function convertGender(gender: "MALE" | "FEMALE") {
  return gender === "MALE" ? "Nam" : "Nữ";
}

export function formatDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
}
