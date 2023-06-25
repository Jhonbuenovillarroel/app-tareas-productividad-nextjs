import { HomeContext } from "@/contexts/context";
import { useContext, useEffect, useState } from "react";

export default function CheckBox({ datos, className, value, title }) {
   const [background, setBackground] = useState("bg-zinc-500");
   const { recibirTareaActualizada } = useContext(HomeContext);

   useEffect(() => {
      if (datos.completado === 0) {
         setBackground("bg-zinc-500");
      } else {
         setBackground(
            "bg-cyan-400 bg-[url('/check.png')] bg-[center_bottom_8px] bg-no-repeat bg-[length:14px_14px]"
         );
      }
   }, [datos]);

   async function cambiarColorCheckBox() {
      let nextBackground;
      if (background === "bg-zinc-500") {
         nextBackground =
            "bg-cyan-400 bg-[url('/check.png')] bg-[center_bottom_8px] bg-no-repeat bg-[length:14px_14px]";
         setBackground(
            "bg-cyan-400 bg-[url('/check.png')] bg-[center_bottom_8px] bg-no-repeat bg-[length:14px_14px]"
         );
         recibirTareaActualizada({
            ...datos,
            completado: 1,
         });

         const response = await fetch(`/api/taskRoutes/${datos.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ completado: 1 }),
         });
      } else {
         nextBackground = "bg-zinc-500";
         setBackground("bg-zinc-500");
         recibirTareaActualizada({
            ...datos,
            completado: 0,
         });

         const response = await fetch(`/api/taskRoutes/${datos.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ completado: 0 }),
         });
      }
   }
   return (
      <button
         onClick={() => {
            cambiarColorCheckBox();
         }}
         title={title}
         className={`${className} ${background}`}
      >
         {value}
      </button>
   );
}
