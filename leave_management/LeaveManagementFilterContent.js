import React from "react";
import { useSelector } from "react-redux";
import { DatePicker, Row, Col, Select } from "antd";
import Title from "antd/lib/typography/Title";
import { locale } from "../../locales/zh-TW";
import { disabledRangeTime, isChineseEnv } from "../../configs/leaveTypes";
const { RangePicker } = DatePicker;

export default function LeaveManagemnetFilterContent({
  users,
  leaveDayTypes,
  filterValue,
  updateFilterValue,
  setFilterUsers,
  isAdmin,
}) {
  const handleFilterNameChange = (changedValue) => {
    updateFilterValue((prev) => ({
      ...prev,
      users: changedValue,
    }));
    setFilterUsers(changedValue);
  };
  const handleFilterLeaveTypeChange = (changedValue) => {
    const intValue = changedValue.map((strValue) => parseInt(strValue));
    updateFilterValue((prev) => ({
      ...prev,
      leaveTypes: intValue,
    }));
  };
  const handleFilterDateChange = (date, datesString) => {
    const newFilterDate = [];
    for (let i = 0; i < datesString.length; i++) {
      if (datesString[i]) {
        newFilterDate.push(new Date(datesString[i]));
      }
    }
    updateFilterValue((prev) => ({
      ...prev,
      dates: newFilterDate,
    }));
  };
  return (
    <div>
      <Row className="filter-row">
        <Col span={2} className="filter-row-title-container">
          <Title level={5}>
            {locale.components.leaveManagement.commons.name}:
          </Title>
        </Col>
        <Col span={22}>
          <Select
            mode="multiple"
            allowClear
            showArrow
            className="filter-user-selector"
            onChange={handleFilterNameChange}
            getPopupContainer={(trigger) => trigger.parentElement}
            disabled={!isAdmin}
            value={filterValue.users}
          >
            {users.map((user) => (
              <Select.Option
                key={user.id}
                value={isChineseEnv ? user.chineseName : user.englishName}
              >
                {isChineseEnv ? user.chineseName : user.englishName}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row className="filter-row">
        <Col span={2} className="filter-row-title-container">
          <Title level={5}>
            {locale.components.leaveManagement.commons.leaveTypes}:
          </Title>
        </Col>
        <Col span={22}>
          <Select
            mode="multiple"
            allowClear
            showArrow
            className="filter-leaveDayTypes-selector"
            onChange={handleFilterLeaveTypeChange}
            getPopupContainer={(trigger) => trigger.parentElement}
          >
            {leaveDayTypes &&
              leaveDayTypes.map((type) => (
                <Select.Option key={type.id}>{type.name}</Select.Option>
              ))}
          </Select>
        </Col>
      </Row>
      <Row className="filter-row">
        <Col span={2} className="filter-row-title-container">
          <Title level={5}>
            {locale.components.leaveManagement.commons.date}:
          </Title>
        </Col>
        <Col span={22}>
          <RangePicker
            format={locale.components.leaveManagement.fullDateFormat}
            disabledHours={disabledRangeTime}
            showTime={{
              hideDisabledOptions: true,
              format: locale.components.leaveManagement.timeFormat,
              minuteStep: 60,
            }}
            onChange={handleFilterDateChange}
            inputReadOnly
            getPopupContainer={(trigger) => trigger.parentElement}
          />
        </Col>
      </Row>
    </div>
  );
}
