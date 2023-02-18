export const parseDate = (s) => {
  const parse = Date.parse(s);
  const date = new Date(parse);
  let result = date.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }); // 10/29/2013
  const time = `${result} ${
    date.getHours().toString().length === 1
      ? "0" + date.getHours().toString()
      : date.getHours().toString()
  }:${
    date.getMinutes().toString().length === 1
      ? "0" + date.getMinutes().toString()
      : date.getMinutes().toString()
  }`;
  return time;
};