import { HomeContext } from "@/contexts/context";
import { useContext } from "react";
import Image from "next/image";
import Button from "@/components/Button";

export default function TaskForm() {
   const {
      recibirNuevaTarea,
      cerrarAbrirFormulario,
      recibirTareaActualizada,
      recibirIdParaEliminarTarea,
      datosFormulario,
   } = useContext(HomeContext);

   async function agregarTarea(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
      const response = await fetch("/api/taskRoutes", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formJson),
      });
      const data = await response.json();
      recibirNuevaTarea({ ...data, completado: 0 });
      form.reset();
   }

   return (
      <div className="box-border w-auto">
         <div className="before:content-[''] before:fixed before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-10"></div>
         <form
            className="fixed z-20 max-w-[288px] w-screen sm:h-auto left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] bg-[rgba(0,0,0,0.85)] shadow-[0_0_100px_-4px_rgba(20,38,77,0.5)] flex flex-col gap-2 py-12 px-8 rounded-lg"
            onSubmit={agregarTarea}
            action=""
         >
            <Image
               onClick={() => {
                  if (datosFormulario.editar) {
                     recibirTareaActualizada({
                        ...datosFormulario,
                        editar: false,
                     });
                  } else {
                     cerrarAbrirFormulario();
                  }
               }}
               className=" cursor-pointer absolute right-2 top-2"
               src="/delete.png"
               width={36}
               height={36}
               alt="Botón cerrar formulario"
            />
            <div className="flex flex-col gap-1">
               <label htmlFor="nombre">Nombre:</label>
               <input
                  required
                  value={
                     datosFormulario.editar ? datosFormulario.nombre : undefined
                  }
                  onChange={(e) => {
                     datosFormulario.editar
                        ? recibirTareaActualizada({
                             ...datosFormulario,
                             nombre: e.target.value,
                          })
                        : undefined;
                  }}
                  className="bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  type="text"
                  name="nombre"
                  id="nombre"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="fechaInicio">Inicio:</label>
               <input
                  required
                  value={
                     datosFormulario.editar
                        ? datosFormulario.fechaInicio.slice(0, 10)
                        : undefined
                  }
                  onChange={(e) => {
                     datosFormulario.editar
                        ? recibirTareaActualizada({
                             ...datosFormulario,
                             fechaInicio: e.target.value,
                          })
                        : undefined;
                  }}
                  className="w-auto calendar-white bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  type="date"
                  name="fechaInicio"
                  id="fechaInicio"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="fechaTermino">Finalización: </label>
               <input
                  required
                  value={
                     datosFormulario.editar
                        ? datosFormulario.fechaTermino.slice(0, 10)
                        : undefined
                  }
                  onChange={(e) => {
                     datosFormulario.editar
                        ? recibirTareaActualizada({
                             ...datosFormulario,
                             fechaTermino: e.target.value,
                          })
                        : undefined;
                  }}
                  className="w-auto calendar-white bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  type="date"
                  name="fechaTermino"
                  id="fechaTermino"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="tiempo">
                  Tiempo Límite:
                  <span className="block mb-1 mt-px text-xs italic">
                     (horas : minutos : segundos)
                  </span>
               </label>
               <input
                  required
                  value={
                     datosFormulario.editar ? datosFormulario.tiempo : undefined
                  }
                  onChange={(e) => {
                     datosFormulario.editar
                        ? recibirTareaActualizada({
                             ...datosFormulario,
                             tiempo: e.target.value,
                          })
                        : undefined;
                  }}
                  className="calendar-white bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  type="time"
                  step={2}
                  name="tiempo"
                  id="tiempo"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="descripcion">Descripción: </label>
               <input
                  required
                  value={
                     datosFormulario.editar
                        ? datosFormulario.descripcion
                        : undefined
                  }
                  onChange={(e) => {
                     datosFormulario.editar
                        ? recibirTareaActualizada({
                             ...datosFormulario,
                             descripcion: e.target.value,
                          })
                        : undefined;
                  }}
                  className="bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  type="text"
                  name="descripcion"
                  id="descripcion"
               />
            </div>

            {datosFormulario.editar ? (
               <div className="grid grid-rows-2 gap-2 mt-4">
                  <Button
                     onClick={async () => {
                        recibirTareaActualizada({
                           ...datosFormulario,
                           editar: false,
                        });
                        const response = await fetch("/api/taskRoutes", {
                           method: "PUT",
                           headers: {
                              "Content-Type": "application/json",
                           },
                           body: JSON.stringify({
                              nombre: datosFormulario.nombre,
                              fechaInicio: datosFormulario.fechaInicio.slice(
                                 0,
                                 10
                              ),
                              fechaTermino: datosFormulario.fechaTermino.slice(
                                 0,
                                 10
                              ),
                              descripcion: datosFormulario.descripcion,
                              tiempo: datosFormulario.tiempo,
                              id: datosFormulario.id,
                           }),
                        });
                     }}
                     className="px-4 py-3 w-full rounded-md justify-self-center bg-cyan-900"
                     value="Guardar"
                  />
                  <Button
                     onClick={async () => {
                        recibirIdParaEliminarTarea(datosFormulario.id);

                        const response = await fetch(
                           `/api/taskRoutes/${datosFormulario.id}`,
                           {
                              method: "DELETE",
                              headers: {
                                 "Content-Type": "application/json",
                              },
                           }
                        );
                        const result = await response.json();
                     }}
                     className="px-4 py-3 w-full rounded-md justify-self-center bg-gray-800"
                     value="Eliminar"
                  />
               </div>
            ) : (
               <input
                  className="cursor-pointer h-11 rounded bg-cyan-900 w-full mt-3"
                  type="submit"
                  value="Agregar Tarea"
               />
            )}
         </form>
      </div>
   );
}
