import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import { getList, updateListFavorite, deleteList } from "@/modules/fetchList";
import ListTableRow from "./ListTableRow";
function ListTable() {
  const router = useRouter();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fecthData = async () => {
        const response = await getList();
        setLists(response)
      };
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

  const handleDelete = async (id) => {
    try {
      const response = await deleteList(id)
      setLists((prevLists) => prevLists.filter((list) => list.id !== id));
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="sm:px-6 w-full">
  <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 shadow-md">
    <div className="sm:flex items-center justify-between">
      <button
        onClick={() => router.push('/app/lists/add')}
        className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
      >
        <p className="text-sm font-medium leading-none text-white">Add List</p>
      </button>
    </div>
    <div className="mt-7 overflow-x-auto">
      <div className="w-full whitespace-nowrap">
        {lists.length > 0 ? (
          lists.map((list) => (
            <ListTableRow list={list} key={list.id}>
              <div className="flex justify-between">
              <svg onClick={() => handleFavorite(list.id, list.isFavorites)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 cursor-pointer ${list.isFavorites === true ? 'text-red-600' : 'text-gray-300'}`}>
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
              <svg onClick={() => handleDelete(list.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="hover:text-gray-600 cursor-pointer ml-2 w-5 h-5 text-gray-200">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
              </div>
            </ListTableRow>
          ))
        ) : (
          <p>List not found!</p>
        )}
      </div>
    </div>
  </div>
</div>

  );
}

export default ListTable;
