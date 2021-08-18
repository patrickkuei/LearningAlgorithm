const [startWorkAt, offWorkAt, launchBreakStart, launchBreakEnd, workingHours] =
  [9, 18, 13, 14, 8];

const getTimes = (fullStartDate, fullEndDate) => {
  const crossDays = fullEndDate.date() - fullStartDate.date();
  const startTime =
    fullStartDate.hours() < startWorkAt
      ? startWorkAt
      : fullStartDate.hours() > offWorkAt
      ? offWorkAt
      : fullStartDate.hours();

  const endTime =
    fullEndDate.hours() > offWorkAt
      ? offWorkAt
      : fullEndDate.hours() < startWorkAt
      ? startWorkAt
      : fullEndDate.hours();

  return {
    crossDays,
    startTime,
    endTime,
  };
};

export const getValidHours = (strStartDate, strEndDate) => {
  const [startDate, endDate] = [moment(strStartDate), moment(strEndDate)];
  const { startTime, endTime, crossDays } = getTimes(startDate, endDate);
  const isCrossWeekend = false; // todo: cross week
  const isCrossHoliday = false; // todo: cross holiday
  const launchBreak = launchBreakEnd - launchBreakStart;

  const firstDayWorkingHours =
    startTime <= launchBreakStart
      ? offWorkAt - startTime - launchBreak
      : offWorkAt - startTime;

  const lastestDayWorkingHours =
    endTime >= launchBreakEnd
      ? endTime - startWorkAt - launchBreak
      : endTime - startWorkAt;

  let totalHours = 0;
  if (crossDays > 1) {
    totalHours =
      (crossDays - 1) * workingHours +
      firstDayWorkingHours +
      lastestDayWorkingHours;
  } else if (crossDays === 1) {
    totalHours = firstDayWorkingHours + lastestDayWorkingHours;
  } else {
    totalHours =
      endTime >= launchBreakEnd && startTime <= launchBreakStart
        ? endTime - startTime - launchBreak
        : endTime - startTime;
  }
  return totalHours;
};
