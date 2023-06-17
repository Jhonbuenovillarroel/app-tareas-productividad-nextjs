"use client";

import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Temporizador from "@/components/Temporizador";
import { HomeContext } from "@/contexts/context";
import { useEffect, useState } from "react";

export default function Home() {
   const [tareas, setTareas] = useState([]);
   const [mostrarFormulario, setMostrarFormulario] = useState(false);
   const [datosFormulario, setDatosFormulario] = useState({
      editar: false,
      completado: 0,
   });
   const [temporizadorAbierto, setTemporizadorAbierto] = useState(false);

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
      setDatosFormulario(tareaActualizada);
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

   function recibirIdParaEliminarTarea(id) {
      setTareas(
         tareas.filter((tarea) => {
            if (tarea.id !== id) {
               return tarea;
            }
         })
      );
   }

   function cerrarAbrirTemporizador(boolean) {
      setTemporizadorAbierto(boolean);
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
            datosFormulario,
            cerrarAbrirTemporizador,
            temporizadorAbierto,
         }}
      >
         <main className="grid">
            <Button
               className="shadow-[0_0_100px_-4px_rgba(27,53,108,0.75)] px-4 py-3 w-44 rounded-md justify-self-center bg-cyan-700 mt-12"
               value="Agregar Tarea"
               onClick={cerrarAbrirFormulario}
            />
            {temporizadorAbierto && <Temporizador />}
            {mostrarFormulario && <TaskForm />}
            <TaskList />
         </main>
      </HomeContext.Provider>
   );
}
