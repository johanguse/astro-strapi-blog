import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  });
  
  return formatter.format(date);
}

export function capitalizer(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}