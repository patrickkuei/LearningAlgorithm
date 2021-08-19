import { useRef, useEffect } from "react";
import axios from "axios";

export default function useCancelToken() {
  const cancelTokenSource = useRef(axios.CancelToken.source());
  const { isCancel } = axios;
  useEffect(
    () => () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel("Operation canceled by the user.");
      }
    },
    []
  );

  return {
    cancelToken: cancelTokenSource.current
      ? cancelTokenSource.current.token
      : null,
    isCancel,
  };
}
