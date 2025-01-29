import React, { useContext, useState } from 'react'
import PendingLoader from './PendingLoader'
import { GlobalContext } from '../contexts/GlobalContext'
import axiosInstance from '../utils/axiosInstance'
import { fetchTasks } from '../utils/tasksFunctions'


// ICONS
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import AddUpdateModal from './AddUpdateModal'



const TaskCard = ({task, setTasks, openModal, closeModal, isModalOpen, isEditModalOpen, selectedTaskId, handleMarkAsCompleted, deleteTask}) => {
  const {
    isLoading, setIsLoading,
    errorMessage, setErrorMessage,
  } = useContext(GlobalContext)




  return (
    <div className={`${task.status === 'pending' ? "bg-yellow-100/20" : "bg-green-100/20"} flex items-center justify-between p-6  shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300`}>
      <div className='space-y-2'>
        <h3 className="text-2xl font-bold text-gray-800 ">{task.title}</h3>
        <p className="text-gray-500 text-base leading-relaxed">{task.description}</p>
      </div>
    <div className="flex flex-col justify-center items-end space-y-4">
      <div className='flex'>
        <FaPencil onClick={() => {
          
          openModal('update', task._id); }}/>
        <MdDelete className='ml-3' onClick={() => deleteTask(task._id)}/>
      </div>
      {/* Button - MARK AS COMPLETED */}
      <button
        type='button'
        onClick={() => handleMarkAsCompleted(task._id)}
        className={`cursor-pointer relative px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300 ${
          task.status === 'completed'
            ? "bg-green-600 text-white hover:bg-green-500"
            : "bg-yellow-100 text-gray-700 hover:bg-green-200 cursor-pointer"
        }`}
      >
        {/* Pending indicator */}
        {task.status === 'pending' ?  (
          <div className='absolute left-[-4px] top-[-4px]'>
            <PendingLoader />
          </div>
        ) 
        :""}
        {task.status === 'completed' ? "Mark as pending" : "Mark as Completed"}

      </button>
    </div>


    {
        isModalOpen && (
            <AddUpdateModal closeModal={closeModal} setTasks={setTasks} />
        )
      }

    {
        isEditModalOpen && (
            <AddUpdateModal type='update' closeModal={closeModal} setTasks={setTasks} selectedTaskId={selectedTaskId} />
        )
      }
  </div>
  
  
  
  )
}

export default TaskCard