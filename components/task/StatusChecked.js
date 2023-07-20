import React from 'react'
import updateTaskStatus from '@/modules/fetchTask'
import { useState } from 'react'

function StatusChecked({data}) {
    const [isChecked, setIsChecked] = useState('false')

    const handleCheckbox = async (id) => {
        try {
          setIsChecked(!isChecked)
          const status = isChecked
          const response = await updateTaskStatus(id, status)
          console.log(response)
        } catch (error) {
    
        }
      }
  return (
                    <td>
                        <div className="ml-5">
                          <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                            <input
                              placeholder="checkbox"
                              type="checkbox"
                              className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                              onChange={handleCheckbox}
                            />
                          </div>
                        </div>
                      </td>
  )
}

export default StatusChecked