// /context/AllocationContext.js
"use client";
import { fetchResources, fetchTasks, apideleteTask, apideleteResource, createTask, createResource, updateResour, updatTask } from "@/services/allocationService";
import { createContext, useContext, useEffect, useState } from "react";

const AllocationContext = createContext();

export const AllocationProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);         
  const [resources, setResources] = useState([]); 

const addTask = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prev) => [...prev, newTask]);
  };
const addResource = async (resourceData) => {
    const newResource = await createResource(resourceData);
    setResources((prev) => [...prev, newResource]);
  };
 const reorderTasks = (newOrder) => {
    setTasks(newOrder);
  };

  const toggleTaskDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, is_done: !task.is_done } : task
      )
    );
  };

 

    const refreshData = async () => {
  try {
    const [tasksData, resourcesData] = await Promise.all([
      fetchTasks(),
      fetchResources(),
    ]);
    console.log("tasksData:", tasksData);
    console.log("resourcesData:", resourcesData);
    setTasks(tasksData);
    setResources(resourcesData);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
};


  // === Chargement initial automatique ===
  useEffect(() => {
    refreshData();
  }, []);

  const deleteTask = async (id) => {
    try {
      await apideleteTask(id);  // appel API delete
      setTasks((prev) => prev.filter((task) => task.id !== id)); // update state local
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };
  // Suppression de ressource
const deleteResource = async (id) => {
    try {
      await apideleteResource(id);
      setResources((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la ressource :", error);
    }
  };
  const updateTask = async (id, taskData) => {
  try {
    // Call the API to update the task
    const updatedTask = await updatTask(id, taskData);
    
    // Update the local state
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error; // Re-throw to handle in the component if needed
  }
};
  const updateResource = async (id, resourceData) => {
  try {
    // Call the API to update the resource
    const updatedResource = await updateResour(id, resourceData);
    
    // Update the local state
    setResources(prevResources =>
      prevResources.map(resource =>
        resource.id === id ? { ...resource, ...updatedResource } : resource
      )
    );
    
    return updatedResource;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error; // Re-throw to handle in the component if needed
  }
};
  return (
    <AllocationContext.Provider
      value={{
        refreshData,
        tasks,
        addTask,
        setTasks,
        reorderTasks,
        deleteTask,
        updateTask,
        resources,
        addResource,
        setResources,
        updateResource,
        deleteResource,
        toggleTaskDone
      }}
    >
      {children}
    </AllocationContext.Provider>
  );
};

export const useAllocation = () => useContext(AllocationContext);
