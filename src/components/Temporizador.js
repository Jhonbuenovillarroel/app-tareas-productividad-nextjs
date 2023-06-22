import Button from "@/components/Button";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HomeContext } from "@/contexts/context";

export default function Temporizador() {
   const { recibirTareaActualizada, datosFormulario, cerrarAbrirTemporizador } =
      useContext(HomeContext);
   const [horas, setHoras] = useState(datosFormulario.tiempo.slice(0, 2));
   const [minutos, setMinutos] = useState(datosFormulario.tiempo.slice(3, 5));
   const [segundos, setSegundos] = useState(datosFormulario.tiempo.slice(6, 8));
   const [temporizadorIniciado, setTemporizadorIniciado] = useState(false);
   const [worker, setWorker] = useState(
      new Worker(new URL("../webWorkers/worker.js", import.meta.url))
   );
   const [deshabilitado, setDeshabilitado] = useState("");
   const [contador, setContador] = useState(0);
   const [mostrarBoton, setMostrarBoton] = useState(false);

   const parrafo = useRef(null);

   function iniciarTemporizador() {
      worker.postMessage([horas, minutos, segundos, temporizadorIniciado]);

      worker.onmessage = (e) => {
         if (e.data[3] === true) {
            setHoras(e.data[0]);
            setMinutos(e.data[1]);
            setSegundos(e.data[2]);
         }
         parrafo.current.textContent = `${e.data[0]}:${e.data[1]}:${e.data[2]}`;
         document.title = `${e.data[0]}:${e.data[1]}:${e.data[2]} - App Tareas`;
      };

      setTemporizadorIniciado(true);

      cerrarAbrirTemporizador(true);
   }

   function audioTerminado() {
      if (contador < 3) {
         audioRef.current.play();
         setContador((prev) => prev + 1);
      } else {
         setContador(0);
      }
   }

   const audioRef = useRef(null);

   function deshabilitarBoton() {
      setDeshabilitado("disabled");
   }

   async function marcarTareaComoCompletada() {
      recibirTareaActualizada({
         ...datosFormulario,
         completado: 1,
      });

      const response = await fetch(`/api/taskRoutes/${datosFormulario.id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ completado: 1 }),
      });
   }

   useEffect(() => {
      if (horas === "00" && minutos === "00" && segundos === "00") {
         worker.terminate();
         setWorker(
            new Worker(new URL("../webWorkers/worker.js", import.meta.url))
         );
         audioTerminado();
         deshabilitarBoton();
         if (datosFormulario.completado !== 1) {
            marcarTareaComoCompletada();
         }
      }
   }, [horas, minutos, segundos]);

   useEffect(() => {
      document.title = `${parrafo.current.textContent} - App Tareas`;
   });

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
                  audioRef.current.pause();

                  worker.terminate();
                  setWorker(
                     new Worker(
                        new URL("../webWorkers/worker.js", import.meta.url)
                     )
                  );
                  document.title = "App Tareas";
               }}
               className=" cursor-pointer absolute right-[-24px] top-[-20px]"
               src="/delete.png"
               width={36}
               height={36}
               alt="Botón cerrar formulario"
            />

            <p
               ref={parrafo}
               className="text-[52px] font-bold"
            >{`${horas}:${minutos}:${segundos}`}</p>
            <div className="mt-4 w-full flex flex-col justify-center items-center">
               {mostrarBoton ? (
                  temporizadorIniciado ? (
                     <Button
                        onClick={() => {
                           worker.terminate();

                           setWorker(
                              new Worker(
                                 new URL(
                                    "../webWorkers/worker.js",
                                    import.meta.url
                                 )
                              )
                           );
                           setTemporizadorIniciado(false);
                           setHoras(parrafo.current.textContent.slice(0, 2));
                           setMinutos(parrafo.current.textContent.slice(3, 5));
                           setSegundos(parrafo.current.textContent.slice(6, 8));
                        }}
                        className="px-4 py-3 w-40 rounded-md justify-self-center bg-gray-800"
                        value="Detener"
                     />
                  ) : (
                     <Button
                        onClick={() => {
                           iniciarTemporizador();
                        }}
                        className="px-4 py-3 w-40 rounded-md justify-self-center bg-gray-800"
                        value="Reanudar"
                     />
                  )
               ) : (
                  <Button
                     onClick={() => {
                        iniciarTemporizador();
                        setMostrarBoton(true);
                     }}
                     className="px-4 py-3 w-40 rounded-md justify-self-center bg-cyan-900"
                     value="Iniciar"
                  />
               )}

               <Button
                  onClick={() => {
                     parrafo.current.textContent = `${horas}:${minutos}:${segundos}`;
                     worker.terminate();
                     setWorker(
                        new Worker(
                           new URL("../webWorkers/worker.js", import.meta.url)
                        )
                     );
                     setTemporizadorIniciado(false);

                     setHoras(datosFormulario.tiempo.slice(0, 2));
                     setMinutos(datosFormulario.tiempo.slice(3, 5));
                     setSegundos(datosFormulario.tiempo.slice(6, 8));

                     setMostrarBoton(false);
                  }}
                  className="mt-4 px-4 py-3 w-40 rounded-md justify-self-center bg-cyan-900"
                  value="Reiniciar"
               />
            </div>
         </div>
      </div>
   );
}
