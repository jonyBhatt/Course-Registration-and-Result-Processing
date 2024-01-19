import MySingleCourse from "../_components/my-course";

const SingleStudentCourse = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <MySingleCourse id={id} />
    </div>
  );
};
export default SingleStudentCourse;
