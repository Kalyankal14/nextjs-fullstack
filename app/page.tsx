import SearchBar from '@/ui/components/SearchBar';
import CoursesList from '@/ui/courses/CoursesList';
import ExternalCourses from '@/ui/courses/ExternalCourses';
import { PrismaClient } from 'prisma/prisma-client'

async function getData() {
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({})
  return {
    coursesInfo: courses
  }
}

const searchValue = async (text?: any) => {
  'use server'
  console.log("TEXT-----", text)
  let value = text ? text : ''
  return value
}


const getExternalCourse = async () => {
  'use server'
  const externalApi = await fetch('http://cms.fullstack.institute/rest/courses');
  const response = await externalApi.json();
  return response;
}


export default async function Home() {
  const data = await getData();

  return (
    <main className="p-6">
      <h2>Welcome NextJS</h2>
      <SearchBar search={async (payload: string) => {
        'use server'
        const prisma = new PrismaClient();
        return await prisma.course.findMany({
          where: {
            title: {
              contains: payload || ""
            }
          }
        });
      }} />
      <ExternalCourses getData={getExternalCourse} />
      <CoursesList list={data.coursesInfo} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
