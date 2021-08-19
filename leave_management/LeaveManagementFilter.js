import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeaveManagemnetFilterContent from "./LeaveManagementFilterContent";
import { leaveManagementActions } from "../../redux/leaveManagementSlice";
import { getLeaveDaySummary } from "../../utilities";
import { isChineseEnv } from "../../configs/leaveTypes";

export default function LeaveManagementFilter({
  leaveDaysState,
  updateLeaveDaysState,
  setFilterUsers,
  isAdmin,
}) {
  const { userInfoList } = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const { setLeaveDaySummary } = leaveManagementActions;

  const users = userInfoList
    ? userInfoList.map((user) => ({
        id: user.id,
        chineseName: user.chineseName,
        englishName: user.englishName,
      }))
    : [];

  const filterByName = (item, filterUsers) => {
    for (let i = 0; i < filterUsers.length; i++) {
      const lowerCaseName = isChineseEnv
        ? item.userChineseName.toLowerCase()
        : item.userEnglishName.toLowerCase();
      const conditionName = filterUsers[i].toLowerCase();
      if (lowerCaseName.includes(conditionName)) {
        return true;
      }
    }
    return false;
  };

  const filterByType = (item, filterLeaveTypes) => {
    return filterLeaveTypes.includes(item.leaveTypeId);
  };

  const filterByDate = (item, dates) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const [conditionStartDate, conditionEndDate] = dates;
    if (startDate >= conditionStartDate && endDate <= conditionEndDate) {
      return true;
    }
    return false;
  };

  const getFilteredLeaveDays = (filterValue) => {
    const {
      users: filterUsers,
      leaveTypes: filterLeaveTypes,
      dates,
    } = filterValue;

    if (!leaveDaysState.isLoading && leaveDaysState.leaveDays) {
      let result = JSON.parse(JSON.stringify(leaveDaysState.leaveDays));

      if (filterUsers.length > 0) {
        result = result.filter((item) => filterByName(item, filterUsers));

        // if choose specific one user, then show his leave day summary
        if (filterUsers.length === 1) {
          const newLeaveDaySummary = getLeaveDaySummary({
            leaveDays: result,
            leaveDayTypes: leaveDaysState.leaveDayTypes,
          });
          dispatch(setLeaveDaySummary(newLeaveDaySummary));
        }
      }
      if (filterLeaveTypes.length > 0) {
        result = result.filter((item) => filterByType(item, filterLeaveTypes));
      }
      if (dates.length > 0) {
        result = result.filter((item) => filterByDate(item, dates));
      }
      return result;
    }
  };
  const { userProfile } = useSelector((state) => state.auth);
  const [filterValue, setFilterValue] = useState({
    users: isAdmin
      ? []
      : isChineseEnv
      ? [userProfile.chineseName]
      : [userProfile.englishName],
    leaveTypes: [],
    dates: [],
  });

  const filterLeaveDays = (filterValue) => {
    const filteredLeaveDays = getFilteredLeaveDays(filterValue);
    updateLeaveDaysState((prev) => ({ ...prev, filteredLeaveDays }));
  };

  useEffect(() => {
    filterLeaveDays(filterValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);
  return (
    <LeaveManagemnetFilterContent
      users={users}
      leaveDayTypes={leaveDaysState.leaveDayTypes}
      filterValue={filterValue}
      updateFilterValue={(callback) => setFilterValue(callback)}
      setFilterUsers={setFilterUsers}
      isAdmin={isAdmin}
    />
  );
}
