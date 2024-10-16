import React, { useContext, useState } from "react";

import { context } from "../../../hooks/Context";

function Member({ data }) {
  const { defaultPfp } = useContext(context);
  const pfp = data?.profilePic || defaultPfp;
  console.log(data);
  return (
    <div>
      <div className="flex flex-row justify-between content-center">
        <div className="size-fit">
          <img className=" size-[8vh] rounded-[100%]" src={pfp} alt="pfp" />
        </div>
        <div className="self-center flex-1">{data?.userName}</div>
      </div>

      <div className="divider m-0"></div>
    </div>
  );
}

export default Member;
