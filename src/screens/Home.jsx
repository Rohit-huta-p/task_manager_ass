import React, { useContext, useEffect, useMemo, useState } from 'react'
import {InputField, Button, Label} from '../components/FormInputs'
import AddUpdateModal from '../components/AddUpdateModal'
import TaskCard from '../components/TaskCard'
import { fetchTasks } from '../utils/tasksFunctions'
import { GlobalContext } from '../contexts/GlobalContext'
import Loader from '../components/Loader'
import Filter from '../components/Filter'
import TaskList from '../components/TaskList'
const Home = () => {
    const {
        isLoading, setIsLoading,
        errorMessage, setErrorMessage,
    } = useContext(GlobalContext)

    // tasks
    const [tasks, setTasks] = useState([])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const openModal = (type, selectedTaskId) => {
        if (type === "update") {
            setSelectedTaskId(selectedTaskId)
            setIsEditModalOpen(true);
        } else {
            setIsModalOpen(true);
        }
    }
    const closeModal = (type) => {
        if (type === "update") {
            setIsEditModalOpen(false);
          } else {
 
            setIsModalOpen(false);
          }
    }

    // filter 
    const [filter, setFilter] = useState("all"); 
    const fiteredTasks = useMemo(() => {
        if(filter === 'pending'){
          return tasks.filter((task) => task.status === 'pending')
        }else if(filter === 'completed'){
          return tasks.filter((task) => task.status === 'completed')
        }else{
          tasks
        }
      }, [filter])
    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return true;
        return task.status === filter;
      });

    useEffect(() => {
        fetchTasks(setIsLoading, setTasks, setErrorMessage);
    }, [])
    

  return (
    <div className="min-h-screen bg-gray-100 p-2 ">
      <div className="w-full ">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
     
        <div className="flex justify-end space-x-2 mb-4">
          <Filter filter={filter} setFilter={setFilter}/>

          {/* ADD TASK */}
          <Button 
            type='button'
            buttonName='Add Task'
            onClick={openModal} 
          />
        </div>
        <hr />

        {
             isLoading  ? (
              <div className='flex justify-center'>
                <Loader />
              </div>
            ) : (
                <TaskList  tasks={filteredTasks} setTasks={setTasks} isModalOpen={isModalOpen}/>
            )
        }
      </div>

    </div>
  )
}

export default Home