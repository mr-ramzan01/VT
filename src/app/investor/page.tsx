export default function InvestorHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Investor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
          <p>View your investment portfolio and performance metrics.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Market Updates</h2>
          <p>Latest market news and investment opportunities.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p>Manage your investor account settings and preferences.</p>
        </div>
      </div>
    </div>
  );
} 