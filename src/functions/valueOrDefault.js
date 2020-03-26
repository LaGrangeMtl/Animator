import precision from './precision';

export default function valueOrDefault(value, defaultValue = 0) {
	return value !== undefined ? precision(value) : defaultValue;
}
