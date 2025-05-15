export default function InvestorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-emerald-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Investor Dashboard</h1>
        <nav className="space-y-2">
          <a href="/investor" className="block p-2 hover:bg-emerald-700 rounded">Home</a>
          <a href="/investor/portfolio" className="block p-2 hover:bg-emerald-700 rounded">Portfolio</a>
          <a href="/investor/settings" className="block p-2 hover:bg-emerald-700 rounded">Settings</a>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
} 