import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserShortName(username: string | undefined) {
  if (!username) return;
  let firstLetter = username.split(' ')[0].slice(0, 1).toUpperCase();
  let secondLetter = username.split(' ')[1] ? username.split(' ')[1].slice(0, 1).toUpperCase() : 'A';
  return firstLetter + secondLetter;
}

export const getErrorMessage = (error: Error) => {
  const axiosError = error as AxiosError<{ message: string }>;
  return axiosError.response?.data?.message || 'Something went wrong, Please try again';
};
