import React, { useContext, useEffect, useState } from 'react'
import { AuthButton, Button, InputField, Label, TextArea } from './FormInputs'
import { GlobalContext } from '../contexts/GlobalContext'
import axiosInstance from '../utils/axiosInstance';
import { addTask, fetchTasks, updateTask } from '../utils/tasksFunctions';

const AddUpdateModal = ({type, closeModal, setTasks, selectedTaskId}) => {

    console.log(type);
    
    const {
        isLoading, setIsLoading,
        errorMessage, setErrorMessage
    } = useContext(GlobalContext);

    const [taskDetails, setTaskDetails] = useState({
        title: '',
        description: '',
        status: 'pending'
    })

    const fetchTaskDetails = async () => {
      try {
        console.log("fetchTaskDetails");
        console.log(selectedTaskId);
        
        const res =await axiosInstance.get(`/api/tasks/fetch_task_details/${selectedTaskId}`)
        console.log(res);
        
        setTaskDetails(res.data.taskDetails);

      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.error); 
          setIsLoading(false)
        }
      }
    }
    useEffect(() => {
      console.log('useEffect triggered', { type, selectedTaskId });
      if(type === 'update'){
        fetchTaskDetails();
      }
    }, [type, selectedTaskId])
    

const handleAddorUpdate = (type, setIsLoading, taskDetails, task_id,  fetchTasks, setTasks, setErrorMessage, closeModal) => {
  if(type === 'update'){
    updateTask(setIsLoading, taskDetails, task_id, fetchTasks, setTasks, setErrorMessage, closeModal)
  }else{
    console.log("Calling add Task ");
    
    addTask(setIsLoading, taskDetails, fetchTasks, setTasks, setErrorMessage, closeModal)
  }
}
    

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-black/20 z-50 ">
    <div className="bg-white p-6 rounded-lg w-full max-w-lg"> 
      <h2 className="text-xl font-bold text-gray-800 mb-4">{type === 'update' ? 'Update Task' : "Add Task"}</h2>

      {/* show error message */}
      {errorMessage && <p className='text-red-700 text-center font-bold'>Error: {errorMessage}</p>}

      <form className='space-y-3'>  
        <div>
            <Label htmlFor="title" labelName="Title" />
            <InputField 
                type='text'
                id="title"
                name="title"
                placeholder="Enter Title"
                value={taskDetails.title}
                setData={setTaskDetails}
            />
        </div>
        <div>
            <Label htmlFor="description" labelName="Description" />
            <TextArea 
                type='text'
                id="description"
                name="description"
                placeholder="Enter description"
                value={taskDetails.description}
                setData={setTaskDetails}
            />
        </div>
        

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className={`bg-gray-300 text-gray-800 px-4 py-2 rounded w-full cursor-pointer`}
            onClick={() => closeModal(`${type === 'update'? 'update': ''}`)}

          >
            Cancel
          </button>
          <AuthButton 
            type='button'
            buttonName={type === 'update' ? `Update Task` : 'Add Task'}
            onClick={() => handleAddorUpdate(type, setIsLoading, taskDetails, selectedTaskId,  fetchTasks, setTasks, setErrorMessage, closeModal)}
          />
        
        </div>
      </form>
    </div>
  </div>
  )
}

export default AddUpdateModal