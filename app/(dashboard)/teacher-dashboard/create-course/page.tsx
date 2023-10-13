import React from 'react'
import CreateCourseForm from '../_components/CreateCourse'

const CreateCourse = () => {
  return (
      <div>
          <h1 className='font-bold text-3xl pb-1 border-b'>Create Course</h1>
          <div className='my-8'>
              <CreateCourseForm />
          </div>
    </div>
  )
}

export default CreateCourse