import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, X, Users, UserPlus, Building, BarChart3, Settings, LogOut, Hospital, User, Search, Megaphone, DollarSign, BedDouble } from 'lucide-react';

// --- MOCK DATA FOR ADMINISTRATIVE PORTAL ---
const mockStaff = [
    { id: 'STF001', name: 'Dr. Evelyn Reed', role: 'Doctor', department: 'Cardiology', status: 'Active' },
    { id: 'STF002', name: 'Carla Espinosa', role: 'Nursing', department: 'IPD Ward B', status: 'Active' },
    { id: 'STF003', name: 'John Doe', role: 'Reception', department: 'Front Desk', status: 'Active' },
    { id: 'STF004', name: 'Dr. Alan Grant', role: 'Doctor', department: 'Orthopedics', status: 'On Leave' },
    { id: 'STF005', name: 'Laura Palmer', role: 'Lab Technician', department: 'Pathology', status: 'Active' },
];

const departmentRevenueData = [
  { name: 'Cardiology', value: 400000 },
  { name: 'Orthopedics', value: 300000 },
  { name: 'Neurology', value: 200000 },
  { name: 'General OPD', value: 550000 },
  { name: 'Pharmacy', value: 250000 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const bedOccupancyData = [
  { name: 'Occupied', value: 85 },
  { name: 'Available', value: 40 },
];


// --- NAVIGATION CONFIGURATION FOR ROLES ---
const navConfig = {
  admin: [
    { page: 'dashboard', label: 'Dashboard', icon: <BarChart3 /> },
    { page: 'user_management', label: 'User Management', icon: <Users /> },
    { page: 'departments', label: 'Departments', icon: <Building /> },
    { page: 'financials', label: 'Financials', icon: <DollarSign /> },
    { page: 'announcements', label: 'Announcements', icon: <Megaphone /> },
    { page: 'settings', label: 'Settings', icon: <Settings /> },
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
                        <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
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
const AdminDashboard = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Hospital Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="Total Revenue (Month)" value="₹1,250,000" icon={<DollarSign className="text-white" />} color="bg-green-500" />
            <DashboardCard title="Total Patients (Today)" value="258" icon={<Users className="text-white" />} color="bg-blue-500" />
            <DashboardCard title="Bed Occupancy" value="68%" icon={<BedDouble className="text-white" />} color="bg-yellow-500" />
            <DashboardCard title="Active Staff" value="142" icon={<UserPlus className="text-white" />} color="bg-indigo-500" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <h3 className="font-bold text-lg mb-4 text-gray-700">Revenue by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={departmentRevenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                            {departmentRevenueData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`}/>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
             <Card>
                <h3 className="font-bold text-lg mb-4 text-gray-700">Bed Occupancy</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                         <Pie data={bedOccupancyData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" paddingAngle={5} label>
                            <Cell fill="#ffc658" />
                            <Cell fill="#00C49F" />
                         </Pie>
                         <Tooltip />
                         <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
        </div>
    </div>
);

const UserManagementPage = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">User Management</h2>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"><UserPlus size={18} className="mr-2"/> Add New User</button>
        </div>
        <CustomTable
            data={mockStaff}
            columns={[
                { header: 'Staff ID', accessor: 'id' },
                { header: 'Name', accessor: 'name' },
                { header: 'Role', accessor: 'role' },
                { header: 'Department', accessor: 'department' },
                { header: 'Status', accessor: 'status', cell: (row) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>{row.status}</span>
                )},
                { header: 'Actions', accessor: 'actions', cell: (row) => (
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs hover:bg-gray-300">Edit</button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600">Suspend</button>
                    </div>
                )}
            ]}
        />
    </div>
);

const PlaceholderPage = ({title}) => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
        <Card>
            <p className="text-gray-600">The interface for managing {title.toLowerCase()} will be displayed here. This is a placeholder for future development.</p>
        </Card>
    </div>
);


// --- CORE APP STRUCTURE ---
export default function App() {
    const [currentUser, setCurrentUser] = useState({ name: 'Admin User', role: 'admin' });
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <AdminDashboard />;
            case 'user_management': return <UserManagementPage />;
            case 'departments': return <PlaceholderPage title="Departments" />;
            case 'financials': return <PlaceholderPage title="Financials" />;
            case 'announcements': return <PlaceholderPage title="Announcements" />;
            case 'settings': return <PlaceholderPage title="Settings" />;
            case 'my_account': return <PlaceholderPage title="My Account" />;
            default: return <AdminDashboard />;
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
                     <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Admin Menu</p>
                     <ul>
                        {navLinks.map(link => <NavLink key={link.page} {...link} />)}
                    </ul>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200">
                     <div className="flex items-center p-2">
                        <User className="h-10 w-10 rounded-full bg-gray-200 p-2 text-gray-600"/>
                        <div className="ml-3">
                            <p className="font-bold text-gray-800 text-sm">{currentUser.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
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
