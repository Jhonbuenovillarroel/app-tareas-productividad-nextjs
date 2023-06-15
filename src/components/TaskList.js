import Task from "@/components/Task";
import Button from "@/components/Button";
import { Home, HomeContext } from "@/contexts/context";
import { useContext, useState } from "react";

export default function TaskList() {
   const { tareas } = useContext(HomeContext);
   return (
      <section className="w-[800px] grid grid-cols-1 gap-8 max-w-7xl mx-auto mt-16 mb-16">
         {tareas.map((tarea) => (
            <div key={tarea.id}>
               <Task datos={tarea} />
            </div>
         ))}
      </section>
   );
}
