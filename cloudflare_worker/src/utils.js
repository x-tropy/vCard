const padZero = (number) => number.toString().padStart(2, '0');

// Date format: YYYY-MM-DD
const formattedDate = (time) => `${time.getFullYear()}-${padZero(time.getMonth() + 1)}-${padZero(time.getDate())}`;

// Time format: YYYY-MM-DD HH:MM:SS
const formattedTime = (time) =>
	formattedDate(time) + ` ${padZero(time.getHours())}:${padZero(time.getMinutes())}:${padZero(time.getSeconds())}`;

// Hardcoded list of working status
const working_status = ['Working remotely', 'Working onsite', 'Open to new opportunities'];

export { formattedDate, formattedTime, working_status };
