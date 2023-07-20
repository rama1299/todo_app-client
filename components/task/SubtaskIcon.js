import React from "react";

function SubtaskIcon({ data }) {
  return (
    <td class="pl-5">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M7.5 5H16.6667"
            stroke="#52525B"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7.5 10H16.6667"
            stroke="#52525B"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7.5 15H16.6667"
            stroke="#52525B"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M4.16669 5V5.00667"
            stroke="#52525B"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M4.16669 10V10.0067"
            stroke="#52525B"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M4.16669 15V15.0067"
            stroke="#52525B"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <p class="text-sm leading-none text-gray-600 ml-2">{data.length}</p>
      </div>
    </td>
  );
}

export default SubtaskIcon;
