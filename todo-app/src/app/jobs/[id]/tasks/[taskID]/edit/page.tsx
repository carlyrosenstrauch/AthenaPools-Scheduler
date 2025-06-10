// Edit Tasks Page

'use client'; // This directive marks this component as a Client Component.

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Defines the Task interface as per your tasks page
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  notes: string;
}

// Defines the Job interface, crucial for finding the parent job that contains the task
interface Job {
  id: string;
  jobName: string;
  clientName: string;
  status: string;
  gateCode: string;
  notes: string;
  tasks: Task[]; // Array of task objects
}

// Defines a constant array 'initialJobs' containing sample job data with nested tasks.
// This should match the initialJobs data in your tasks page to ensure consistency.
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

// Defines the 'EditTask' functional component.
export default function EditTask() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract both job ID and task ID from the URL pathname.
  // Assuming the URL structure is '/jobs/[jobId]/tasks/[taskId]/edit'
  // Example: /jobs/1/tasks/1-1/edit
  const pathSegments = pathname.split('/');
  const jobId = pathSegments[2]; // e.g., '1' from '/jobs/1/tasks/1-1/edit'
  const taskId = pathSegments[4]; // e.g., '1-1' from '/jobs/1/tasks/1-1/edit'


  // State to hold the current task being edited
  const [task, setTask] = useState<Task | null>(null);
  // State to hold the parent job information (needed for navigation back to job tasks)
  const [parentJob, setParentJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId && taskId) {
      // Find the job first
      const foundJob = initialJobs.find((j) => j.id === jobId);

      if (foundJob) {
        setParentJob(foundJob); // Store the parent job
        // Then find the task within that job
        const foundTask = foundJob.tasks.find((t) => t.id === taskId);
        if (foundTask) {
          setTask(foundTask);
        } else {
          console.error("Task not found!");
          router.push('/404'); // Redirect if task not found
        }
      } else {
        console.error("Job not found!");
        router.push('/404'); // Redirect if job not found
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [jobId, taskId, router, pathname]);

  // Handler for input changes in the task form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Special handling for checkbox input (completed status)
    const checked = (e.target as HTMLInputElement).checked;

    setTask((prevTask) => {
      if (!prevTask) return null;

      return {
        ...prevTask,
        // If the input is a checkbox, use 'checked', otherwise use 'value'
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Saving changes for task:", task);
    // IMPORTANT: Do NOT use alert() in production. This is for simulation purposes only.
    alert("Task updated! (Simulated save)");

    // In a real application, you would update the task in your backend data store here.
    // For this simulation, we'll just navigate back to the job's tasks page.
    if (parentJob) {
      // Corrected navigation path: /jobs/[jobId]/tasks
      router.push(`/jobs/${parentJob.id}/tasks`);
    } else {
      router.push('/jobs'); // Fallback to jobs list if parent job somehow not found
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading task details...</div>;
  }

  if (!task || !parentJob) {
    return <div className="flex justify-center items-center min-h-screen">Task not found. Please check the URL.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl mb-8">
        {/* Corrected Link href to go back to the job's tasks list */}
        <Link href={`/jobs/${parentJob.id}/tasks`} className="flex items-center text-blue-500 hover:text-blue-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to {parentJob.jobName} Tasks
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Edit Task: {task.title}</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Task Description */}
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

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date" // Use type="date" for a date picker
              id="dueDate"
              name="dueDate"
              value={task.dueDate} // dueDate is already a string in "YYYY-MM-DD" format
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Notes */}
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
              checked={task.completed}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="ml-2 block text-sm font-medium text-gray-700">Completed</label>
          </div>

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
