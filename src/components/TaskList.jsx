import React, { useState, useContext } from 'react';
import TaskCard from './TaskCard';
import AddUpdateModal from './AddUpdateModal';
import { GlobalContext } from '../contexts/GlobalContext';
import { fetchTasks } from '../utils/tasksFunctions';
import axiosInstance from '../utils/axiosInstance';

const TaskList = ({ tasks, setTasks, isModalOpen }) => {
  const { setIsLoading, setErrorMessage, errorMessage } = useContext(GlobalContext);
  const [selectedTaskId, setSelectedTaskId] = useState(null);


  //MODAL

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openModal = (type, taskId = null) => {
    if (type === 'update') {
      setSelectedTaskId(taskId);
      setIsEditModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedTaskId(null);
  };

  const handleMarkAsCompleted = async (taskId) => {
    console.log("IN handleMarkAsCompleted");
    try {
      
      setIsLoading(true);
      
      const newStatus = tasks.find((task) => task._id === taskId).status === 'pending' ? 'completed' : 'pending';
      console.log(taskId);
          
        const res = await axiosInstance.patch(`/api/tasks/statuschange/${taskId}`, { status: newStatus });
        console.log("fadsf");
        
        console.log(res.data);
        await fetchTasks(setIsLoading, setTasks, setErrorMessage);
        
        setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
        setIsLoading(false);
      }
    }
  };

  const deleteTask = async (task_id) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`api/tasks/delete/${task_id}`)
      await fetchTasks(setIsLoading,setTasks, setErrorMessage);
      setIsLoading(false);

    } catch (error) {
       if (error.response) {
        setErrorMessage(error.response.data.error);
        setIsLoading(false);
      }
    }
  }

  return (
    <div>
        {errorMessage && <p className='text-red-700 text-center font-bold'>Error: {errorMessage}</p>}
        {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          openModal={openModal}
          handleMarkAsCompleted={handleMarkAsCompleted}
          deleteTask={deleteTask}
        />
      ))}

      {/* Single Modal Instance */}
      {(isModalOpen || isEditModalOpen) && (
        <AddUpdateModal
          type={isEditModalOpen ? 'update' : 'add'}
          closeModal={closeModal}
          setTasks={setTasks}
          selectedTaskId={selectedTaskId}
        />
      )}
    </div>
  );
};

export default TaskList;
