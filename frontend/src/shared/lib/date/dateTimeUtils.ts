/**
 * Проверяет, является ли дата/время прошедшими
 * Общая утилита для всего проекта
 */
export const isPastDateTime = (date: Date): boolean => {
  return date < new Date();
};

/**
 * Создаёт дату из строки даты и времени
 */
export const createDateTimeFromString = (
  dateStr: string,
  timeStr: string,
): Date => {
  const date = new Date(dateStr);
  const [hours, minutes] = timeStr.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
};
