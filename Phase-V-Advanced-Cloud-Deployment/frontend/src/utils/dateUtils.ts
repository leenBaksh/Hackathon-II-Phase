// frontend/src/utils/dateUtils.ts

export const format = (date: Date, formatStr: string = 'MMM dd'): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const d = new Date(date);
  
  return formatStr
    .replace('MMM', months[d.getMonth()])
    .replace('MMMM', months[d.getMonth()])
    .replace('dd', String(d.getDate()).padStart(2, '0'))
    .replace('d', d.getDate().toString())
    .replace('yyyy', d.getFullYear().toString())
    .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
    .replace('M', (d.getMonth() + 1).toString())
    .replace('EEE', days[d.getDay()])
    .replace('EEEE', days[d.getDay()]);
};

export const subDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const isAfter = (date: Date, dateToCompare: Date): boolean => {
  return new Date(date) > new Date(dateToCompare);
};

export const isBefore = (date: Date, dateToCompare: Date): boolean => {
  return new Date(date) < new Date(dateToCompare);
};

export const isWithinInterval = (date: Date, interval: { start: Date; end: Date }): boolean => {
  const d = new Date(date);
  const start = new Date(interval.start);
  const end = new Date(interval.end);
  return d >= start && d <= end;
};