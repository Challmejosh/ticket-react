import { useContext } from "react";
import { AppContext } from "../../../../Context/AppContext";
import { Link } from "react-router-dom";
import { Ticket, CheckCircle, Hourglass, ArrowRight, TicketPlus } from "lucide-react";

const MainDashboard = () => {
  const { tickets } = useContext(AppContext);

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((ticket) => ticket.status === "open").length;
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "closed").length;

  const stats = [
    { name: "Total Tickets", value: totalTickets, icon: Ticket },
    { name: "Open Tickets", value: openTickets, icon: Hourglass },
    { name: "Resolved Tickets", value: resolvedTickets, icon: CheckCircle },
  ];

  return (
    <div className="p-6 w-full">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          to="/create-ticket"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <TicketPlus size={16} /> Create New Ticket
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-md border border-slate-200 flex items-center">
            <stat.icon className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Link Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h2 className="text-xl font-bold mb-2">Manage Your Tickets</h2>
        <p className="text-gray-500 mb-4">
          View, edit, and create new tickets to keep your support on track.
        </p>
        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Go to Ticket Management <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

// export default MainDashboard;
export default MainDashboard;