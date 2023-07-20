import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import { getList, updateListFavorite } from "@/modules/fetchList";
import ListTableRow from "./ListTableRow";

function ListTable() {
  const router = useRouter();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fecthData = async () => {
        const response = await getList();
        setLists(response)      };
      fecthData();
    }
  }, []);

  const handleFavorite = async (id, isFavorites) => {
    try {
      let newFavorites;

    if(isFavorites === false) {
      newFavorites = true
    } else if (isFavorites === true) {
      newFavorites = false
    }

      const data = {
        id,
        isFavorites: newFavorites
      }
      const response = await updateListFavorite(data)
      console.log(response)
      setLists(lists.map(list => {
        if (list.id === id) {
          return {
            ...list,
            isFavorites: newFavorites,
          };
        }
        return list;
      }));
    } catch (error) {
      console.error(error)
    }
  }

  const listFavorites = lists.filter((list) => list.isFavorites === true);

  return (
    <div className="sm:px-6 w-full">
  <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 shadow-md">
    <div className=" overflow-x-auto">
      <div className="w-full whitespace-nowrap">
      {listFavorites.length > 0 ? (
            listFavorites.map((list) => (
              <ListTableRow list={list} key={list.id}>
              <svg onClick={() => handleFavorite(list.id, list.isFavorites)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 cursor-pointer ${list.isFavorites === true ? 'text-red-600' : 'text-gray-300'}`}>
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
            </ListTableRow>
          ))
        ) : (
          <p>List favorite not found!</p>
        )}
      </div>
    </div>
  </div>
</div>

  );
}

export default ListTable;
