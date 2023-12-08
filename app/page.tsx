import SearchBar from '@/ui/components/SearchBar';
import CoursesList from '@/ui/courses/CoursesList';
import { PrismaClient } from 'prisma/prisma-client'

async function getData() {
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({})
  return {
    coursesInfo: courses
  }
}

const searchValue = async (text?: any)=>{
  'use server'
  console.log("TEXT-----", text)
  let value = text ? text : '' 
  return value
 }


export default async function Home() {
  const data = await getData();

  return (
    <main className="p-6">
      <h2>Welcome NextJS</h2>
      <SearchBar searchCallback={searchValue} />
      <CoursesList list={data.coursesInfo} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
