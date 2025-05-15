export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-2">
          <a href="/admin" className="block p-2 hover:bg-gray-700 rounded">Dashboard</a>
          <a href="/admin/users" className="block p-2 hover:bg-gray-700 rounded">User Management</a>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
} 