import CoursesList from '@/ui/courses/CoursesList';
import { PrismaClient } from 'prisma/prisma-client'

async function getData() {
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({})
  return {
    coursesInfo: courses
  }
}


export default async function Home() {
  const data = await getData();

  return (
    <main className="p-6">
      <h2>Welcome NextJS</h2>
      <CoursesList list={data.coursesInfo} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
