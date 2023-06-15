"use client";

import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { HomeContext } from "@/contexts/context";
import { useEffect, useState } from "react";

export default function Home() {
   const [tareas, setTareas] = useState([]);
   const [mostrarFormulario, setMostrarFormulario] = useState(false);

   async function obtenerDatos() {
      const response = await fetch("/api/taskRoutes");
      const result = await response.json();
      setTareas(result);
   }

   function recibirNuevaTarea(nuevaTarea) {
      setTareas([...tareas, nuevaTarea]);
   }

   function cerrarAbrirFormulario() {
      if (mostrarFormulario === true) {
         setMostrarFormulario(false);
      } else {
         setMostrarFormulario(true);
      }
   }

   function recibirTareaActualizada(tareaActualizada) {
      setTareas(
         tareas.map((tarea) => {
            if (tarea.id === tareaActualizada.id) {
               return tareaActualizada;
            } else {
               return tarea;
            }
         })
      );
   }

   function recibirIdParaEliminarTarea(taskId) {
      setTareas(
         tareas.filter((tarea) => {
            if (tarea.id !== taskId) {
               return tarea;
            }
         })
      );
   }

   useEffect(() => {
      obtenerDatos();
   }, []);
   return (
      <HomeContext.Provider
         value={{
            tareas,
            recibirNuevaTarea,
            cerrarAbrirFormulario,
            recibirTareaActualizada,
            recibirIdParaEliminarTarea,
         }}
      >
         <main className="grid">
            <Button
               className="px-4 py-3 w-44 rounded-md justify-self-center bg-red-600 mt-12"
               value="Agregar Tarea"
               onClick={cerrarAbrirFormulario}
            />
            {mostrarFormulario && <TaskForm />}
            <TaskList />
         </main>
      </HomeContext.Provider>
   );
}
