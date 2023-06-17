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
         "insert into tareas (nombre, fechaInicio, fechaTermino, tiempo, descripcion) values (?, ?, ?, ?, ?)",
         Object.values(body),
         (error, results, fields) => {
            if (error) {
               reject(error);
            }
            resolve(results.insertId);
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
         }
      );
   });

   return NextResponse.json(response);
}
