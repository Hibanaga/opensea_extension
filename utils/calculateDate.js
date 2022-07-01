export const calculateDate = (dateSubscription, countMonths) => {
  let date = new Date(dateSubscription);
  date.setMonth(date.getMonth() + countMonths);
  return date;
};
