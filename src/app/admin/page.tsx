export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p>Manage users, roles, and permissions.</p>
          <a href="/admin/users" className="mt-4 inline-block text-blue-600 hover:underline">Manage Users →</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <p>View system health and performance metrics.</p>
          <div className="mt-4 flex items-center">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span>All systems operational</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Audit Logs</h2>
          <p>Review system activity and security logs.</p>
          <p className="mt-4 text-sm text-gray-600">Last check: Today at 09:45 AM</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="border rounded overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">User Login</td>
                <td className="px-6 py-4 whitespace-nowrap">admin@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">2 minutes ago</td>
                <td className="px-6 py-4 whitespace-nowrap">192.168.1.100</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">User Created</td>
                <td className="px-6 py-4 whitespace-nowrap">john.doe@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">1 hour ago</td>
                <td className="px-6 py-4 whitespace-nowrap">192.168.1.101</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Permission Changed</td>
                <td className="px-6 py-4 whitespace-nowrap">jane.smith@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">3 hours ago</td>
                <td className="px-6 py-4 whitespace-nowrap">192.168.1.102</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 