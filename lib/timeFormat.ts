export const ChangeTime = (utcDateString: string): string => {
  const utcDate = new Date(utcDateString);
  const localYear = utcDate.getFullYear();
  const localMonth = (utcDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
  const localDay = utcDate.getDate().toString().padStart(2, "0");

  // Output the local date in the desired format (YYYY-MM-DD)
//   const localDateString = `${localYear}/${localMonth}/${localDay}`;
  const localDateString = `${localMonth}/${localDay}/${localYear}`;
  console.log(localDateString);

  return localDateString;
};
