import axiosInstance from "./axiosInstance";

export const fetchTasks = async (setIsLoading,setTasks, setErrorMessage) => {
    try {
      console.log("in fetching tasks");
      
        setIsLoading(true);
        const response = await axiosInstance.get('/api/tasks');
        setTasks((prev) => response.data.tasks);
        setIsLoading(false);
    } catch (error) {
        if (error.response) {
            setErrorMessage(error.response.data.error); // Set the error message
            setIsLoading(false)
          } else {

            setIsLoading(false)
          }
    }
}


export const addTask = async (setIsLoading, taskDetails, fetchTasks, setTasks, setErrorMessage, closeModal) => {
  try {
      console.log("IN ADD TASK");
      setIsLoading(true);
      const response = await axiosInstance.post('/api/tasks/add', taskDetails);
      fetchTasks(setIsLoading,setTasks, setErrorMessage);
      closeModal();
      setIsLoading(false)
  } catch (error) {
      if (error.response) {
          setErrorMessage(error.response.data.error); 
          setIsLoading(false)
        } 
  }
}

export const updateTask = async (setIsLoading, taskDetails, task_id, fetchTasks, setTasks, setErrorMessage, closeModal) => {
  try {
    console.log("IN UPDATE TASK");
    setIsLoading(true);
    console.log(task_id);
    
    const response = await axiosInstance.patch(`/api/tasks/update/${task_id}`, taskDetails);
    console.log(response.data);
    await fetchTasks(setIsLoading,setTasks, setErrorMessage);
    setIsLoading(false)
    closeModal();
  } catch (error) {
    if (error.response) {
      setErrorMessage(error.response.data.error); 
      setIsLoading(false)
    } 
  }
}




