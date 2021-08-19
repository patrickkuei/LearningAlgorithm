import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import myAPI from "../api/my-api";

function MyComponent() {
  const [itemListState, setItemListState] = useState({
    isLoading: true,
    data: [],
  });

  const cancelTokenSourceRef = useRef(axios.CancelToken.source());

  useEffect(() => {
    getItemListAsync();
    return () => {
      const { current } = cancelTokenSourceRef;
      current && current.cancel();
    };
  }, []);

  const getItemListAsync = async () => {
    const { current } = cancelTokenSourceRef;
    const items = await myAPI.getItemList({
      cancelToken: current ? current.token : null,
    });
    setItemListState({
      isLoading: false,
      data: items,
    });
  };

  return (
    <div>
      {itemListState.isLoading ? (
        "Loading..."
      ) : (
        <ol>
          {itemListState.data.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default MyComponent;
