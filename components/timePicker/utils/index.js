export const isValidHours = (hours) => {
	if (hours >= 0 && hours < 13) {
		return true;
	}
	return false;
};

export const isValidMinutes = (minutes) => {
	if (minutes >= 0 && minutes < 60) {
		return true;
	}
	return false;
};

export const isValidSecond = (hours) => {
	if (hours >= 0 && hours < 60) {
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
