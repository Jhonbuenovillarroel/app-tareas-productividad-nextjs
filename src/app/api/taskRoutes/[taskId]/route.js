import { NextResponse } from "next/server";
import connection from "../../../../../utils/db";

export async function DELETE(request, context) {
   const id = context.params.taskId;

   const response = await new Promise((resolve, reject) => {
      connection.execute(
         "delete from tareas where id = ?",
         [id],
         (error, results, fields) => {
            if (error) {
               reject(error);
            }
            resolve(results);
         }
      );
   });

   return NextResponse.json({ id });
}

export async function PUT(request, context) {
   const id = context.params.taskId;
   const body = await request.json();
   const data = Object.values(body);

   const response = await new Promise((resolve, reject) => {
      connection.execute(
         "update tareas set completado = ? where id = ?",
         [...data, id],
         (error, results, fields) => {
            if (error) {
               reject(error);
            }
            resolve(results);
         }
      );
   });

   return NextResponse.json(id);
}
