import React, { useLayoutEffect, useState } from "react";
import { Table, Collapse, Button, Spin, Form, Row, Col, Statistic } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import getFormattedColumns from "./LeaveManagementTableColumns";
import { leaveAPIs } from "../../apis/leaveAPIs";
import { locale } from "../../locales/zh-TW";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import LeaveManagementModal from "./LeaveManagementModal";
import LeaveManagementFilter from "./LeaveManagementFilter";
import { useSelector, useDispatch } from "react-redux";
import { FROM } from "../../constants/leaveManagement";
import {
  LEAVE_DAY_TYPE,
  SPECIAL_LEAVE_TOTAL,
} from "../../constants/leaveManagement";
import { leaveManagementActions } from "../../redux/leaveManagementSlice";
import { getLeaveDaySummary } from "../../utilities";
const { Panel } = Collapse;

export default function LeaveManagement() {
  const { userProfile, roles } = useSelector((state) => state.auth);
  const isAdmin = roles.length > 1;
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const [leaveDaysState, setLeaveDaysState] = useAxiosRequest(
    (_, cancelToken) =>
      Promise.all([
        leaveAPIs.getLeaveDayTypes(cancelToken),
        isAdmin
          ? leaveAPIs.getLeaveDays(cancelToken)
          : leaveAPIs.getLeaveDaysById(userProfile.id, cancelToken),
      ]),
    {
      extraStateCallback: (res) => ({
        leaveDayTypes: res[0].data,
        leaveDays: res[1].data,
        filteredLeaveDays: res[1].data,
      }),
    }
  );
  // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const [modalState, setModalState] = useState({
    isVisible: false,
    from: null,
  });

  const [form] = Form.useForm();

  const handleCreateClick = () => {
    if (!isAdmin) {
      form.setFieldsValue({
        userId: userProfile.id,
      });
    }
    setModalState({ isVisible: true, from: FROM.CREATE });
  };

  const handleRowClick = (leaveDay) => {
    form.setFieldsValue({
      id: leaveDay.id,
      userId: leaveDay.userId,
      leaveTypeId: leaveDay.leaveTypeId,
      description: leaveDay.description,
      date: moment(leaveDay.startDate),
      timeRange: [moment(leaveDay.startDate), moment(leaveDay.endDate)],
    });
    setModalState({ isVisible: true, from: FROM.ROW });
  };

  const updateLeaveDaysState = (callback) => setLeaveDaysState(callback);

  const { leaveDaySummary } = useSelector((state) => state.leaveManagement);
  const [filterUsers, setFilterUsers] = useState([]);
  const dispatch = useDispatch();
  const { setLeaveDaySummary } = leaveManagementActions;

  useLayoutEffect(() => {
    if (!isAdmin && !leaveDaysState.isLoading) {
      setFilterUsers([userProfile.englishName]);
      const newLeaveDaySummary = getLeaveDaySummary(leaveDaysState);
      newLeaveDaySummary && dispatch(setLeaveDaySummary(newLeaveDaySummary));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveDaysState.isLoading]);

  return (
    <div className="leave-management-container">
      <Collapse bordered={false} className="filter-container">
        <Panel header={locale.components.leaveManagement.filter.title} key="1">
          {leaveDaysState.isLoading ? (
            <Spin></Spin>
          ) : (
            <LeaveManagementFilter
              leaveDaysState={leaveDaysState}
              updateLeaveDaysState={updateLeaveDaysState}
              setFilterUsers={setFilterUsers}
              isAdmin={isAdmin}
            />
          )}
        </Panel>
      </Collapse>
      <div className="table-title">
        <h1 className="title">{locale.components.leaveManagement.name}</h1>
        <Button
          disabled={leaveDaysState.isLoading}
          className="create-btn"
          onClick={handleCreateClick}
        >
          + {locale.components.leaveManagement.modal.create}
        </Button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Title level={5} className="row-title">
          {locale.components.leaveManagement.filter.leaveDaySummary}:
        </Title>
        <Row>
          {filterUsers.length === 1 ? (
            !leaveDaysState.isLoading ? (
              leaveDaysState.leaveDayTypes.map((type) => {
                const isSpecialLeave =
                  type.id === LEAVE_DAY_TYPE.SPECIAL_LEAVE_ID;
                return (
                  <Col key={type.id} span={6}>
                    <Statistic
                      title={type.name}
                      value={leaveDaySummary && leaveDaySummary[type.id]}
                      suffix={isSpecialLeave ? ` / ${SPECIAL_LEAVE_TOTAL}` : ""}
                    />
                  </Col>
                );
              })
            ) : null
          ) : (
            <Text type="danger">
              {locale.components.leaveManagement.filter.pleaseSelectUser}
            </Text>
          )}
        </Row>
      </div>

      <Table
        loading={leaveDaysState.isLoading}
        className="leave-management_table"
        columns={getFormattedColumns(
          leaveDaysState.leaveDayTypes,
          updateLeaveDaysState
        )}
        dataSource={leaveDaysState.filteredLeaveDays}
        pagination={{ showSizeChanger: true }}
        showSorterTooltip={false}
        rowClassName={"table-row"}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        scroll={{ x: 900, y: 300 }}
      />
      <LeaveManagementModal
        form={form}
        modalState={modalState}
        setModalState={setModalState}
        leaveDaysState={leaveDaysState}
        updateLeaveDaysState={updateLeaveDaysState}
        isAdmin={isAdmin}
      />
    </div>
  );
}
