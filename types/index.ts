export type AnnouncementProps = {
  // id: string;
  title: string;
  content: string;
};

export type AssignmentProps = {
  id: string;
  title: string;
  description: string;
  courseName: string;
  dueDate: any;
};

export type CourseProps = {
  id: string;
  name: string;
  description: string;
  attachment: string;
  syllabus: string;
  coursecode: string;
};
