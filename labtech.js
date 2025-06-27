import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, X, User, LogOut, Hospital, Search, BarChart3, Beaker, ClipboardEdit, History, Archive } from 'lucide-react';

// --- MOCK DATA FOR LAB TECHNICIAN PORTAL ---
const mockPendingTests = [
  { sampleId: 'SAM01', patientName: 'Geeta Kapoor', testName: 'Blood (CBC)', collectedBy: 'C. Espinosa', time: '09:15 AM', status: 'Pending' },
  { sampleId: 'SAM03', patientName: 'Amit Singh', testName: 'Blood (Sugar)', collectedBy: 'C. Espinosa', time: '10:30 AM', status: 'Pending' },
  { sampleId: 'SAM04', patientName: 'Vikram Rathore', testName: 'Lipid Profile', collectedBy: 'J. Dorian', time: '11:45 AM', status: 'Processing' },
  { sampleId: 'SAM05', patientName: 'Ravi Singh', testName: 'Thyroid Function Test', collectedBy: 'J. Dorian', time: '12:00 PM', status: 'Pending' },
];

const mockLabInventory = [
    { id: 'RE001', name: 'CBC Reagent Kit', category: 'Hematology', stock: 15, status: 'In Stock' },
    { id: 'RE002', name: 'Glucose Oxidase Reagent', category: 'Biochemistry', stock: 5, status: 'Low Stock' },
    { id: 'RE003', name: 'Test Tubes (Pack of 100)', category: 'Consumables', stock: 40, status: 'In Stock' },
    { id: 'RE004', name: 'Microscope Slides', category: 'Consumables', stock: 8, status: 'Low Stock' },
    { id: 'RE005', name: 'Urine Test Strips', category: 'Clinical Pathology', stock: 0, status: 'Out of Stock' },
];

const dailyTestsData = [
  { day: 'Mon', count: 45 },
  { day: 'Tue', count: 62 },
  { day: 'Wed', count: 55 },
  { day: 'Thu', count: 70 },
  { day: 'Fri', count: 85 },
  { day: 'Sat', count: 90 },
  { day: 'Sun', count: 30 },
];

// --- NAVIGATION CONFIGURATION FOR ROLES ---
const navConfig = {
  lab_technician: [
    { page: 'dashboard', label: 'Dashboard', icon: <BarChart3 /> },
    { page: 'pending_tests', label: 'Pending Tests', icon: <Beaker /> },
    { page: 'results_entry', label: 'Results Entry', icon: <ClipboardEdit /> },
    { page: 'test_history', label: 'Test History', icon: <History /> },
    { page: 'inventory', label: 'Lab Inventory', icon: <Archive /> },
    { page: 'my_account', label: 'My Account', icon: <User /> },
  ]
};

// --- REUSABLE UI COMPONENTS ---
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

