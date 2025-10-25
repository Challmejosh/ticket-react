import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-indigo-600"
          >
            TicketDesk
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <Link
              to="/signin"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute -top-20 -left-20 w-72 h-72 bg-purple-200 rounded-full opacity-50 blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Welcome to <span className="text-indigo-600">TicketDesk</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
              The effortless way to manage customer support. Streamline your
              workflow and keep your customers happy.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/signin"
                className="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-medium border border-gray-200 hover:bg-gray-100 transition-transform hover:scale-105"
              >
                Login
              </Link>
            </div>
          </motion.div>
          <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 w-full h-full"
            >
              <path
                d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                style={{ stroke: "none", fill: "#f9fafb" }}
              ></path>
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Create Tickets", description: "Easily create and track support tickets for any issue." },
              { title: "Manage Status", description: "Update ticket statuses to keep everyone in the loop." },
              { title: "Collaborate", description: "Work with your team to resolve issues faster than ever." },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-[1440px] mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} TicketDesk. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;