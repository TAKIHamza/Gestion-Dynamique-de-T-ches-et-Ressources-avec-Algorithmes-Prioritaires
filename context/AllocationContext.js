// /context/AllocationContext.js
"use client";
import { createContext, useContext, useState } from "react";

const AllocationContext = createContext();

export const AllocationProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);         // chaque tâche : { id, name, priority, duration }
  const [resources, setResources] = useState([]); // chaque ressource : { id, name, capacity }

  // Ajout de tâche
  const addTask = (task) => {
    const newTask = { ...task, id: Date.now() }; // Utilise l'heure actuelle comme ID unique
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };


  const toggleTaskDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

   // Fonction pour supprimer une tâche par ID
   const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Ajout de ressource
  const addResource = (resource) => {
    setResources((prev) => [...prev, { id: Date.now(), ...resource }]);
  };

  // Suppression de ressource
  const deleteResource = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <AllocationContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        deleteTask,
        resources,
        setResources,
        addResource,
        deleteResource,
        toggleTaskDone
      }}
    >
      {children}
    </AllocationContext.Provider>
  );
};

export const useAllocation = () => useContext(AllocationContext);
