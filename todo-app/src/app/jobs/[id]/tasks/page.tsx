// View Tasks Page

// This line specifies the file path within the Next.js project.
// 'app/jobs/[id]/page.tsx' indicates it's a dynamic route page within the App Router.
'use client'; // This directive marks this component as a Client Component, allowing client-side features.

// Imports the 'Link' component from 'next/link' for efficient client-side navigation.
import Link from 'next/link';
// Imports 'useState' for managing component state and 'useEffect' for side effects from React.
import { useState, useEffect } from 'react';
// Imports 'useRouter' from 'next/navigation' for routing functionalities in Next.js App Router.
import { useRouter } from 'next/navigation';

// Defines a TypeScript interface named 'Task' to describe the structure of a task object.
interface Task {
  id: string; // Unique identifier for the task.
  title: string; // Title or name of the task.
  description: string; // Detailed description of the task.
  completed: boolean; // Boolean indicating if the task is completed.
  dueDate: string; // The due date of the task (as a string).
  notes: string; // Additional notes for the task.
}

// Defines a TypeScript interface named 'Job' to describe the structure of a job object.
interface Job {
  id: string; // Unique identifier for the job.
  jobName: string; // Name of the job.
  clientName: string; // Name of the client associated with the job.
  status: string; // Current status of the job.
  gateCode: string; // Gate code for the job site.
  notes: string; // General notes for the job.
  tasks: Task[]; // An array of task objects associated with this job.
}

// Defines a constant array 'initialJobs' containing sample job data with nested tasks.
// In a real application, this data would be fetched from a persistent backend API.
const initialJobs = [
  // First sample job object.
  {
    id: "1", // Job ID.
    jobName: "Lot 3", // Job name.
    clientName: "Cindy McKinny", // Client name.
    status: "In Progress", // Job status.
    gateCode: "4729", // Gate code.
    notes: "", // Notes.
    tasks: [ // Array of tasks for this job.
      {
        id: "1-1", // Task ID.
        title: "Excavation", // Task title.
        description: "Test pH, chlorine, and alkalinity levels", // Task description.
        completed: true, // Task completion status.
        dueDate: "2025-06-04", // Task due date.
        notes: "" // Task notes.
      },
      {
        id: "1-2",
        title: "Steel",
        description: "Jaime Steel",
        completed: false,
        dueDate: "2025-06-16",
        notes: ""
      },
      {
        id: "1-3",
        title: "Plumbing",
        description: "Abraham Plumbing",
        completed: false,
        dueDate: "2025-06-21",
        notes: ""
      }
    ]
  },
  // Second sample job object.
  {
    id: "2",
    jobName: "Sage Thrasher",
    clientName: "X",
    status: "Scheduled",
    gateCode: "",
    notes: "",
    tasks: [
      {
        id: "2-1",
        title: "Demo",
        description: "demo pre-existing pool",
        completed: false,
        dueDate: "2025-06-20",
        notes: "Check soil/ground conditions"
      },
      {
        id: "2-2",
        title: "Steel",
        description: "Haime Steel",
        completed: false,
        dueDate: "2025-07-01",
        notes: ""
      },
      {
        id: "2-3",
        title: "Plumbing",
        description: "Abraham Plumbing",
        completed: false,
        dueDate: "2025-07-22",
        notes: ""
      }
    ]
  }
];

