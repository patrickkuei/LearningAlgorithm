import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Modal, message } from "antd";
import LeaveManagementModalContent from "./LeaveManagementModalContent";
import { leaveManagementActions } from "../../redux/leaveManagementSlice";
import { leaveAPIs } from "../../apis/leaveAPIs";
import { locale } from "../../locales/zh-TW";
import { FROM } from "../../constants/leaveManagement";
import { errorAlert } from "../alert";
import useAxiosRequest from "../../hooks/useAxiosRequest";

export default function LeaveManagementModal({
  form,
  modalState,
  setModalState,
  leaveDaysState,
  updateLeaveDaysState,
}) {
  const alertSuccess = () => message.success(locale.commonText.excuteSuccess);
  const { userInfoList } = useSelector((state) => state.userList);
  const users = userInfoList
    ? userInfoList.map((user) => ({
        id: user.id,
        chineseName: user.chineseName,
        englishName: user.englishName,
      }))
    : [];
  const dispatch = useDispatch();
  const { updateUserList } = leaveManagementActions;

  const sameTimeCheckOrExcute = (value, callback) => {
    // check if start time equals to end time
    // find better way: use form validate?
    if (value.timeRange[0].diff(value.timeRange[1], "minutes") === 0) {
      errorAlert({
        message: locale.commonText.excuteFail,
        description: locale.commonText.sameStartEndError,
      });
      throw new Error(locale.commonText.sameStartEndError);
    } else {
      callback(value);
    }
  };

  const combineTime = (date, timeRange) => {
    const dateStr = date.format(locale.components.leaveManagement.dateFormat);
    const [startTimeStr, endTimeStr] = timeRange.map((time) =>
      time.format(locale.components.leaveManagement.timeFormat)
    );
    const startDate = moment(`${dateStr} ${startTimeStr}`);
    const endDate = moment(`${dateStr} ${endTimeStr}`);

    return { startDate, endDate };
  };
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const [createState, , createLeaveDayWithCancelToken] = useAxiosRequest(
    (newRecord, cancelToken) =>
      leaveAPIs.createLeaveDay(newRecord, cancelToken),
    {
      fetchOnMount: false,
      onFetchSuccess: (res) => {
        alertSuccess();
        const { data } = res;
        const getNewData = (prev) => [data, ...prev];

        updateLeaveDaysState((prev) => ({
          ...prev,
          leaveDays: getNewData(prev.leaveDays),
          filteredLeaveDays: getNewData(prev.filteredLeaveDays),
        }));
        dispatch(
          updateUserList({
            leaveTypeId: data.leaveTypeId,
            value: data.subtotal,
          })
        );
        setModalState({ isVisible: false, isLoading: false });
        form.resetFields();
      },
      onError: (err) => {
        if (err.response.status === 400) {
          errorAlert({
            message: locale.commonText.excuteFail,
            description:
              locale.components.leaveManagement.modal.form.error
                .dulplicatedTime,
          });
        }
        console.log("Excute Failed:", err);
      },
    }
  );
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const handleLeaveDayCreateClick = () => {
    form
      .validateFields()
      .then((value) => {
        sameTimeCheckOrExcute(value, (value) => {
          setModalState((prev) => ({ ...prev, isLoading: true }));

          const { userId, leaveTypeId, date, timeRange, description } = value;
          const { startDate, endDate } = combineTime(date, timeRange);

          createLeaveDayWithCancelToken({
            userId,
            leaveTypeId,
            startDate,
            endDate,
            description,
          });
        });
      })
      .catch((err) => {
        console.log("Excute Failed:", err);
      });
  };
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const [editState, , editLeaveDayWithCancelToken] = useAxiosRequest(
    (editedLeaveDay, cancelToken) =>
      leaveAPIs.editLeaveDay(editedLeaveDay, cancelToken),
    {
      fetchOnMount: false,
      onFetchSuccess: (res, configs) => {
        const { id, data: editedLeaveDayData } = configs;

        alertSuccess();
        updateLeaveDaysState((prev) => {
          const getTargetIndex = (data, id) =>
            data.findIndex((item) => item.id === id);

          const targetIndex = getTargetIndex(prev.leaveDays, id);
          const targetIndexInFilteredData = getTargetIndex(
            prev.filteredLeaveDays,
            id
          );
          const target = prev.leaveDays[targetIndex];

          dispatch(
            updateUserList({
              leaveTypeId: target.leaveTypeId,
              value: editedLeaveDayData.subtotal - target.subtotal,
            })
          );

          const { leaveDays: newData, filteredLeaveDays: newFilteredData } =
            JSON.parse(JSON.stringify(prev));

          // change user name only if user chnaged
          if (target.userId !== editedLeaveDayData.userId) {
            const newUser = users.find(
              (user) => user.id === editedLeaveDayData.userId
            );
            editedLeaveDayData.userChineseName = newUser.chineseName;
            editedLeaveDayData.userEnglishName = newUser.englishName;
          }
          Object.assign(newData[targetIndex], editedLeaveDayData, {
            startDate: editedLeaveDayData.startDate.format(),
            endDate: editedLeaveDayData.endDate.format(),
          });
          Object.assign(
            newFilteredData[targetIndexInFilteredData],
            editedLeaveDayData,
            {
              startDate: editedLeaveDayData.startDate.format(),
              endDate: editedLeaveDayData.endDate.format(),
            }
          );

          return {
            ...prev,
            leaveDays: newData,
            filteredLeaveDays: newFilteredData,
          };
        });
        setModalState({ isVisible: false, isLoading: false });
        form.resetFields();
      },
      onError: (err) => {
        if (err.response.status === 400) {
          errorAlert({
            message: locale.commonText.excuteFail,
            description:
              locale.components.leaveManagement.modal.form.error
                .dulplicatedTime,
          });
        }
        console.log("Excute Failed:", err);
      },
    }
  );
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const getValidSubtotal = (startDate, endDate) => {
    const [lunchBreakStart, lunchBreakEnd] = [13, 14];
    const lunchBreak = lunchBreakEnd - lunchBreakStart;
    const startHour = startDate.hours();
    const endHour = endDate.hours();

    if (startHour <= lunchBreakStart && endHour >= lunchBreakEnd) {
      return endHour - startHour - lunchBreak;
    } else {
      return endHour - startHour;
    }
  };

  const handleLeaveDayEditClick = () => {
    form
      .validateFields()
      .then((value) => {
        sameTimeCheckOrExcute(value, (value) => {
          setModalState((prev) => ({ ...prev, isLoading: true }));

          const { id, userId, leaveTypeId, date, timeRange, description } =
            value;
          const { startDate, endDate } = combineTime(date, timeRange);
          const subtotal = getValidSubtotal(startDate, endDate);

          const editedLeaveDay = {
            id,
            data: {
              userId,
              leaveTypeId,
              startDate,
              endDate,
              description,
              subtotal,
            },
          };
          editLeaveDayWithCancelToken(editedLeaveDay);
        });
      })
      .catch((err) => {
        console.log("Excute Failed:", err);
      });
  };

  const isFromCreate = modalState.from === FROM.CREATE;

  const title = isFromCreate
    ? locale.components.leaveManagement.modal.create
    : locale.components.leaveManagement.modal.edit;

  const onOk = isFromCreate
    ? handleLeaveDayCreateClick
    : handleLeaveDayEditClick;

  const onCancel = () => {
    setModalState((prev) => ({ ...prev, isVisible: false }));
    form.resetFields();
  };

  return (
    <Modal
      title={title}
      visible={modalState.isVisible}
      confirmLoading={createState.isLoading || editState.isLoading}
      onCancel={onCancel}
      onOk={onOk}
      forceRender={true}
      className="leave-management-model"
    >
      <LeaveManagementModalContent
        users={users}
        leaveDaysState={leaveDaysState}
        form={form}
      />
    </Modal>
  );
}
