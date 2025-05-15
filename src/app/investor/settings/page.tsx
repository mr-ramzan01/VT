export default function InvestorSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Investor Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              className="border rounded w-full px-3 py-2"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="border rounded w-full px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Preferences</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="pref1" className="mr-2" />
                <label htmlFor="pref1">Early Stage Startups</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="pref2" className="mr-2" />
                <label htmlFor="pref2">Growth Companies</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="pref3" className="mr-2" />
                <label htmlFor="pref3">Mature Businesses</label>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="notify1" className="mr-2" />
                <label htmlFor="notify1">Email Notifications</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="notify2" className="mr-2" />
                <label htmlFor="notify2">SMS Notifications</label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 