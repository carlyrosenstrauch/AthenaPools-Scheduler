// Edit Tasks Page

'use client'; // This directive marks this component as a Client Component,
              // meaning it runs on the client-side and can use hooks like useState and useEffect.

import { useRouter, usePathname } from 'next/navigation'; // Import Next.js navigation hooks
import { useState, useEffect } from 'react'; // Import React hooks for state and side effects
import Link from 'next/link'; // Import Link component for client-side navigation

// Defines the Task interface, outlining the structure of a task object.
// This interface should match the task structure used throughout your application.
interface Task {
  id: string; // Unique identifier for the task
  title: string; // Title of the task
  description: string; // Detailed description of the task
  completed: boolean; // Boolean indicating if the task is completed
  dueDate: string; // Due date of the task (e.g., "YYYY-MM-DD")
  notes: string; // Additional notes for the task
}

// Defines the Job interface, crucial for finding the parent job that contains the task.
// This helps in linking tasks back to their respective jobs.
interface Job {
  id: string; // Unique identifier for the job
  jobName: string; // Name of the job
  clientName: string; // Name of the client associated with the job
  status: string; // Current status of the job
  gateCode: string; // Gate code for the job location
  notes: string; // General notes for the job
  tasks: Task[]; // Array of task objects associated with this job
}

// Defines a constant array 'initialJobs' containing sample job data with nested tasks.
// In a real application, this data would typically come from an API or a database.
// This data should match the initialJobs data in your tasks page to ensure consistency
// when navigating between job and task views.
const initialJobs: Job[] = [
  {
    id: "1",
    jobName: "Lot 3",
    clientName: "Cindy McKinny",
    status: "In Progress",
    gateCode: "4729",
    notes: "",
    tasks: [
      {
        id: "1-1",
        title: "Excavation",
        description: "Test pH, chlorine, and alkalinity levels",
        completed: true,
        dueDate: "2025-06-04",
        notes: ""
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

// Defines the 'EditTask' functional component, responsible for rendering the task editing form.
export default function EditTask() {
  const router = useRouter(); // Hook to programmatically navigate between routes
  const pathname = usePathname(); // Hook to get the current URL pathname

  // Extract both job ID and task ID from the URL pathname.
  // Assuming the URL structure is '/jobs/[jobId]/tasks/[taskId]/edit'.
  // Example: /jobs/1/tasks/1-1/edit
  const pathSegments = pathname.split('/'); // Splits the pathname into an array of segments
  const jobId = pathSegments[2]; // Extracts the job ID (e.g., '1' from '/jobs/1/tasks/1-1/edit')
  const taskId = pathSegments[4]; // Extracts the task ID (e.g., '1-1' from '/jobs/1/tasks/1-1/edit')

  // State to hold the current task being edited. Initialized to null.
  const [task, setTask] = useState<Task | null>(null);
  // State to hold the parent job information (needed for navigation back to job tasks). Initialized to null.
  const [parentJob, setParentJob] = useState<Job | null>(null);
  // State to manage the loading status of the component. Initialized to true.
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch task and job data when the component mounts or when jobId/taskId change.
  useEffect(() => {
    if (jobId && taskId) {
      // Find the job first from the initialJobs array based on the extracted jobId.
      const foundJob = initialJobs.find((j) => j.id === jobId);

      if (foundJob) {
        setParentJob(foundJob); // Store the found parent job in state.
        // Then, find the specific task within the found job's tasks array.
        const foundTask = foundJob.tasks.find((t) => t.id === taskId);
        if (foundTask) {
          setTask(foundTask); // Store the found task in state.
        } else {
          // Log an error and redirect to a 404 page if the task is not found.
          console.error("Task not found!");
          router.push('/404');
        }
      } else {
        // Log an error and redirect to a 404 page if the job is not found.
        console.error("Job not found!");
        router.push('/404');
      }
      setLoading(false); // Set loading to false once data fetching (or not found) is complete.
    } else {
      setLoading(false); // If no jobId or taskId, also set loading to false.
    }
  }, [jobId, taskId, router, pathname]); // Dependencies for the useEffect hook. It re-runs if any of these change.

  // Handler for input changes in the task form.
  // It updates the 'task' state based on user input in the form fields.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target; // Destructure name, value, and type from the event target.
    // Special handling for checkbox input to correctly get its 'checked' status.
    const checked = (e.target as HTMLInputElement).checked;

    setTask((prevTask) => {
      if (!prevTask) return null; // If there's no previous task, return null.

      return {
        ...prevTask, // Spread the previous task's properties.
        // Update the specific field: if it's a checkbox, use 'checked', otherwise use 'value'.
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  // Handler for form submission.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload).
    console.log("Saving changes for task:", task); // Log the task data to be saved.

    // IMPORTANT: Do NOT use alert() in production. This is for simulation purposes only.
    // In a real application, you would replace this with a more user-friendly notification.
    alert("Task updated! (Simulated save)");

    // In a real application, you would send the updated 'task' data to your backend
    // data store (e.g., via an API call) to persist the changes.
    // For this simulation, we'll just navigate back to the job's tasks page.
    if (parentJob) {
      // Corrected navigation path: /jobs/[jobId]/tasks
      // This ensures the user is redirected to the list of tasks for the current job.
      router.push(`/jobs/${parentJob.id}/tasks`);
    } else {
      // Fallback to the general jobs list if the parent job somehow isn't found.
      router.push('/jobs');
    }
  };

  // Render a loading message while data is being fetched.
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading task details...</div>;
  }

  // Render a "Task not found" message if 'task' or 'parentJob' is null after loading.
  if (!task || !parentJob) {
    return <div className="flex justify-center items-center min-h-screen">Task not found. Please check the URL.</div>;
  }

  // Main component rendering the edit task form.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl mb-8">
        {/* Link to navigate back to the parent job's tasks list. */}
        <Link href={`/jobs/${parentJob.id}/tasks`} className="flex items-center text-blue-500 hover:text-blue-600">
          {/* SVG icon for a back arrow */}
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to {parentJob.jobName} Tasks
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Edit Task: {task.title}</h1> {/* Display current task title */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title} // Controlled component: input value is tied to state
              onChange={handleChange} // Update state on change
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Task Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={task.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Due Date Input */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date" // Use type="date" to provide a date picker UI
              id="dueDate"
              name="dueDate"
              value={task.dueDate} // dueDate is already a string in "YYYY-MM-DD" format, suitable for type="date"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Notes Textarea */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={task.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Completed Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={task.completed} // Checkbox state is tied to task.completed
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="ml-2 block text-sm font-medium text-gray-700">Completed</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}