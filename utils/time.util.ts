export const convertTimeToIndian = (time: string | Date) => {
  const time_ = new Date(time);
  return time_.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "short",
  });
};
