export const dateFormatter = (date: string): string =>
  `${new Date(date).toLocaleDateString("en-uk")} ${new Date(
    date
  ).toLocaleTimeString("en-uk", { hour: "2-digit", minute: "2-digit" })}`;

export const kFormatter = (num: number): string => {
  if (num < 1000) {
    return `${num}`;
  }

  const base = Math.floor(Math.log(Math.abs(num)) / Math.log(1000));
  const suffix = "kmb"[base - 1];
  const abbrev = String(num / 1000 ** base).substring(0, 3);
  return (abbrev.endsWith(".") ? abbrev.slice(0, -1) : abbrev) + suffix;
};
