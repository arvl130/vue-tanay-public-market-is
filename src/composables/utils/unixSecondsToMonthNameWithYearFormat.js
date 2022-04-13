const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default (unixSeconds) => {
  const due_date_unix_secs = unixSeconds;
  const curr_date = new Date(due_date_unix_secs * 1000);
  const month = months[curr_date.getMonth()];
  const year = curr_date.getFullYear();
  return `${month} ${year}`;
};