// Defines the 'JobTasks' functional component, receiving 'params' for dynamic routing.
export default function JobTasks({ params }: { params: { id: string } }) {
  // Initializes the router object for navigation within the app.
  const router = useRouter();
  // Extract the job ID from the params
  const jobId = params.id;

  // Declares a state variable 'job' to hold the current job's data, initially null.
  const [job, setJob] = useState<Job | null>(null);
  // Declares a state variable 'loading' to indicate if data is being loaded, initially true.
  const [loading, setLoading] = useState(true);

  // 'useEffect' hook runs code after the component renders, often for data fetching or side effects.
  // This specific effect runs when 'jobId' or 'router' changes.
  useEffect(() => {
    // Checks if a 'jobId' is available from the URL.
    if (jobId) {
      // Finds the job object in the 'initialJobs' array that matches the 'jobId'.
      const foundJob = initialJobs.find((j) => j.id === jobId);
      // Checks if a job was found.
      if (foundJob) {
        // If found, updates the 'job' state with the found job data.
        setJob(foundJob);
      } else {
        // If no job is found, logs an error to the console.
        console.error("Job not found!");
        // Redirects the user to a 404 Not Found page.
        router.push('/404');
      }
      // Sets loading to false once the job data is processed.
      setLoading(false);
    }
  }, [jobId, router]); // Dependencies: Effect re-runs if 'jobId' or 'router' changes.

  // Defines a handler function for when a task's completion checkbox is changed.
  const handleTaskCompletionChange = (taskId: string) => {
    // Updates the 'job' state based on the previous state.
    setJob((prevJob) => {
      // If 'prevJob' is null (no job loaded), returns null, doing nothing.
      if (!prevJob) return null;

      // Creates a new array of tasks where the 'completed' status of the matching task is toggled.
      const updatedTasks = prevJob.tasks.map((task) =>
        task.id === taskId // Checks if this is the task whose checkbox was clicked.
          ? { ...task, completed: !task.completed } // If it is, creates a new task object with 'completed' status flipped.
          : task // Otherwise, returns the task unchanged.
      );

      // Returns a new job object with the 'tasks' array updated.
      return { ...prevJob, tasks: updatedTasks };
    });
  };

  // Displays a loading message if the 'loading' state is true.
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading tasks...</div>;
  }

  // Displays a "Job not found" message if the 'job' state is null after loading.
  if (!job) {
    return <div className="flex justify-center items-center min-h-screen">Job not found.</div>;
  }

  // Returns the JSX (UI elements) for the Job Tasks page.
  return (
    // Creates a flexible column container that centers content and takes full screen height.
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Container div for the "Return to Jobs List" link.*/}
      <div className="w-full max-w-2xl mb-8">
        {/* Creates a link to navigate back to the main jobs list page.*/}
        <Link href="/jobs" className="flex items-center text-blue-500 hover:text-blue-600">
          {/* SVG icon representing a left arrow for navigation.*/}
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* Defines the path data for the arrow icon.*/}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Jobs List
        </Link>
      </div>
      {/* Displays the main heading for the tasks page, showing the job's name.*/}
      <h1 className="text-3xl font-bold mb-8">{job.jobName} Tasks</h1> {/* Updated heading */}
      {/* Container div for the list of tasks.*/}
      <div className="w-full max-w-2xl">
        {/* Creates a white, rounded, and shadowed background for the task list.*/}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Container for spacing between task items.*/}
          <div className="space-y-4">
            {/* Conditional rendering: If there are no tasks, display a message. */}
            {job.tasks.length === 0 ? (
                // Message displayed when no tasks are found for the job.
                <p className="text-gray-500 text-center">No tasks for this job. Add a new task!</p>
            ) : (
                // Maps over each task in the job's tasks array to render individual task items.
                job.tasks.map((task) => (
                    // Container div for each individual task, with a bottom border and flex layout.
                    <div key={task.id} className="border-b py-4 flex items-start justify-between">
                      {/* Creates a flexible div for the task's main information, with right padding.*/}
                      <div className="flex-1 pr-4">
                        {/* Div to align checkbox and task title.*/}
                        <div className="flex items-center mb-2">
                          {/* Checkbox input element.
                          'type="checkbox"': Specifies it's a checkbox.
                          'checked={task.completed}': Binds the checkbox's state to the task's 'completed' property.
                          'onChange': Calls 'handleTaskCompletionChange' when the checkbox is clicked, passing the task's ID.
                          'className' applies Tailwind CSS for styling. */}
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskCompletionChange(task.id)}
                            className="mr-3 w-5 h-5 accent-blue-500"
                          />
                          {/* Heading for the task title.*/}
                          {/* Conditionally applies 'line-through' and 'text-gray-500' if the task is completed.*/}
                          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {/* Displays the task's title.*/}
                            {task.title}
                          </h3>
                        </div>
                        {/* Displays the task's description.*/}
                        <p className="text-gray-600 mb-2">{task.description}</p>
                        {/* Div for due date and notes, with smaller text and gray color.*/}
                        <div className="flex items-center text-sm text-gray-500">
                          {/* Displays the task's due date, formatted for local locale.*/}
                          <span className="mr-4">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          {/* Displays the task's notes.*/}
                          <span>Notes: {task.notes}</span>
                        </div>
                      </div>
                      {/* START: Added Edit Task button */}
                      {/*Creates a link to navigate to the edit page for the specific task.*/}
                      <Link
                        href={`/jobs/${job.id}/tasks/${task.id}/edit`} // Dynamic link constructed with job ID and task ID.
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors self-center flex-shrink-0"
                      >
                        Edit Task
                      </Link>
                      {/* END: Added Edit Task button */}
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
      <button className="fixed bottom-8 right-8 bg-green-500 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50">
        Add New Task
      </button>
    </div>
  );
}