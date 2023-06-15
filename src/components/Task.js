import Button from "@/components/Button";
import { HomeContext } from "@/contexts/context";
import { useCallback, useContext, useState } from "react";
import Image from "next/image";

export default function Task({ datos }) {
   const {
      cerrarAbrirFormulario,
      recibirTareaActualizada,
      recibirIdParaEliminarTarea,
   } = useContext(HomeContext);
   const [editar, setEditar] = useState(false);

   let taskContent;
   let botonEditarGuardar;

   if (editar) {
      botonEditarGuardar = (
         <>
            <Button
               onClick={async () => {
                  setEditar(false);
                  const response = await fetch("/api/taskRoutes", {
                     method: "PUT",
                     headers: {
                        "Content-Type": "application/json",
                     },
                     body: JSON.stringify({
                        nombre: datos.nombre,
                        fechaInicio: datos.fechaInicio.slice(0, 10),
                        fechaTermino: datos.fechaTermino.slice(0, 10),
                        descripcion: datos.descripcion,
                        id: datos.id,
                     }),
                  });
               }}
               className="px-4 py-3 w-full rounded-md justify-self-center bg-red-600"
               value="Guardar"
            />
         </>
      );
      taskContent = (
         <div className="fixed max-w-[320px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4 shadow-[0_0_30px_4px_rgba(0,0,0,0.9)] bg-zinc-950 pt-8 pb-10 px-8 rounded-lg">
            <div className="flex flex-col gap-4">
               <label className="flex flex-col">
                  <strong>Nombre:</strong>
                  <input
                     value={datos.nombre}
                     onChange={(e) => {
                        recibirTareaActualizada({
                           ...datos,
                           nombre: e.target.value,
                        });
                     }}
                     className="text-sm bg-zinc-800 outline-none px-3 py-1 rounded"
                     type="text"
                  />
               </label>

               <label className="flex flex-col">
                  <strong>Fecha de Inicio:</strong>
                  <input
                     value={datos.fechaInicio.slice(0, 10)}
                     onChange={(e) => {
                        recibirTareaActualizada({
                           ...datos,
                           fechaInicio: e.target.value,
                        });
                     }}
                     className="text-sm calendar-white bg-zinc-800 outline-none px-3 py-1 rounded"
                     type="date"
                  />
               </label>
               <label className="flex flex-col">
                  <strong>Fecha de Finalización:</strong>
                  <input
                     value={datos.fechaTermino.slice(0, 10)}
                     onChange={(e) => {
                        recibirTareaActualizada({
                           ...datos,
                           fechaTermino: e.target.value,
                        });
                     }}
                     className="text-sm calendar-white bg-zinc-800 outline-none px-3 py-1 rounded"
                     type="date"
                  />
               </label>
               <label className="flex flex-col">
                  <strong>Descripción:</strong>
                  <input
                     value={datos.descripcion}
                     onChange={(e) => {
                        recibirTareaActualizada({
                           ...datos,
                           descripcion: e.target.value,
                        });
                     }}
                     className="text-sm bg-zinc-800 outline-none px-3 py-1 rounded"
                     type="text"
                  />
               </label>
            </div>
            <div className=" mt-4 grid grid-cols-1 grid-rows-2 gap-4">
               {botonEditarGuardar}
               <Button
                  onClick={async () => {
                     recibirIdParaEliminarTarea(datos.id);

                     const response = await fetch(
                        `/api/taskRoutes/${datos.id}`,
                        {
                           method: "DELETE",
                           headers: {
                              "Content-Type": "application/json",
                           },
                        }
                     );
                     const result = await response.json();
                     console.log(result);
                  }}
                  className="px-4 py-3 w-full rounded-md justify-self-center bg-zinc-800"
                  value="Eliminar"
               />
            </div>
         </div>
      );
   } else {
      botonEditarGuardar = (
         <>
            <Button
               onClick={() => {
                  setEditar(true);
               }}
               className="px-4 py-3 w-40 rounded-md justify-self-center bg-red-600"
               value="Editar"
            />
         </>
      );
   }
   return (
      <div className=" p-6 rounded-lg bg-neutral-900">
         <div className="flex flex-wrap gap-1 items-center justify-between">
            <p className=" overflow-hidden w-80">{datos.nombre}</p>
            {editar && taskContent}
            <div className="grid grid-cols-2 gap-2">
               {botonEditarGuardar}
               <Button
                  onClick={async () => {
                     recibirIdParaEliminarTarea(datos.id);

                     const response = await fetch(
                        `/api/taskRoutes/${datos.id}`,
                        {
                           method: "DELETE",
                           headers: {
                              "Content-Type": "application/json",
                           },
                        }
                     );
                     const result = await response.json();
                     console.log(result);
                  }}
                  className="px-4 py-3 w-40 rounded-md justify-self-center bg-zinc-800"
                  value="Eliminar"
               />
            </div>
         </div>
      </div>
   );
}
