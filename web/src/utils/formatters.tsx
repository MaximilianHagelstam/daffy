export const formatDate = (dateStr: string): string =>
  `${new Date(dateStr).toLocaleDateString("en-uk")} ${new Date(
    dateStr
  ).toLocaleTimeString("en-uk", { hour: "2-digit", minute: "2-digit" })}`;
