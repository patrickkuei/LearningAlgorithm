import axios from "axios";

export const leaveAPIs = {
  getLeaveDays: (cancelToken) =>
    axios.get("/leave_days", {
      cancelToken,
    }),

  getLeaveDaysById: (id, cancelToken) =>
    axios.get(`/leave_days/${id}`, { cancelToken }),

  getLeaveDayTypes: (cancelToken) =>
    axios.get("/leave_day_types", { cancelToken }),

  createLeaveDay: (newLeaveDay, cancelToken) =>
    axios.post("/leave_days", newLeaveDay, { cancelToken }),

  editLeaveDay: (editedLeaveDay, cancelToken) =>
    axios.put(`/leave_days/${editedLeaveDay.id}`, editedLeaveDay.data, {
      cancelToken,
    }),

  deleteLeaveDay: (id, cancelToken) =>
    axios.delete(`/leave_days/${id}`, { cancelToken }),
};
