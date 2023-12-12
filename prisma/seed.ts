// import { PrismaClient } from '@prisma/client'
const Prisma = require('@prisma/client');
const { PrismaClient } = Prisma;

const courses = require("./data/courses");

const prisma = new PrismaClient();

// New Course (title, description)
// IIFE

courses.forEach((course: any) => {
    (async () => {
        const newCourse = await prisma.course.create({
            data: {
                title: course.name,
                description: course.name
            }
        });
    })()
})

