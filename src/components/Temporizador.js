import Button from "@/components/Button";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HomeContext } from "@/contexts/context";

export default function Temporizador() {
   const { datosFormulario, cerrarAbrirTemporizador } = useContext(HomeContext);
   const [segundos, setSegundos] = useState(datosFormulario.tiempo.slice(6, 8));
   const [minutos, setMinutos] = useState(datosFormulario.tiempo.slice(3, 5));
   const [horas, setHoras] = useState(datosFormulario.tiempo.slice(0, 2));
   const [temporizador, setTemporizador] = useState(null);
   const [temporizadorIniciado, setTemporizadorIniciado] = useState(false);

   function iniciarTemporizador() {
      if (!temporizadorIniciado) {
         setTemporizador(
            setInterval(() => {
               setSegundos((prevSecond) => {
                  if (parseInt(prevSecond) === 0) {
                     setMinutos((prevMinute) => {
                        if (parseInt(prevMinute) === 0) {
                           setHoras((prevHour) => {
                              if (parseInt(prevHour) === 0) {
                                 return `00`;
                              }
                              if (parseInt(prevHour) < 11) {
                                 return `0${parseInt(prevHour) - 1}`;
                              } else {
                                 return `${parseInt(prevHour) - 1}`;
                              }
                           });
                           if (parseInt(horas) > 0) {
                              return `59`;
                           }
                           return `00`;
                        }
                        if (parseInt(prevMinute) < 11) {
                           return `0${parseInt(prevMinute) - 1}`;
                        } else {
                           return `${parseInt(prevMinute) - 1}`;
                        }
                     });
                     return `59`;
                  }
                  if (parseInt(prevSecond) < 11) {
                     return `0${parseInt(prevSecond) - 1}`;
                  } else {
                     return `${parseInt(prevSecond) - 1}`;
                  }
               });
            }, 1000)
         );
         setTemporizadorIniciado(true);
      }
      cerrarAbrirTemporizador(true);
   }

   const reproducirAudio = () => {
      audioRef.current.play();
   };
   const [isPlaying, setPlaying] = useState(false);
   const [deshabilitado, setDeshabilitado] = useState("");

   let contador = 0;
   function audioTerminado() {
      if (contador < 3) {
         audioRef.current.play();
      }
      contador++;
   }

   const audioRef = useRef(null);

   function deshabilitarBoton() {
      setDeshabilitado("disabled");
   }

   useEffect(() => {
      if (
         parseInt(horas) === 0 &&
         parseInt(minutos) === 0 &&
         parseInt(segundos) === 0
      ) {
         detenerTemporizador();
         // reproducirAudio();
         audioTerminado();
         deshabilitarBoton();
      }
   });

   function detenerTemporizador() {
      clearInterval(temporizador);
      setTemporizadorIniciado(false);
   }

   return (
      <div className="box-border">
         <audio
            className="absolute"
            ref={audioRef}
            src="/output.mp3"
            onEnded={audioTerminado}
         ></audio>

         <div className="before:content-[''] before:fixed before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-10"></div>
         <div className="fixed z-20 max-w-[320px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] p-12 rounded-lg bg-gray-900 shadow-[0_0_100px_-4px_rgba(27,53,108,0.5)] flex flex-wrap gap-1 items-center justify-between">
            <Image
               onClick={() => {
                  cerrarAbrirTemporizador(false);
                  detenerTemporizador();
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
                  disabled={deshabilitado}
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
