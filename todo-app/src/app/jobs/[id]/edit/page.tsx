// Edit Job Page

// This line specifies the file path within the Next.js project structure.
// 'pages/jobs/[id]/edit.tsx' indicates it's a dynamic route page in the 'pages' router.
// (Note: While your error messages suggest App Router, your file path structure is typical of Pages Router.
// The code itself is written for App Router due to previous fixes.)
// 'use client';' is a directive that marks this component as a Client Component.
// This means it will be rendered on the client-side (in the browser), allowing the use of React Hooks like useState and useEffect.
'use client'; // This directive must be at the very top of the file to function correctly.

// Imports the 'useRouter' hook from 'next/navigation', used for client-side navigation in Next.js App Router.
import { useRouter, usePathname } from 'next/navigation'; // Imports 'usePathname' to get the current URL path.
// Imports 'useState' and 'useEffect' hooks from React, used for managing component state and side effects.
import { useState, useEffect } from 'react';
// Imports the 'Link' component from 'next/link', used for client-side navigation that prefetches content.
import Link from 'next/link';

// Defines a TypeScript interface named 'Job' to specify the structure and types of a job object.
interface Job {
  id: string; // Unique identifier for the job.
  jobName: string; // Name of the job.
  clientName: string; // Name of the client.
  status: string; // Current status of the job.
  gateCode: string; // Gate code for access.
  notes: string; // Any notes related to the job.
  tasks: string[]; // An array of tasks (represented as strings for now).
}

// Defines a constant array 'allJobs' containing sample job data.
// IMPORTANT: In a real application, this data would typically be fetched from a persistent backend database.
const allJobs: Job[] = [
  // First job object.
  {
    id: "1",
    jobName: "Lot 3",
    clientName: "Cindy McKinny",
    status: "In Progress",
    gateCode: "4729",
    notes: "",
    tasks: [
      "Excavation",
      "Steel",
      "Plumbing"
    ]
  },
  // Second job object.
  {
    id: "2",
    jobName: "Sage Thrasher",
    clientName: "X",
    status: "Scheduled",
    gateCode: "",
    notes: "",
    tasks: [
      "Demo",
      "Steel",
      "Plumbing"
    ]
  },
  // Third job object.
  {
    id: "3",
    jobName: "Emergency Repair - Wilson Pool",
    clientName: "Mike Wilson",
    status: "Overdue",
    gateCode: "",
    notes: "",
    tasks: [
      "Replace pump",
      "Check electrical connections",
      "Test system"
    ]
  }
];

