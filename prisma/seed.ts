// import { PrismaClient } from '@prisma/client'
const Prisma = require('@prisma/client');
const { PrismaClient } = Prisma;

const courses = require("./data/courses");
const lessons = require("./data/lessons/machine-learning/data");

const prisma = new PrismaClient();

// New Course (title, description)
// IIFE

courses.forEach((course: any) => {
    (async () => {
        const newCourse = await prisma.course.upsert({
            where: {
                id: course.id
            },
            update: {
                title: course.name,
                description: course.name
            },
            create: {
                id: course.id,
                title: course.name,
                description: course.name
            }
        });
    })()
});

lessons.forEach((lesson: any, idx: any) => {
    (async () => {
        await prisma.lesson.upsert({
            where: {
                id: idx+1
            },
            create: {
                id: idx+1,
                name: lesson,
                courseId: 4
            },
            update: {

            }
        })
    })()
})

