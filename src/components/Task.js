import { HomeContext } from "@/contexts/context";
import { useContext, useState } from "react";
import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import CheckBox from "@/components/CheckBox";
import Temporizador from "@/components/Temporizador";

export default function Task({ datosTarea }) {
   const {
      cerrarAbrirFormulario,
      recibirTareaActualizada,
      recibirIdParaEliminarTarea,
      editar,
      cambiarEstadoDeEdicion,
      cerrarAbrirTemporizador,
      temporizadorAbierto,
      datosFormulario,
   } = useContext(HomeContext);

   return (
      <div className=" p-6 rounded-lg bg-gray-900 shadow-[0_0_100px_-4px_rgba(27,53,108,0.5)]">
         <div className="flex flex-wrap gap-1 items-center justify-between">
            <CheckBox
               datos={datosTarea}
               title="Marcar como completada"
               className="relative w-8 h-8 text-transparent rounded-full"
               value="."
            />
            <div>
               <p className="overflow-hidden w-80 font-bold text-lg">
                  {datosTarea.nombre}
               </p>
               <div className="mt-1 flex flex-row">
                  <button
                     onClick={() => {
                        cerrarAbrirTemporizador(true);
                        console.log(datosTarea);
                     }}
                     className="text-cyan-600 hover:text-cyan-400"
                  >
                     Iniciar Tarea
                  </button>
                  <button
                     className="text-cyan-600 ml-3 hover:text-cyan-400"
                     onClick={async () => {
                        if (datosTarea.completado === 0) {
                           recibirTareaActualizada({
                              ...datosTarea,
                              completado: 1,
                           });
                           const response = await fetch(
                              `/api/taskRoutes/${datosTarea.id}`,
                              {
                                 method: "PUT",
                                 headers: {
                                    "Content-Type": "application/json",
                                 },
                                 body: JSON.stringify({ completado: 1 }),
                              }
                           );
                        } else {
                           recibirTareaActualizada({
                              ...datosTarea,
                              completado: 0,
                           });
                           const response = await fetch(
                              `/api/taskRoutes/${datosTarea.id}`,
                              {
                                 method: "PUT",
                                 headers: {
                                    "Content-Type": "application/json",
                                 },
                                 body: JSON.stringify({ completado: 0 }),
                              }
                           );
                        }
                     }}
                  >
                     Marcar como completado
                  </button>
               </div>
            </div>
            {datosTarea.editar && <TaskForm />}
            <div className="grid grid-cols-2 gap-2">
               <Button
                  onClick={() => {
                     recibirTareaActualizada({
                        ...datosTarea,
                        id: datosTarea.id,
                        editar: true,
                     });
                  }}
                  className="px-4 py-3 w-40 rounded-md justify-self-center bg-cyan-900"
                  value="Editar"
               />
               <Button
                  onClick={async () => {
                     recibirIdParaEliminarTarea(datosTarea.id);

                     const response = await fetch(
                        `/api/taskRoutes/${datosTarea.id}`,
                        {
                           method: "DELETE",
                           headers: {
                              "Content-Type": "application/json",
                           },
                        }
                     );
                     const result = await response.json();
                  }}
                  className="px-4 py-3 w-40 rounded-md justify-self-center bg-gray-800"
                  value="Eliminar"
               />
            </div>
         </div>
      </div>
   );
}
