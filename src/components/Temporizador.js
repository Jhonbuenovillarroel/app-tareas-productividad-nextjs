import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { HomeContext } from "@/contexts/context";

export default function Temporizador() {
   const [segundos, setSegundos] = useState("00");
   const [minutos, setMinutos] = useState("00");
   const [horas, setHoras] = useState("00");
   const [temporizador, setTemporizador] = useState(null);
   const { temporizadorIniciado, cerrarAbrirTemporizador } =
      useContext(HomeContext);

   function iniciarTemporizador() {
      if (!temporizadorIniciado) {
         setTemporizador(
            setInterval(() => {
               setSegundos((prevSecond) => {
                  if (parseInt(prevSecond) === 59) {
                     setMinutos((prevMinute) => {
                        if (parseInt(prevMinute) === 59) {
                           setHoras((prevHour) => {
                              if (parseInt(prevHour) === 59) {
                                 return `00`;
                              }
                              if (parseInt(prevHour) < 9) {
                                 return `0${parseInt(prevHour) + 1}`;
                              } else {
                                 return `${parseInt(prevHour) + 1}`;
                              }
                           });
                           return `00`;
                        }
                        if (parseInt(prevMinute) < 9) {
                           return `0${parseInt(prevMinute) + 1}`;
                        } else {
                           return `${parseInt(prevMinute) + 1}`;
                        }
                     });
                     return `00`;
                  }
                  if (parseInt(prevSecond) < 9) {
                     return `0${parseInt(prevSecond) + 1}`;
                  } else {
                     return `${parseInt(prevSecond) + 1}`;
                  }
               });
            }, 1000)
         );
      }
      cerrarAbrirTemporizador(true);
   }

   function detenerTemporizador() {
      clearInterval(temporizador);
   }

   return (
      <div>
         <div className="before:content-[''] before:fixed before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-10"></div>
         <div className="fixed z-20 max-w-[320px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] p-12 rounded-lg bg-gray-900 shadow-[0_0_100px_-4px_rgba(27,53,108,0.5)] flex flex-wrap gap-1 items-center justify-between">
            <Image
               onClick={() => {
                  cerrarAbrirTemporizador(false);
               }}
               className=" cursor-pointer absolute right-[-24px] top-[-20px]"
               src="/delete.png"
               width={36}
               height={36}
               alt="Botón cerrar formulario"
            />
            <p className="text-[52px] font-bold">{`${horas}:${minutos}:${segundos}`}</p>
            <div className="mt-4 w-full flex flex-col justify-center items-center">
               <Button
                  onClick={iniciarTemporizador}
                  className="px-4 py-3 w-40 rounded-md justify-self-center bg-cyan-900"
                  value="Iniciar"
               />
               <Button
                  onClick={detenerTemporizador}
                  className="mt-4 px-4 py-3 w-40 rounded-md justify-self-center bg-gray-800"
                  value="Detener"
               />
            </div>
         </div>
      </div>
   );
}
