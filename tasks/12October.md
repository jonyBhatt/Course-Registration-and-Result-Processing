# Task 1

## Show Courses in Teacher Page

### 1. Create Teacher Page Template:
- Create a new file called `teacher-page.md`.
- Set up the basic structure for the teacher page.

### 2. API Integration for Courses:
- Add a code snippet in the teacher page template to call the API endpoint `/courses` using the teacher's ID.
- Use a programming language library (e.g., Python `requests` library) to make a GET request to `/courses/:id`.
- Display course details such as title, description, and any other relevant information.

### 3. Learn How to Call API with ID:
- Include the ID in the API request like `/courses/:id`.
- Make a GET request to `/courses/123` to retrieve the course with ID `123`.
- Utilize programming language libraries like `requests` in Python to handle API requests.

### 4. Create Single Course Page with ID:

#### a. Create Single Course Page Template:
- Create a new file called `single-course-page.md`.
- Set up the basic structure for the single course page.

#### b. API Integration for Single Course:
- Add a code snippet in the single course page template to call the API endpoint `/courses/:id` with the specific course ID.
- Retrieve and store the course details from the API response.
- Display course information such as title, description, and any other relevant details on the page.

### 5. Update Single Course Functionality:

#### a. Add Update Form:
- Integrate a form in the single course page to allow teachers to update course details.
- Include fields for modifying course information.

#### b. Handle Form Submission:
- On form submission, send a PUT request to the API endpoint `/courses/:id` with the updated course details.
- Ensure the API updates the course information accordingly.

### 6. Create and Update Notice Page and Backend Functionality:

#### a. Create Notice Page Template:
- Create a new file called `notice-page.md`.
- Set up the basic structure for the notice page.

#### b. API Integration for Notices:
- Add a code snippet in the notice page template to call the API endpoint `/notices`.
- Retrieve and store the list of notices from the API response.
- Iterate over the list of notices and display them on the notice page.
- Include notice title, content, date, etc.

#### c. Add Notice Form:
- Integrate a form on the notice page for creating and updating notices.
- Include fields like title, content, and date.

#### d. Handle Form Submission:
- When the teacher submits the form, send a POST or PUT request to the API endpoint `/notices` to create or update the notice accordingly.

# Task 2

## Create Student Dashboard

### 1. Create Student Dashboard Template:
- Create a new file called `student-dashboard.md`.
- Set up the basic structure for the student dashboard.

### 2. API Integration for Student Courses:
- Add a code snippet in the student dashboard template to call the API endpoint `/courses` for the student.
- Retrieve the list of courses related to the student from the API response.

### 3. Display Courses on Dashboard:
- Iterate over the list of student courses.
- Display course title, description, and progress information for each course.

## Comment Section in Course Page

### 1. Add Comment Section:
- Integrate a comment section in the single course page template.
- Include input fields for students to post comments.

### 2. API Integration for Comments:
- Call the API endpoint `/courses/:id/comments` to retrieve comments related to the specific course.
- Display comments from students and teachers in the comment section.

### 3. Allow Comment Posting:
- Allow students to post comments via the form.
- Send a POST request to the API endpoint `/courses/:id/comments` to post new comments.
- Refresh the comment section to display the new comment instantly.
