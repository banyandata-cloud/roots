export const isValidUnit = ({ type, value }) => {
	if (type === 'hours') {
		if (value >= 0 && value < 13) {
			return true;
		}
	}
	if (value >= 0 && value < 60) {
		return true;
	}
	return false;
};

export const isValidMeridian = (meridian) => {
	if (meridian === 'AM' || meridian === 'PM' || meridian === 'A' || meridian === 'P') {
		return true;
	}
	return false;
};

export const focusInput = (ref) => {
	return ref?.current.focus();
};
