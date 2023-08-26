import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function GET(request) {
   try {
      const tareas = await prisma.task.findMany();

      return NextResponse.json(tareas);
   } catch (error) {
      return NextResponse.error({ error });
   }
}

export async function POST(request) {
   const body = await request.json();

   const newTask = await prisma.task.create({
      data: {
         nombre: body.nombre,
         fechaInicio: body.fechaInicio,
         fechaTermino: body.fechaTermino,
         tiempo: body.tiempo,
         descripcion: body.descripcion,
      },
   });

   return NextResponse.json(newTask);
}

export async function PUT(request) {
   const bodyRequest = await request.json();
   const data = Object.values(bodyRequest);

   const tarea = await prisma.task.update({
      where: {
         id: data[5],
      },
      data: {
         nombre: data[0],
         fechaInicio: data[1],
         fechaTermino: data[2],
         descripcion: data[3],
         tiempo: data[4],
      },
   });

   return NextResponse.json(tarea);
}
