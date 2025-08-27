import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-screen bg-white flex flex-col items-center justify-center">
      <div className="overflow-hidden flex items-start">
        <img
          src="/404notfound.gif"
          alt="404 Not Found"
          className="aspect-15/7 object-cover"
        />
      </div>
      <div className="flex flex-col items-center px-3">
        <h1 className="text-[var(--main-green)]">Page Not Found</h1>
        <p className="text-gray-400">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" 
          className="bg-[var(--main-green)] font-medium p-3 rounded-sm mt-3"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;