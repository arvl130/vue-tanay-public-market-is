export default (unixSeconds) => {
  const due_date_unix_secs = unixSeconds;
  const curr_date = new Date(due_date_unix_secs * 1000);
  const date = curr_date.getDate();
  const month = curr_date.getMonth() + 1;
  const year = curr_date.getFullYear();
  return `${year}-${month}-${date}`;
};
