export const getConvertedExpireDate = (subscription) => {
  if (!!subscription) {
    const [year, month, day] = subscription.slice(0, 10).split("-");
    return [day, month, year].join("/");
  } else {
    return "—";
  }
};
