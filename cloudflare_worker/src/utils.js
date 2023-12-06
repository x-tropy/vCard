const padZero = (number) => number.toString().padStart(2, '0');

// Date format: YYYY-MM-DD
const formattedDate = (time) => `${time.getFullYear()}-${padZero(time.getMonth() + 1)}-${padZero(time.getDate())}`;

// Time format: YYYY-MM-DD HH:MM:SS
const formattedTime = (time) =>
	formattedDate(time) + ` ${padZero(time.getHours())}:${padZero(time.getMinutes())}:${padZero(time.getSeconds())}`;

export { formattedDate, formattedTime };
