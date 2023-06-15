import { NextResponse } from "next/server";
import mysql from "mysql2";
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
            console.log("Tarea eliminada correctamente");
         }
      );
   });

   return NextResponse.json({ id });
}
