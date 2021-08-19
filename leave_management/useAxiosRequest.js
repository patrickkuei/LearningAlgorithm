import { useEffect, useState } from "react";
import useCancelToken from "./useCancelToken";

/**
 * @param {(requestConfigs, cancelToken: object)=>Promise<AxiosResponse>} axiosRequestCallback - axios request callback
 * @param {object} options
 * @param {boolean} options.fetchOnMount
 * @param {(data: AxiosResponseData)=>void} options.extraStateCallback
 * @param {(response: AxiosResponse, requestConfigs?:object)=>void} options.onFetchSuccess
 * @param {(error: AxiosError)=>void} options.onCancel
 * @param {(error: AxiosError)=>void} options.onError
 * @param {array} options.dependencies
 * @returns {[
 *            {isLoading: boolean; data: any;},
 *            React.Dispatch<React.SetStateAction<{isLoading: boolean;data: any;}>>,
 *            (requestConfigs?: object)=>void
 *          ]} [state, setState, fetchFunction]
 */
export default function useAxiosRequest(axiosRequestCallback, options = null) {
  // initialize options value
  const _options = Object.assign(
    { fetchOnMount: true, dependencies: [] },
    options
  );
  const {
    fetchOnMount,
    extraStateCallback,
    onFetchSuccess,
    onCancel,
    onError,
    dependencies,
  } = _options;

  const [state, setState] = useState({
    isLoading: false,
    data: null,
  });
  const { cancelToken, isCancel } = useCancelToken();

  // export fetch function with cancelToken
  const fetch = async (requestConfigs = null) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    // call api
    axiosRequestCallback(requestConfigs, cancelToken)
      .then((res) => {
        if (onFetchSuccess) {
          onFetchSuccess(res, requestConfigs);
        }
        const extraStateValue = extraStateCallback && extraStateCallback(res);
        setState(
          Object.assign({ isLoading: false, data: res.data }, extraStateValue)
        );
      })
      .catch((err) => {
        if (isCancel(err)) {
          if (onCancel) {
            onCancel(err);
          } else {
            console.log(axiosRequestCallback, err.message);
          }
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
          if (onError) {
            onError(err);
          } else {
            console.log("request error: ", err);
          }
        }
      });
  };

  useEffect(() => {
    fetchOnMount && fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return [state, setState, fetch];
}
