export const parseDateOrToday = (dateString?: string): Date => {
  if (!dateString) {
    return new Date();
  }

  const parsedDate = new Date(dateString);
  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};