const DashboardCard = ({ title, value, icon, color }) => (
  <Card>
    <div className="flex items-center">
      <div className={`p-3 rounded-full mr-4 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </Card>
);

const CustomTable = ({ title, data, columns }) => (
    <Card>
        {title && <h3 className="font-bold text-lg mb-4 text-gray-700">{title}</h3>}
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((col) => <th key={col.header} scope="col" className="px-6 py-3">{col.header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id || row.sampleId} className="bg-white border-b hover:bg-gray-50">
                            {columns.map((col) => (
                                <td key={col.accessor} className="px-6 py-4">
                                    {col.cell ? col.cell(row) : row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

// --- PAGE COMPONENTS ---
const LabDashboard = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Lab Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="Tests to Process" value="12" icon={<Beaker className="text-white" />} color="bg-blue-500" />
            <DashboardCard title="Results Pending" value="3" icon={<ClipboardEdit className="text-white" />} color="bg-yellow-500" />
            <DashboardCard title="Tests Completed Today" value="48" icon={<History className="text-white" />} color="bg-green-500" />
            <DashboardCard title="Low Stock Items" value="2" icon={<Archive className="text-white" />} color="bg-red-500" />
        </div>
        <Card>
            <h3 className="font-bold text-lg mb-4 text-gray-700">Weekly Test Volume</h3>
            <div style={{ width: '100%', height: 300 }}>
               <ResponsiveContainer>
                    <BarChart data={dailyTestsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#3b82f6" name="Tests Performed" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </div>
);

const PendingTestsPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Pending Lab Tests</h2>
        <CustomTable
            data={mockPendingTests}
            columns={[
                { header: 'Sample ID', accessor: 'sampleId' },
                { header: 'Patient Name', accessor: 'patientName' },
                { header: 'Test Name', accessor: 'testName' },
                { header: 'Collected By', accessor: 'collectedBy' },
                { header: 'Status', accessor: 'status', cell: (row) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Pending' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>{row.status}</span>
                )},
                { header: 'Action', accessor: 'action', cell: (row) => (
                    row.status === 'Pending' && <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600">Start Processing</button>
                )}
            ]}
        />
    </div>
);

const ResultsEntryPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Test Results Entry</h2>
        <Card>
            <div className="mb-4">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Enter Sample ID to load details</label>
                 <div className="flex">
                    <input type="text" placeholder="e.g., SAM04" className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 font-semibold">Load</button>
                </div>
            </div>
            <div className="border-t pt-4 mt-4">
                 <h3 className="font-semibold text-gray-700">Details for Sample ID: SAM04</h3>
                 <p className="text-sm text-gray-600">Patient: Vikram Rathore | Test: Lipid Profile</p>
                 <div className="mt-4 space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Total Cholesterol (mg/dL)</label>
                        <input type="number" className="mt-1 block w-full md:w-1/2 rounded-md border-gray-300 shadow-sm" />
                     </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Triglycerides (mg/dL)</label>
                        <input type="number" className="mt-1 block w-full md:w-1/2 rounded-md border-gray-300 shadow-sm" />
                     </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Notes / Comments</label>
                        <textarea rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                     </div>
                     <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">Submit Results</button>
                 </div>
            </div>
        </Card>
    </div>
);


const LabInventoryPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Lab Inventory</h2>
        <CustomTable 
            data={mockLabInventory}
            columns={[
                { header: 'Item Name', accessor: 'name' },
                { header: 'Category', accessor: 'category' },
                { header: 'Stock Level', accessor: 'stock' },
                { header: 'Status', accessor: 'status', cell: (row) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                        row.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>{row.status}</span>
                )},
                { header: 'Action', accessor: 'action', cell: (row) => (
                    <button className="px-3 py-1 bg-indigo-500 text-white rounded-md text-xs hover:bg-indigo-600">Request Stock</button>
                )}
            ]}
        />
    </div>
);

const PlaceholderPage = ({title}) => <div className="space-y-6"><h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2><Card><p>This page will show the {title.toLowerCase()}.</p></Card></div>;


// --- CORE APP STRUCTURE ---
export default function App() {
    const [currentUser, setCurrentUser] = useState({ name: 'Laura Palmer', role: 'lab_technician' });
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <LabDashboard />;
            case 'pending_tests': return <PendingTestsPage />;
            case 'results_entry': return <ResultsEntryPage />;
            case 'test_history': return <PlaceholderPage title="Test History"/>;
            case 'inventory': return <LabInventoryPage />;
            case 'my_account': return <PlaceholderPage title="My Account" />;
            default: return <LabDashboard />;
        }
    };
    
    const NavLink = ({ page, label, icon }) => (
        <li onClick={() => { setCurrentPage(page); setSidebarOpen(false); }}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${
                currentPage === page 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-800'
            }`}>
            {icon}
            <span className="ml-4 font-medium">{label}</span>
        </li>
    );

    const Sidebar = ({ userRole }) => {
        const navLinks = navConfig[userRole] || [];
        return (
            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 border-r border-gray-200 transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200">
                    <a href="#" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                        <Hospital className="text-blue-600" size={28} />
                        <span>MedRex</span>
                    </a>
                </div>
                <div className="h-[calc(100vh-128px)] overflow-y-auto p-4">
                     <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Lab Menu</p>
                     <ul>
                        {navLinks.map(link => <NavLink key={link.page} {...link} />)}
                    </ul>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200">
                     <div className="flex items-center p-2">
                        <User className="h-10 w-10 rounded-full bg-gray-200 p-2 text-gray-600"/>
                        <div className="ml-3">
                            <p className="font-bold text-gray-800 text-sm">{currentUser.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{currentUser.role.replace('_', ' ')}</p>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
    
    return (
        <div className="bg-gray-100 min-h-screen">
            <Sidebar userRole={currentUser.role} />
            <div className="lg:ml-64">
                 <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-between p-4 h-16 border-b border-gray-200">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 mr-2">
                            <Menu size={24} className="text-gray-600" />
                        </button>
                        <h2 className="hidden sm:block text-xl font-bold text-gray-700">{navConfig[currentUser.role].find(l => l.page === currentPage)?.label}</h2>
                    </div>
                    <div className="flex items-center">
                        <button className="p-2 text-gray-600 hover:text-gray-900"><Search size={22} /></button>
                        <button className="p-2 ml-2 text-gray-600 hover:text-gray-900"><LogOut size={22} /></button>
                    </div>
                </header>
                <main className="p-4 sm:p-6 lg:p-8">
                    {renderPage()}
                </main>
            </div>
             {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden"></div>}
        </div>
    );
}

