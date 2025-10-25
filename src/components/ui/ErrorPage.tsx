import { useRouteError, Link } from "react-router-dom";

// A helper to type the error from the router
interface RouteError {
    status?: number;
    statusText?: string;
    message?: string;
}

const ErrorPage = () => {
    const error = useRouteError() as RouteError;
    console.error(error);

    let title = "An Unexpected Error Occurred";
    let message = "We're sorry, something went wrong.";

    if (error?.status === 404) {
        title = "404 - Page Not Found";
        message = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
    }

    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
            <div className="max-w-md w-full">
                <h1 className="text-8xl font-bold text-indigo-600 dark:text-indigo-500">{error?.status || 'Oops!'}</h1>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{error?.statusText || error?.message || message}</p>
                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
     );
}
 
export default ErrorPage;