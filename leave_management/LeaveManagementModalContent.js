import React, { useState } from "react";
import { DatePicker, Form, Input, Select, TimePicker } from "antd";
import { useSelector } from "react-redux";
import { locale } from "../../locales/zh-TW";
import { disabledRangeTime, isChineseEnv } from "../../configs/leaveTypes";
import { LEAVE_DAY_TYPE } from "../../constants/leaveManagement";
const { Option } = Select;

export default function LeaveManagementModalContent({
  form,
  users,
  leaveDaysState,
}) {
  // eslint-disable-next-line no-unused-vars
  const [_, forceRender] = useState(false);

  const { roles } = useSelector((state) => state.auth);

  const isPersonalLeave = () => {
    if (!leaveDaysState.isLoading && leaveDaysState.leaveDayTypes) {
      const personalLeave = leaveDaysState.leaveDayTypes.find(
        (type) => type.id === LEAVE_DAY_TYPE.PERSONAL_LEAVE_ID
      );
      return form.getFieldValue("leaveTypeId") === personalLeave.id;
    }
  };

  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item className="no-display" name="id">
        <Input />
      </Form.Item>
      <Form.Item
        className={roles.length > 1 ? "input-container" : "no-display"}
        name="userId"
        label={locale.components.leaveManagement.commons.name}
        rules={[
          {
            required: true,
            message:
              locale.components.leaveManagement.modal.form.error
                .pleaseInputName,
          },
        ]}
      >
        <Select showSearch allowClear className="selector">
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {isChineseEnv ? user.chineseName : user.englishName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        className="input-container"
        label={locale.components.leaveManagement.commons.leaveTypes}
      >
        <Input.Group compact>
          <Form.Item
            name="leaveTypeId"
            noStyle
            rules={[
              {
                required: true,
                message:
                  locale.components.leaveManagement.modal.form.error
                    .pleaseInputType,
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              className={
                isPersonalLeave() ? "personal-leave-selector" : "selector"
              }
              onChange={() => forceRender((prev) => !prev)}
            >
              {!leaveDaysState.isLoading && leaveDaysState.leaveDayTypes
                ? leaveDaysState.leaveDayTypes.map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type.name}
                    </Option>
                  ))
                : null}
            </Select>
          </Form.Item>

          {isPersonalLeave() ? (
            <Form.Item
              name="description"
              noStyle
              rules={[
                {
                  required: true,
                  message:
                    locale.components.leaveManagement.modal.form.error
                      .pleaseInputComment,
                },
              ]}
            >
              <Input className="description" placeholder="description" />
            </Form.Item>
          ) : (
            <></>
          )}
        </Input.Group>
      </Form.Item>
      <Form.Item
        className="input-container"
        label={locale.components.leaveManagement.commons.date}
      >
        <Input.Group compact>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message:
                  locale.components.leaveManagement.modal.form.error
                    .pleaseInputDate,
              },
            ]}
          >
            <DatePicker inputReadOnly className="date-picker" />
          </Form.Item>
          <Form.Item
            name="timeRange"
            rules={[
              {
                required: true,
                message:
                  locale.components.leaveManagement.modal.form.error
                    .pleaseInputTime,
              },
            ]}
          >
            <TimePicker.RangePicker
              className="time-picker"
              inputReadOnly
              hideDisabledOptions={true}
              format={locale.components.leaveManagement.timeFormat}
              minuteStep={60}
              disabledHours={disabledRangeTime}
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </Form>
  );
}
