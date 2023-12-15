import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

export async function GET(request: NextRequest) {
    const urlPaths = request.url.split('/');
    const id = urlPaths[urlPaths.length - 1];
    const prisma = new PrismaClient();
    const course = await prisma.course.findFirst({
      where: {
        id: +id
      },
      select: {
        id: true,
        title: true,
        lessons: true
      }
    })
    return NextResponse.json({
        status: 'ok',
        data: course
    })
}


export async function POST() {
    return NextResponse.json({
        status: 'ok',
        data: 'it is post call'
    })
}