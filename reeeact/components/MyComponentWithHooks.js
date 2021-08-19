import React from "react";

import myAPI from "../api/my-api";
import useAxiosRequest from "../hooks/UseAxiosRequest";

function MyComponentWithHooks() {
  const itemList = useAxiosRequest(myAPI.getItemList);

  return (
    <div>
      {itemList.isLoading ? (
        "Loading..."
      ) : (
        <ol>
          {itemList.data.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default MyComponentWithHooks;
