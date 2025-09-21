import Link from "next/link"

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Lingua
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/lessons" className="text-gray-500 hover:text-blue-600 font-medium">
              Lessons
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
