import { NextResponse } from "next/server";
import connection from "../../../../utils/db";

export async function GET(request) {
   try {
      const result = await new Promise((resolve, reject) => {
         connection.execute(
            "select * from tareas",
            (error, results, fields) => {
               if (error) {
                  reject(error);
               }
               resolve(results);
               console.log(`Tareas obtenidas correctamente`);
            }
         );
      });

      return NextResponse.json(result);
   } catch (error) {
      return NextResponse.error({ error });
   }
}

export async function POST(request) {
   const body = await request.json();
   const response = await new Promise((resolve, reject) => {
      connection.execute(
         "insert into tareas (nombre, fechaInicio, fechaTermino, descripcion) values (?, ?, ?, ?)",
         Object.values(body),
         (error, results, fields) => {
            if (error) {
               reject(error);
            }
            resolve(results.insertId);
            console.log(`Tarea agregada correctamente`);
         }
      );
   });
   return NextResponse.json({ ...body, id: response });
}

export async function PUT(request) {
   const bodyRequest = await request.json();
   const data = Object.values(bodyRequest);
   const response = await new Promise((resolve, reject) => {
      connection.execute(
         "update tareas set nombre = ?, fechaInicio = ?, fechaTermino = ?, descripcion = ? where id = ?",
         data,
         (error, result, fields) => {
            if (error) {
               reject(error);
            }
            resolve(result);
            console.log("Tarea actualizada conrrectamente");
         }
      );
   });

   return NextResponse.json(response);
}
