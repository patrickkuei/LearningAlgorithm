import { Popover } from "antd";
import { MessageFilled } from "@ant-design/icons";
import moment from "moment";
import { locale } from "../../locales/zh-TW";
import PersonalLeaveComment from "./PersonalLeaveComment";
import { isChineseEnv } from "../../configs/leaveTypes";
import LeaveManagementTableColumnName from "./LeaveManagementTableColumnName";
import { LEAVE_DAY_TYPE } from "../../constants/leaveManagement";

const getVisibledLeaveType =
  (leaveDayTypes) => (currentLeaveTypeId) => (record) => {
    const currentLeaveType = leaveDayTypes.find(
      (type) => type.id === currentLeaveTypeId
    );
    return currentLeaveType.id === LEAVE_DAY_TYPE.PERSONAL_LEAVE_ID ? (
      <>
        {currentLeaveType.name}
        <div onClick={(e) => e.stopPropagation()}>
          <Popover
            content={PersonalLeaveComment(record)}
            trigger="click"
            getPopupContainer={(trigger) => trigger.parentElement}
          >
            <MessageFilled className="comment-icon" />
          </Popover>
        </div>
      </>
    ) : (
      currentLeaveType.name
    );
  };

const getFormattedColumns = (leaveTypes, updateLeaveDaysState) => [
  {
    title: locale.components.leaveManagement.commons.name,
    dataIndex: isChineseEnv ? "userChineseName" : "userEnglishName",
    key: "name",
    align: "center",
    render: (text, record) => (
      <LeaveManagementTableColumnName
        text={text}
        record={record}
        updateLeaveDaysState={updateLeaveDaysState}
      />
    ),
    sorter: (a, b) =>
      isChineseEnv
        ? a.userChineseName.localeCompare(b.userChineseName, "zh-hant")
        : a.userEnglishName.charCodeAt(0) - b.userEnglishName.charCodeAt(0),
  },
  {
    title: locale.components.leaveManagement.commons.leaveTypes,
    dataIndex: "leaveTypeId",
    key: "leaveType",
    align: "center",
    sorter: (a, b) => a.leaveTypeId - b.leaveTypeId,
    render: (text, record) => getVisibledLeaveType(leaveTypes)(text)(record),
  },
  {
    title: locale.components.leaveManagement.table.header.startDate,
    dataIndex: "startDate",
    key: "startDate",
    align: "center",
    sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    render: (text) =>
      moment(text).format(locale.components.leaveManagement.fullDateFormat),
  },
  {
    title: locale.components.leaveManagement.table.header.endDate,
    dataIndex: "endDate",
    key: "endDate",
    align: "center",
    sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
    render: (text) =>
      moment(text).format(locale.components.leaveManagement.fullDateFormat),
  },
  {
    title: locale.components.leaveManagement.table.header.subTotal,
    dataIndex: "subtotal",
    key: "subtotal",
    align: "center",
    sorter: (a, b) => a.subtotal - b.subtotal,
  },
];

export default getFormattedColumns;
