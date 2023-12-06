// Test server
const testServer = 'http://127.0.0.1:8787/api/';

// Production server
const prodServer = 'https://vcard.buweiliao.worker.com/api/';

const dbApiUrl = testServer;

const padZero = (number) => number.toString().padStart(2, '0');

// Date format: YYYY-MM-DD
const formattedDate = (date) => `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;

// Time format: YYYY-MM-DD HH:MM:SS
const formattedTime = (time) =>
  formattedDate(time) + `${padZero(time.getHours())}:${padZero(time.getMinutes())}:${padZero(time.getSeconds())}`;

export { dbApiUrl, formattedDate, formattedTime };

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
