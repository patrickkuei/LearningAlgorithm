import axios from "axios";
import { useEffect, useRef } from "react";

function useCancelToken() {
  const cancelTokenSource = useRef(axios.CancelToken.source());

  useEffect(() => () => cancelTokenSource.current?.cancel(), []);

  return cancelTokenSource.current?.token;
}

export default useCancelToken;
