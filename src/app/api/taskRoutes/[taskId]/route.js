import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function DELETE(request, response) {
   const id = response.params.taskId;
   console.log(response);

   const tarea = await prisma.task.delete({
      where: {
         id: parseInt(id),
      },
   });

   return NextResponse.json({ id });
}

export async function PUT(request, context) {
   const id = context.params.taskId;
   const body = await request.json();
   const data = Object.values(body);

   const tarea = await prisma.task.update({
      where: {
         id: parseInt(id),
      },
      data: {
         completado: data[0],
      },
   });

   return NextResponse.json(id);
}
