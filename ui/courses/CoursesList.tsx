import React from 'react';
import CourseCard from './CourseCard';
import { Course } from '@/types'

interface CoursesListProps {
    list: Course[]
}

export default function CoursesList({ list = [] }: CoursesListProps) {
    return <div className="grid grid-cols-3 gap-2 p-8">
        {/* <CourseCard course={{id: 1, title: 'Learn Javascript'}} />
        <CourseCard course={{id: 1, title: 'Learn Javascript'}} />
        <CourseCard course={{id: 1, title: 'Learn Javascript'}} /> */}

        { list.map(course => <CourseCard key={course.id} course={course} />) }
    </div>
}