import { addMinutes, addYears } from 'date-fns';

/**
 * Parse interval:
 * - years = Y
 * - quarters = Q
 * - months = M
 * - weeks = w
 * - days = d
 * - hours = h
 * - minutes = m
 * - seconds = s
 */
const durationKeys = ['s', 'm', 'h', 'd', 'w', 'M', 'Q', 'Y'];

export const YEAR = 'Y';
export const MINUTES = 'm';

/** @type {Object.<string, string>} */
export const INTERVAL_LABELS = {};
INTERVAL_LABELS[YEAR] = 'Year';

/**
 *
 * @param {string} intervalString
 * @returns {{ intervalString: string, key: string, label: string, seconds: number, incrementerValue: number, incrementerFn: Function | undefined }}}
 */
export function parse(intervalString) {
	console.log(intervalString);
	const length = intervalString.length;
	const key = intervalString.charAt(length - 1);
	const incrementerValue = length === 1 ? 1 : parseInt(intervalString.substring(0, length - 1), 10);
	let incrementerFn;
	let seconds = 0;

	if (durationKeys.includes(key)) {
		if (key === YEAR) {
			incrementerFn = /** @type {Function} */ (addYears);
			seconds = incrementerValue * 365 * 24 * 60 * 60;
		} else if (key === MINUTES) {
			incrementerFn = /** @type {Function} */ (addMinutes);
			seconds = incrementerValue * 60;
		}
	} else {
		throw new Error(`Invalid duration key: ${key}`);
	}

	return {
		intervalString,
		key,
		label: INTERVAL_LABELS[key],
		seconds,
		incrementerValue,
		incrementerFn
	};
}
