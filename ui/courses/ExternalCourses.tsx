'use client'
import React, { useState, useEffect, useMemo } from 'react'
import CoursesList from './CoursesList';

function ExternalCourses({ getData }: any) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getData()
      .then((courseList: any) => setCourses(courseList));
  }, []);

  const listOfCourse = useMemo(() => {
    return courses.map((course: any) => {
      return {
        ...course,
        title: course.title
      }
    })
  }, [courses])

  return (
    <div>
      <h2>External Courses</h2>
      <CoursesList list={listOfCourse} />
    </div>
  )
}

export default ExternalCourses