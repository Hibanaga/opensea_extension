export const getDiscountPrice = (countMonths, price) => {
  switch (true) {
    case countMonths > 10:
      return price - price * 0.025;
    case countMonths > 5:
      return price - price * 0.015;
    default:
      return price;
  }
};
