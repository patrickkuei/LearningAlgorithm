import axios, { AxiosResponse, CancelToken } from "axios";
import { useEffect, useState } from "react";

import useCancelToken from "./UseCancelToken";

interface UseRequestOptions<T> {
  /**
   * Default: true
   */
  fetchOnMount?: boolean;
  /**
   * Default: true
   */
  cancelOnUnmount?: boolean;
  /**
   * Default: null
   */
  defaultValue?: T | null;
  onCancel?: () => any;
  onError?: (error: Error) => any;
}

const getDefaultOptions = <T>(): UseRequestOptions<T> =>
  Object.freeze({
    fetchOnMount: true,
    cancelOnUnmount: true,
    defaultValue: null,
  });

type UseRequestState<T> = {
  isLoading: boolean;
  data: T | null;
};

type AxiosRequestCallback<T> = (
  cancelToken?: CancelToken
) => Promise<AxiosResponse<T>>;

function useAxiosRequest<T>(
  request: AxiosRequestCallback<T>,
  options?: UseRequestOptions<T>
) {
  const cancelToken = useCancelToken();
  const [state, setState] = useState<UseRequestState<T>>({
    isLoading: true,
    data: options?.defaultValue === undefined ? null : options?.defaultValue,
  });

  useEffect(() => {
    const _options = Object.assign(getDefaultOptions<T>(), options);
    const { fetchOnMount, onCancel, onError } = _options;

    fetchOnMount &&
      request(cancelToken)
        .then((response) =>
          setState((prev) => ({
            isLoading: false,
            data: response.data,
          }))
        )
        .catch((error) => {
          if (axios.isCancel(error)) {
            onCancel!();
          } else {
            if (onError) onError(error);
            else throw error;
          }
        });
    // eslint-disable-next-line
  }, []);

  return state;
}

export default useAxiosRequest;
