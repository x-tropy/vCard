// Test server
const testServer = 'http://127.0.0.1:8787/api/';

// Production server
const prodServer = 'https://vcard.buweiliao.worker.com/api/';

const DATABASE_API_URL = testServer;

const padZero = (number) => number.toString().padStart(2, '0');

// Date format: YYYY-MM-DD
const formattedDate = (date) => `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;

// Time format: YYYY-MM-DD HH:MM:SS
const formattedTime = (time) =>
  formattedDate(time) + `${padZero(time.getHours())}:${padZero(time.getMinutes())}:${padZero(time.getSeconds())}`;

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

function capitalize(str) {
  return str
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

export { DATABASE_API_URL, formattedDate, formattedTime, cn, capitalize };