// This comment clarifies that the component no longer relies on the 'params' prop directly for 'id'.
// Defines the 'EditJob' functional component as the default export.
// It doesn't take 'params' as a direct prop anymore, as 'usePathname' is used instead.
export default function EditJob() {
  // Initializes the router object for navigation functionalities (e.g., redirecting).
  const router = useRouter();
  // Gets the current URL pathname (e.g., "/jobs/1/edit").
  const pathname = usePathname();

  // Extracts the job ID from the URL pathname by splitting the string at '/' and taking the third segment.
  // This assumes the URL structure is consistently '/jobs/[id]/edit'.
  const id = pathname.split('/')[2];

  // Declares a state variable 'job' to hold the job data being edited, initially null.
  // 'setJob' is the function used to update this state.
  const [job, setJob] = useState<Job | null>(null);
  // Declares a state variable 'loading' to track if data is currently being loaded, initially true.
  // 'setLoading' is the function used to update this state.
  const [loading, setLoading] = useState(true);

  // 'useEffect' hook runs side effects (like data fetching) after render.
  // It runs when 'id', 'router', or 'pathname' changes.
  useEffect(() => {
    // Checks if 'id' has a value (meaning it's extracted from the URL).
    if (id) {
      // Finds the job object in the 'allJobs' array that matches the extracted 'id'.
      const foundJob = allJobs.find((j) => j.id === id);
      // Checks if a job was found.
      if (foundJob) {
        // If found, updates the 'job' state with the found job data.
        setJob(foundJob);
      } else {
        // If not found, logs an error to the console.
        console.error("Job not found for ID:", id);
        // Redirects the user to a 404 Not Found page.
        router.push('/404');
      }
      // Sets loading to false once the data fetching/finding is complete.
      setLoading(false);
    } else {
      // If 'id' is not available (e.g., during initial render before pathname is fully resolved),
      // set loading to false as there's no job to load yet.
      setLoading(false);
    }
  }, [id, router, pathname]); // Dependencies: Effect re-runs if any of these values change.

  // Defines a handler function for changes in form input fields.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Destructures 'name' (input's name attribute) and 'value' (input's current value) from the event target.
    const { name, value } = e.target;
    // Updates the 'job' state.
    setJob((prevJob) => {
      // If the previous job state is null, return null (no update).
      if (!prevJob) return null;
      // Returns a new job object with the changed field updated.
      // '[name]: value' uses a computed property name to update the specific field.
      return {
        ...prevJob, // Spreads all existing properties of the previous job.
        [name]: value, // Overwrites the specific property with the new value.
      };
    });
  };

  // Defines a handler function for when the form is submitted.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevents the default form submission behavior, which would cause a full page reload.
    e.preventDefault();
    // Logs the current (edited) job data to the console (for debugging).
    console.log("Saving changes for job:", job);
    // Displays a simple alert message to the user confirming the update (simulated).
    alert("Job updated! (Simulated save)");
    // Redirects the user back to the main jobs list page.
    // In a real app, this would happen after a successful API call to save to the database.
    router.push('/jobs');
  };

  // Displays a loading message if the 'loading' state is true.
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading job details...</div>;
  }

  // Displays a "Job not found" message if 'job' state is null after loading.
  if (!job) {
    return <div className="flex justify-center items-center min-h-screen">Job not found. Please check the URL.</div>;
  }

  // Returns the JSX (UI elements) for the edit job form.
  return (
    // Creates a flexible column container that centers its content and takes up the full screen height.
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Creates a div to contain the "Back to Jobs" link.*/}
      <div className="w-full max-w-2xl mb-8">
        {/* Creates a link to navigate back to the main jobs list page.*/}
        <Link href={"/jobs"} className="flex items-center text-blue-500 hover:text-blue-600">
          {/* SVG icon representing a left arrow for navigation.*/}
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* Defines the path data for the arrow icon.*/}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </Link>
      </div>
      {/* Displays the heading for the edit page, including the job's name.*/}
      <h1 className="text-3xl font-bold mb-8">Edit Job: {job.jobName}</h1>
      {/* Creates a container div for the job editing form.*/}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        {/* Defines an HTML form element.*/}
        {/* 'onSubmit' calls the 'handleSubmit' function when the form is submitted.*/}
        {/* 'className' applies Tailwind CSS for spacing between form elements.*/}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Container div for the "Job Name" label and input.*/}
          <div>
            {/* Label for the Job Name input field.*/}
            <label htmlFor="jobName" className="block text-sm font-medium text-gray-700">Job Name</label>
            {/* Input field for the job name.
             'type="text"': Specifies it's a single-line text input.
             'id="jobName"': Links the input to its label (for htmlFor).
             'name="jobName"': Name attribute used in form submissions and for handleChange.
             'value={job.jobName}': Binds the input's value to the 'jobName' property in the 'job' state (controlled component).
             'onChange={handleChange}': Calls 'handleChange' whenever the input's value changes.
             'className' applies Tailwind CSS for styling the input field. */}
            <input
              type="text"
              id="jobName"
              name="jobName"
              value={job.jobName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Container div for the "Client Name" label and input.*/}
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={job.clientName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Container div for the "Gate Code" label and input.*/}
          <div>
            <label htmlFor="gateCode" className="block text-sm font-medium text-gray-700">Gate Code</label>
            <input
              type="text"
              id="gateCode"
              name="gateCode"
              value={job.gateCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Container div for the "Notes" label and textarea.*/}
          <div>
            {/* Label for the Notes textarea.*/}
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            {/* Textarea for multi-line notes.
            // 'rows={3}' sets the default visible height to 3 lines. */}
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={job.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Container div for the "Status" label and input.*/}
          <div>
            {/* Label for the Status input field.*/}
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            {/* Input field for the job status.
             (A <select> dropdown would be more suitable for predefined statuses in a real app).*/}
            <input
              type="text"
              id="status"
              name="status"
              value={job.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
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