// Jobs Page

// Imports the Link component from Next.js, used for client-side navigation between pages.
import Link from 'next/link';

// Defines the 'Jobs' component as the default export for this file.
export default function Jobs() {
  // Declares a constant array named 'jobs' to hold sample job data.
  // In a real application with a backend, this data would be fetched from an API.
  const jobs = [
    // Defines the first job object with various properties.
    {
      id: "1", // Unique identifier for the job.
      jobName: "Lot 3", 
      clientName: "Cindy McKinny", 
      status: "In Progress", 
      gateCode: "4729", 
      notes: "", 
      tasks: [ // An array of tasks associated with this job.
        "Excavation",
        "Steel",
        "Plumbing"
      ]
    },
    // Defines the second job object.
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
    // Defines the third job object.
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

  // Defines a constant object 'statusColors' to map job statuses to Tailwind CSS background colors.
  // 'as const' ensures that the object's properties are read-only and types are inferred narrowly.
  const statusColors = {
    "Scheduled": "bg-blue-500",
    "In Progress": "bg-yellow-500",
    "Completed": "bg-green-500",
    "Overdue": "bg-red-500"
  } as const;

  // Returns the JSX (UI elements) that this component will render.
  return (
    // Creates a flexible column container that centers its content and takes up the full screen height.
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      {/* Creates a div to contain the "Return to Front Page" link. */}
      <div className="w-full max-w-2xl mb-8">
        {/* Creates a link to navigate back to the application's front page. */}
        <Link href="/" className="flex items-center text-blue-500 hover:text-blue-600">
          {/* SVG icon representing a left arrow for navigation. */}
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* Defines the path data for the arrow icon. */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {/* Text for the navigation link. */}
          Return to Front Page
        </Link>
      </div>
      {/* Displays the main heading for the Jobs page. */}
      <h1 className="text-3xl font-bold mb-8">Jobs</h1>
      {/* Creates a container div for the job list.*/}
      <div className="w-full max-w-2xl">
        {/* Creates a white, rounded, and shadowed background for the job list. */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Iterates over each job in the 'jobs' array to render individual job cards. */}
          {jobs.map((job) => (
            // Creates a container for each job, with a bottom border and flex layout.
            <div key={job.id} className="border-b py-4 flex justify-between items-start">
              {/*Creates a flexible div to hold the job's main information. */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{job.jobName}</h2>
                <p className="text-gray-600">Client: {job.clientName}</p>
                <p className="text-gray-600">Gate Code: {job.gateCode}</p>
                <p className="text-gray-600">Notes: {job.notes}</p>
                <div className="flex items-center mt-2">
                  {/* Placeholder for status color indicator. */}
                  {/*<span className={`inline-block w-2 h-2 rounded-full ${statusColors[job.status]} mr-2`} />*/}
                  {/* Placeholder for status text. */}
                  {/*<span className="text-sm font-medium">{job.status}</span>*/}
                </div>
                <p className="mt-2 text-gray-600 cursor-pointer hover:underline">
                  Click to view attachments
                </p>
              </div>
              {/* START: Added a div to contain both buttons */}
              {/*Creates a div to stack the "View Tasks" and "Edit Job" buttons vertically.*/}
              <div className="ml-4 flex flex-col space-y-2">
                {/* Creates a link to navigate to the tasks page for the specific job.*/}
                <Link
                  href={`/jobs/${job.id}/tasks`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-center"
                >
                  View Tasks
                </Link>
                {/* START: Added the Edit Job button */}
                {/*} Creates a link to navigate to the edit page for the specific job.*/}
                <Link
                  href={`/jobs/${job.id}/edit`} // This link will point to your "edit job" page for this specific job ID
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-center"
                >
                  Edit Job
                </Link>
                {/* END: Added the Edit Job button */}
              </div>
              {/* END: Added a div to contain both buttons */}
            </div>
          ))}
        </div>
      </div>

      {/* ADDED THE FOLLOWING LINK COMPONENT FOR THE BUTTON */}
      {/*} Creates a fixed-position button at the bottom right to add a new job.*/}
      <Link
        href="/add-job" // This link should point to your "add new job" page
        className="fixed bottom-8 right-8 bg-green-500 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        Add New Job
      </Link>
    </div>
  );
}