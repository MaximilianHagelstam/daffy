export const dateFormatter = (dateStr: string) => {
  const date = new Date(dateStr).toLocaleDateString("en-uk");
  const time = new Date(dateStr).toLocaleTimeString("en-uk", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} ${time}`;
};

export const kFormatter = (num: number) => {
  if (num < 1000) return `${num}`;

  const base = Math.floor(Math.log(Math.abs(num)) / Math.log(1000));
  const suffix = "KMB"[base - 1];
  const abbrev = String(num / 1000 ** base).substring(0, 3);

  return (abbrev.endsWith(".") ? abbrev.slice(0, -1) : abbrev) + suffix;
};
