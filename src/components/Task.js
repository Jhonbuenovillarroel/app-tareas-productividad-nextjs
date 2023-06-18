import { HomeContext } from "@/contexts/context";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import CheckBox from "@/components/CheckBox";
import Temporizador from "@/components/Temporizador";

export default function Task({ datosTarea }) {
   const {
      tareas,
      cerrarAbrirFormulario,
      recibirTareaActualizada,
      recibirIdParaEliminarTarea,
      editar,
      cambiarEstadoDeEdicion,
      cerrarAbrirTemporizador,
      temporizadorAbierto,
      datosFormulario,
   } = useContext(HomeContext);

   const [completado, setCompletado] = useState(0);

   useEffect(() => {
      tareas.map((tarea) => {
         if (tarea.id === datosTarea.id) {
            setCompletado(tarea.completado);
         }
      });
   });

   return (
      <div className="flex max-w-xs w-full sm:w-full sm:max-w-4xl justify-self-center p-6 rounded-lg bg-gray-900 shadow-[0_0_100px_-4px_rgba(27,53,108,0.5)]">
         <div className="flex flex-col w-full sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
               <CheckBox
                  datos={datosTarea}
                  title="Marcar como completada"
                  className="w-8 h-8 text-transparent rounded-full"
                  value="."
               />
               <div className="mt-2 sm:mt-0 flex flex-col w-auto">
                  <p className="mt-2 overflow-hidden max-w-sm font-bold text-lg">
                     {datosTarea.nombre}
                  </p>
                  <div className="mt-1 mb-3 flex flex-col md:flex-row items-start">
                     <button
                        disabled={completado ? "disabled" : ""}
                        className="text-cyan-600 cursor-pointer hover:text-cyan-400"
                        onClick={() => {
                           recibirTareaActualizada({
                              ...datosTarea,
                              completado: 0,
                           });
                           cerrarAbrirTemporizador(true);
                        }}
                     >
                        Iniciar Tarea
                     </button>
                     <button
                        className="text-cyan-600 md:ml-4 hover:text-cyan-400"
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
            </div>
            {datosTarea.editar && <TaskForm />}
            <div className="flex w-auto flex-col md:flex-row gap-2">
               <Button
                  onClick={() => {
                     recibirTareaActualizada({
                        ...datosTarea,
                        id: datosTarea.id,
                        editar: true,
                     });
                  }}
                  className="px-4 py-3 sm:w-36 h-12 rounded-md justify-self-center bg-cyan-900"
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
                  className="px-4 py-3 sm:w-36 h-12 rounded-md justify-self-center bg-gray-800"
                  value="Eliminar"
               />
            </div>
         </div>
      </div>
   );
}
