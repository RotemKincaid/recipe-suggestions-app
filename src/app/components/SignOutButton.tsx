'use client'

export default function SignOutButton ({signOut}: {signOut: () => void}) {
  return (

    <button className="text-violet-100 bg-violet-950 border border-gray-300 focus:outline-none hover:bg-violet-700 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-violet-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => {
        signOut()
    }}>
        Sign Out
    </button>
  )
}
