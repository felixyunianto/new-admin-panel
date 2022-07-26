export const checkDiffDay = (date) => {
  let oneDay = 1000 * 60 * 60 * 24;
  let currentDate = new Date();
  let joinDate = new Date(date);

  let result = Math.round(currentDate.getTime() - joinDate.getTime()) / oneDay;

  return result.toFixed(0);
};
