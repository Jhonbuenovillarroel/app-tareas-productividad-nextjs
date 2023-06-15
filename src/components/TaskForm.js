import { HomeContext } from "@/contexts/context";
import { useContext } from "react";
import Image from "next/image";

export default function TaskForm({ datos }) {
   const { recibirNuevaTarea, cerrarAbrirFormulario } = useContext(HomeContext);

   async function agregarTarea(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const response = await fetch("/api/taskRoutes", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formJson),
      });
      const data = await response.json();
      recibirNuevaTarea(data);
      form.reset();
   }

   return (
      <div className="fixed max-w-[320px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
         <Image
            onClick={cerrarAbrirFormulario}
            className=" cursor-pointer absolute right-[-24px] top-[-20px]"
            src="/delete.png"
            width={16}
            height={16}
            alt="Botón cerrar formulario"
         />
         <form
            className=" shadow-[0_0_30px_4px_rgba(0,0,0,0.9)] flex flex-col gap-4 bg-zinc-950 py-12 px-8 rounded-lg"
            onSubmit={agregarTarea}
            action=""
         >
            <div className="flex flex-col gap-1">
               <label htmlFor="nombre">Nombre:</label>
               <input
                  className="bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  type="text"
                  name="nombre"
                  id="nombre"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="fechaInicio">Fecha de Inicio:</label>
               <input
                  className="calendar-white bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  type="date"
                  name="fechaInicio"
                  id="fechaInicio"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="fechaTermino">Fecha de Finalización: </label>
               <input
                  className="calendar-white bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  type="date"
                  name="fechaTermino"
                  id="fechaTermino"
               />
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="descripcion">Descripción: </label>
               <textarea
                  className="bg-zinc-800 rounded py-1 px-3 text-sm outline-none"
                  rows={3}
                  name="descripcion"
                  id="descripcion"
               ></textarea>
            </div>

            <input
               className="h-11 rounded bg-red-600 w-full mt-3"
               type="submit"
               value="Enviar"
            />
         </form>
      </div>
   );
}
