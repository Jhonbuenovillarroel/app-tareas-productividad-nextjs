import { useEffect, useState } from "react";

export default function CheckBox({ datos, className, value, title }) {
   const [background, setBackground] = useState("bg-zinc-700");

   useEffect(() => {
      if (datos.completado === 0) {
         setBackground("bg-zinc-700");
      } else {
         setBackground(
            "bg-cyan-400 bg-[url('/check.png')] bg-[center_bottom_8px] bg-no-repeat bg-[length:14px_14px]"
         );
      }
   }, [datos]);

   async function cambiarColorCheckBox() {
      let nextBackground;
      if (background === "bg-zinc-700") {
         nextBackground =
            "bg-cyan-400 bg-[url('/check.png')] bg-[center_bottom_8px] bg-no-repeat bg-[length:14px_14px]";
         setBackground(
            "bg-cyan-400 bg-[url('/check.png')] bg-[center_bottom_8px] bg-no-repeat bg-[length:14px_14px]"
         );

         const response = await fetch(`/api/taskRoutes/${datos.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ completado: 1 }),
         });
      } else {
         nextBackground = "bg-zinc-700";
         setBackground("bg-zinc-700");

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
