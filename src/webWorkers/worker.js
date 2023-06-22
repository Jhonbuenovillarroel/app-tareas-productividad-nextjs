let temporizadorIniciado = false;

let horas = 0;
let minutos = 0;
let segundos = 0;
let temporizador;
onmessage = (e) => {
   horas = e.data[0];
   minutos = e.data[1];
   segundos = e.data[2];
   temporizadorIniciado = e.data[3];

   if (!temporizadorIniciado) {
      temporizador = setInterval(() => {
         if (segundos > 0) {
            if (segundos < 11) {
               segundos = `0${segundos - 1}`;
            } else {
               segundos = `${segundos - 1}`;
            }
         } else {
            if (minutos > 0) {
               if (minutos < 11) {
                  minutos = `0${minutos - 1}`;
               } else {
                  minutos = `${minutos - 1}`;
               }

               segundos = `59`;
            } else {
               if (horas > 0) {
                  if (horas < 11) {
                     horas = `0${horas - 1}`;
                  } else {
                     horas = `${horas - 1}`;
                  }
                  minutos = `59`;
                  segundos = `59`;
               } else {
                  horas = `00`;
               }
            }
         }

         if (horas == 0 && minutos == 0 && segundos == 0) {
            postMessage([horas, minutos, segundos, true]);
            clearInterval(temporizador);
         }
         postMessage([horas, minutos, segundos, temporizadorIniciado]);
      }, 1000);
   }
};
