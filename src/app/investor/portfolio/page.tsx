export default function InvestorPortfolioPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Investment Portfolio</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Total Value</p>
            <p className="text-2xl font-bold">$1,250,000</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Total Return</p>
            <p className="text-2xl font-bold text-green-600">+15.4%</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-500">Active Investments</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        
        <h3 className="font-medium mb-3">Investment Breakdown</h3>
        <div className="border rounded overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Company A</td>
                <td className="px-6 py-4 whitespace-nowrap">$350,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600">+22.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">28%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Company B</td>
                <td className="px-6 py-4 whitespace-nowrap">$275,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600">+18.2%</td>
                <td className="px-6 py-4 whitespace-nowrap">22%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Company C</td>
                <td className="px-6 py-4 whitespace-nowrap">$200,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-red-600">-5.4%</td>
                <td className="px-6 py-4 whitespace-nowrap">16%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 