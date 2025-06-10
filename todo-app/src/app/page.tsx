// Home Page

// Defines the 'Home' component as the default export for this file.
export default function Home() {
  // Returns the JSX (UI elements) that this component will render.
  return (
    // Creates a flexible container div that centers its content vertically and horizontally.
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Athena Pools Task Scheduler</h1>
      <a
        // Specifies that clicking this link will navigate to the '/jobs' page.
        href="/jobs"
        // Applies Tailwind CSS classes to style the link's appearance and hover effect.
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        View Jobs
      </a>
    </div> // Closes the main container div
  )
}
