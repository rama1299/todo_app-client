import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getListDetail, updateList } from "@/modules/fetchList";

const UpdateListForm = ({listId}) => {
  const [listName, setListName] = useState("");
  const [color, setColor] = useState("");
  const router = useRouter()

  useEffect(()=> {
    const fecthData = async () => {
        const response = await getListDetail(listId)
        setListName(response.listName)
        setColor(response.color)
    }
    fecthData()
  },[listId])

  const handleListNameChange = (e) => {
    setListName(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        listId,
        listName,
        color,
    }

    try {
        const response = await updateList(data)
        toast.success(response.message, {autoClose: 2000})
        router.push(`/app/lists/${listId}`)
    } catch (error) {
        console.error(error)
        toast.error(error.message, {autoClose: 2000})
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded">
  <div className="mb-4">
    <label htmlFor="listName" className="block text-gray-700 font-bold mb-2">List Name:</label>
    <input
      type="text"
      id="listName"
      value={listName}
      onChange={handleListNameChange}
      className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-indigo-600"
      required
    />
  </div>
  <div className="mb-4">
    <label htmlFor="color" className="block text-gray-700 font-bold mb-2">Color:</label>
    <select
      id="color"
      value={color}
      onChange={handleColorChange}
      className="w-full px-3 py-2 border rounded border-gray-400 focus:outline-none focus:border-indigo-600"
    >
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
      <option value="green">Green</option>
    </select>
  </div>
  <button
    type="submit"
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Submit
  </button>
</form>

  );
};

export default UpdateListForm;
