export interface InputHelperResult {
	fieldName: string;
	fieldValue: string | boolean;
	dataset: DOMStringMap;
}

export interface DayInfo {
  month: string;
  monthAsNumber: number;
  year: number;
  dateAsNumber: number;
  day: string;
  dayAsNumber: number;
  hoursIn12: number;
  hours: number;
  minutes: number;
  seconds: number;
  meridian: 'AM' | 'PM';
}

export interface DateRange {
  startingDate: Date;
  endingDate: Date;
}

export interface GetDatesInMonthParams {
  month: number;
  year: number;
}

export interface DatesInMonthResult {
  dateObj: Date[];
  dates: number[];
  days: number[];
}


export interface ColorOptions {
  count?: number;
  excludedColors?: string[];
  exclusionThreshold?: number;
  distinctionThreshold?: number;
  excludedHueRanges?: { min: number; max: number }[];
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}