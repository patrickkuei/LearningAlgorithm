import axios from "axios";

const myAPI = {
  getItemList: (cancelToken) => axios.get("...", { cancelToken }),
};

export default myAPI;
