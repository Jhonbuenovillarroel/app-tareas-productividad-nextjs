"use client";

import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Temporizador from "@/components/Temporizador";
import { HomeContext } from "@/contexts/context";
import { useEffect, useState, useRef } from "react";
import worker from "@/webWorkers/workers";

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
      console.log(result);
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

   const first = useRef(null);
   const second = useRef(null);

   worker.onmessage = (e) => {
      console.log(e.data);
   };

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
         <main className="grid box-border">
            <input
               onChange={() => {
                  worker.postMessage([
                     first.current.value,
                     second.current.value,
                  ]);
                  console.log("Message posted to worker");
               }}
               ref={first}
               type="text"
               className="w-40 text-black p-2"
            />
            <input
               onChange={() => {
                  worker.postMessage([
                     first.current.value,
                     second.current.value,
                  ]);
                  console.log("Message posted to worker");
               }}
               ref={second}
               type="text"
               className="w-40 text-black mt-2 p-2"
            />
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
