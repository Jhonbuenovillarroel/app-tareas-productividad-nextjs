import { HomeContext } from "@/contexts/context";
import { useContext, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import TaskForm from "@/components/TaskForm";
import CheckBox from "@/components/CheckBox";
import Image from "next/image";

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
      recibirTareasActualizadas,
   } = useContext(HomeContext);

   const [completado, setCompletado] = useState(0);
   const [posicionInicial, setPosicionInicial] = useState({ x: 0, y: 0 });
   const [draggable, setDraggable] = useState(false);
   const [agregarEvento, setAgregarEvento] = useState(true);
   const [intervaloEjecutado, setIntervaloEjecutado] = useState(false);
   const [posicionX, setPosicionX] = useState();
   const [posicionY, setPosicionY] = useState();

   const taskContainer = useRef(null);
   const elementoInvisible = useRef(null);
   const setIntervalRef = useRef(null);
   const imagenArrastre = useRef(null);

   useEffect(() => {
      tareas.map((tarea) => {
         if (tarea.id === datosTarea.id) {
            setCompletado(tarea.completado);
         }
      });
   });

   // useEffect(() => {
   //    const handleMouseLeave = (event) => {
   //       if (event.clientY <= 10 || event.clientY >= window.innerHeight) {
   //          setIntervalRef.current = setInterval(() => {
   //             window.scrollBy(0, 9);
   //          }, 10);
   //       }
   //    };

   //    window.addEventListener("mouseout", handleMouseLeave);
   // }, []);

   function drop_handle(event) {
      event.preventDefault();
   }

   function dragover_handle(event) {
      event.preventDefault();
   }

   function drag_handle(event) {
      const elementoActual = event.currentTarget;
      const contenedorTarea = event.currentTarget.parentNode;
      const elementoPadre = event.currentTarget.parentNode.parentNode;
      const listaDeTareas =
         event.currentTarget.parentNode.parentNode.childNodes;

      // setPosicionY(event.clientY - posicionInicial.y);
      // setPosicionX(event.clientX - posicionInicial.x);
      // taskContainer.current.style.position = "relative";
      // taskContainer.current.style.top = `${posicionY}px`;
      // taskContainer.current.style.left = `${posicionX}px`;

      if (
         event.clientY <= window.innerHeight - 180 &&
         event.clientY >= window.innerHeight - 480
      ) {
         clearInterval(setIntervalRef.current);
         // setIntervaloEjecutado(true);
      } else {
         if (event.clientY > window.innerHeight - 180) {
            setIntervaloEjecutado(false);
         } else if (event.clientY < window.innerHeight - 480) {
            setIntervaloEjecutado(true);
         }

         if (!intervaloEjecutado) {
            if (event.clientY > window.innerHeight - 180) {
               clearInterval(setIntervalRef.current);
               setIntervaloEjecutado(true);
               setIntervalRef.current = setInterval(() => {
                  window.scrollBy(0, 3);
               }, 10);
            }
         } else {
            if (event.clientY < window.innerHeight - 480 && event.clientY > 0) {
               clearInterval(setIntervalRef.current);
               setIntervaloEjecutado(false);
               setIntervalRef.current = setInterval(() => {
                  window.scrollBy(0, -3);
               }, 10);
            }
         }
      }

      for (let i = 1; i < listaDeTareas.length; i++) {
         if (listaDeTareas[i] === contenedorTarea) {
            if (i <= 1) {
               const coordenadas = listaDeTareas[i + 1].getBoundingClientRect();
               if (event.clientY > coordenadas.y) {
                  // setPosicionInicial((prev) => {
                  //    return {
                  //       x: event.clientX + (event.clientX - prev.x),
                  //       y: event.clientY + (event.clientY - prev.y),
                  //    };
                  // });
                  const eliminado = contenedorTarea.removeChild(
                     listaDeTareas[i].childNodes[0]
                  );
                  contenedorTarea.appendChild(
                     listaDeTareas[i + 1].childNodes[0]
                  );
                  listaDeTareas[i + 1].appendChild(eliminado);
               }
            } else {
               let coordenadasElementoPosterior;
               if (i < listaDeTareas.length - 1) {
                  coordenadasElementoPosterior =
                     listaDeTareas[i + 1].getBoundingClientRect();
               }
               const coordenadasElementoAnterior =
                  listaDeTareas[i - 1].getBoundingClientRect();

               if (
                  i < listaDeTareas.length - 1 &&
                  event.clientY > coordenadasElementoPosterior.y
               ) {
                  // setPosicionInicial((prev) => {
                  //    return {
                  //       x: event.clientX + (event.clientX - prev.x),
                  //       y: event.clientY + (event.clientY - prev.y),
                  //    };
                  // });
                  const eliminado = contenedorTarea.removeChild(
                     listaDeTareas[i].childNodes[0]
                  );
                  contenedorTarea.appendChild(
                     listaDeTareas[i + 1].childNodes[0]
                  );
                  listaDeTareas[i + 1].appendChild(eliminado);
               }
               if (event.clientY < coordenadasElementoAnterior.y + 114) {
                  // console.log(coordenadasElementoAnterior.y, event.clientY);

                  const eliminado = contenedorTarea.removeChild(
                     listaDeTareas[i].childNodes[0]
                  );
                  contenedorTarea.appendChild(
                     listaDeTareas[i - 1].childNodes[0]
                  );
                  listaDeTareas[i - 1].appendChild(eliminado);
               }
            }
         }
      }
      event.target.classList.remove("opacity-100");
      event.target.classList.add("opacity-0");
   }

   function dragstart_handle(event) {
      setPosicionInicial({
         x: event.clientX,
         y: event.clientY,
      });
      // event.target.classList.add("bg-cyan-900");
      // event.target.classList.remove("bg-gray-900");

      console.log(event.currentTarget.childNodes[0].childNodes[0]);

      setAgregarEvento(false);
   }

   function dragend_handle(event) {
      taskContainer.current.style.position = `static`;
      setDraggable(false);
      // event.target.classList.remove("bg-cyan-900");
      // event.target.classList.add("bg-gray-900");
      event.target.classList.add("opacity-100");
      event.target.classList.remove("opacity-0");
      clearInterval(setIntervalRef.current);
   }

   function dragleave_handle(event) {
      // console.log(event.target);
   }

   function dragenter_handle(event) {
      // console.log("Se ejecuta");
   }

   function makeElementDraggable() {
      setDraggable(true);
   }

   return (
      <div className="w-full grid justify-items-center justify-self-center">
         <div
            onDragEnter={agregarEvento ? dragenter_handle : null}
            onDragLeave={dragleave_handle}
            onDragOver={dragover_handle}
            onDrop={drop_handle}
            ref={taskContainer}
            draggable={draggable}
            onDrag={drag_handle}
            onDragEnd={dragend_handle}
            onDragStart={dragstart_handle}
            className=" flex flex-col max-w-xs w-full sm:w-full sm:max-w-4xl  rounded-lg bg-gray-900 sm:flex-row sm:items-center sm:justify-between gap-6 p-6"
         >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
               <Image
                  ref={imagenArrastre}
                  onMouseDown={makeElementDraggable}
                  className="cursor-grab"
                  src="/drag.png"
                  width={32}
                  height={32}
                  alt="Picture of the autor"
               />
               <CheckBox
                  datos={datosTarea}
                  title="Marcar como completada"
                  className=" w-8 h-8 text-transparent rounded-full"
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
                  className="px-4 py-3 sm:w-36 h-12 rounded-md justify-self-center bg-cyan-800"
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
                  }}
                  className="px-4 py-3 sm:w-36 h-12 rounded-md justify-self-center bg-gray-800"
                  value="Eliminar"
               />
            </div>
         </div>
      </div>
   );
}
