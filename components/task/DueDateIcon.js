import React, { useEffect, useState } from "react";

function DueDateIcon({ data, status }) {
  
  return (
    <td className="pl-5">
      <div className={`py-3 text-center px-3 text-sm text-gray-600 focus:outline-none leading-none rounded w-36`}>
        <p>{data}</p>
      </div>
    </td>
  );
}

export default DueDateIcon;
