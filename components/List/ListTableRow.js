import React, { Children, useEffect, useState } from "react";
import { useRouter } from "next/router";

function ListTableRow({ list, children }) {
  const router = useRouter();
  const[className, setClassName] = useState()

  useEffect(() => {
    const findColor = async () => {
      let color
        try {
          if (list.color === "red") {
            color = "mr-2 h-5 w-5 text-red-400"
          } else if (list.color === "blue") {
            color = "mr-2 h-5 w-5 text-blue-400"
          } else if (list.color === "yellow") {
            color = "mr-2 h-5 w-5 text-yellow-400"
          } else {
            color = "mr-2 h-5 w-5 text-green-400"
          }
          setClassName(color)
      } catch (error) {
        console.error(error)
      }
    }
  
    findColor()
  },[])

  return (
    <>
  <div
    tabIndex={0}
    className="focus:outline-none h-16 border border-gray-200 rounded"
  >
    <div className="flex items-center p-5 justify-between">
    <div className="flex justify-between cursor-pointer " onClick={() => {
      router.push(`/app/lists/${list.id}`);
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
          <path fill-rule="evenodd" d="M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0114.75 19h-9.5A2.25 2.25 0 013 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 019 1h2c1.373 0 2.531.923 2.887 2.182zM7.5 4A1.5 1.5 0 019 2.5h2A1.5 1.5 0 0112.5 4v.5h-5V4z" clip-rule="evenodd" />
        </svg>
        <p className=" text-base font-medium leading-none text-gray-700 mr-2 hover:text-blue-600" >
        {list.listName}
      </p>
      </div>
        {children}
    </div>
  </div>
  <div className="h-3"></div>
</>


  );
}

export default ListTableRow;
