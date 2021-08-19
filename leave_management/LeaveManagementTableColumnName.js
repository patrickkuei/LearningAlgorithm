import React, { useState } from "react";
import { Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { leaveManagementActions } from "../../redux/leaveManagementSlice";
import { DeleteFilled } from "@ant-design/icons";
import { leaveAPIs } from "../../apis/leaveAPIs";
import { locale } from "../../locales/zh-TW";
import useAxiosRequest from "../../hooks/useAxiosRequest";

export default function LeaveManagementTableColumnName({
  text,
  record,
  updateLeaveDaysState,
}) {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const alertSuccess = () => message.success(locale.commonText.excuteSuccess);
  const dispatch = useDispatch();
  const { updateUserList } = leaveManagementActions;
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const [deleteState, , deleteLeaveDayWithCancelToken] = useAxiosRequest(
    (reqeustConfigs, cancelToken) =>
      leaveAPIs.deleteLeaveDay(reqeustConfigs.recordId, cancelToken),
    {
      fetchOnMount: false,
      onFetchSuccess: (res, reqeustConfigs) => {
        alertSuccess();
        const getNewData = (prevData) =>
          prevData.filter((item) => item.id !== reqeustConfigs.recordId);

        updateLeaveDaysState((prev) => ({
          ...prev,
          leaveDays: getNewData(prev.leaveDays),
          filteredLeaveDays: getNewData(prev.filteredLeaveDays),
        }));
        dispatch(
          updateUserList({
            leaveTypeId: reqeustConfigs.leaveTypeId,
            value: reqeustConfigs.subtotal * -1,
          })
        );
      },
    }
  );
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  return (
    <div className="table-name-container">
      <div
        className="delete-icon-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Popconfirm
          title={locale.components.leaveManagement.popConfirm.title}
          okText={locale.components.leaveManagement.popConfirm.ok}
          cancelText={locale.components.leaveManagement.popConfirm.cancel}
          onConfirm={() =>
            deleteLeaveDayWithCancelToken({
              recordId: record.id,
              leaveTypeId: record.leaveTypeId,
              subtotal: record.subtotal,
            })
          }
          onCancel={() => setIsDeletePopupVisible(false)}
          okButtonProps={{ loading: deleteState.isLoading }}
          visible={isDeletePopupVisible}
          getPopupContainer={(trigger) => trigger.parentElement}
        >
          <DeleteFilled
            className="delete-icon"
            onClick={() => setIsDeletePopupVisible(true)}
          />
        </Popconfirm>
      </div>
      {text}
    </div>
  );
}
