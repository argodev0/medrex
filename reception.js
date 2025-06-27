import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, X, Users, UserPlus, CalendarDays, Receipt, Search, LogOut, Hospital, User, BarChart3 } from 'lucide-react';

// --- MOCK DATA FOR RECEPTION/BILLING PORTAL ---
const mockTodaysAppointments = [
  { id: 'AP001', patientName: 'Ravi Singh', doctor: 'Dr. Gupta', time: '10:00 AM', status: 'Checked In' },
  { id: 'AP003', patientName: 'Vikram Rathore', doctor: 'Dr. Gupta', time: '11:00 AM', status: 'Scheduled' },
  { id: 'AP006', patientName: 'Anjali Verma', doctor: 'Dr. Patel', time: '11:15 AM', status: 'Scheduled' },
  { id: 'AP002', patientName: 'Anita Desai', doctor: 'Dr. Patel', time: '10:30 AM', status: 'Billing Done' },
  { id: 'AP004', patientName: 'Sonia Mehta', doctor: 'Dr. Jain', time: '11:30 AM', status: 'Cancelled' },
];

const mockRecentBills = [
    { billId: 'B240627-01', patientName: 'Anita Desai', amount: '₹1500', date: '2024-06-27', status: 'Paid' },
    { billId: 'B240627-02', patientName: 'Rajesh Kumar', amount: '₹800', date: '2024-06-27', status: 'Pending' },
    { billId: 'B240626-05', patientName: 'Sunita Devi', amount: '₹2200', date: '2024-06-26', status: 'Paid' },
    { billId: 'B240626-04', patientName: 'Arun Kumar', amount: '₹500', date: '2024-06-26', status: 'Paid' },
];

const dailyRevenueData = [
  { day: 'Mon', revenue: 45000 },
  { day: 'Tue', revenue: 52000 },
  { day: 'Wed', revenue: 68000 },
  { day: 'Thu', revenue: 58000 },
  { day: 'Fri', revenue: 75000 },
  { day: 'Sat', revenue: 92000 },
  { day: 'Sun', revenue: 35000 },
];

// --- NAVIGATION CONFIGURATION FOR ROLES ---
const navConfig = {
  reception: [
    { page: 'dashboard', label: 'Dashboard', icon: <BarChart3 /> },
    { page: 'registration', label: 'Patient Registration', icon: <UserPlus /> },
    { page: 'appointments', label: 'Appointments', icon: <CalendarDays /> },
    { page: 'billing', label: 'Billing', icon: <Receipt /> },
    { page: 'patient_search', label: 'Patient Search', icon: <Search /> },
    { page: 'my_account', label: 'My Account', icon: <User /> },
  ],
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
                        <tr key={row.id || row.billId} className="bg-white border-b hover:bg-gray-50">
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
const ReceptionDashboard = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Reception Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="New Registrations" value="14" icon={<UserPlus className="text-white" />} color="bg-blue-500" />
            <DashboardCard title="Today's Appointments" value="56" icon={<CalendarDays className="text-white" />} color="bg-green-500" />
            <DashboardCard title="Pending Bills" value="8" icon={<Receipt className="text-white" />} color="bg-yellow-500" />
            <DashboardCard title="Today's Revenue" value="₹45,200" icon={<BarChart3 className="text-white" />} color="bg-indigo-500" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
                <Card>
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Weekly Revenue</h3>
                    <div style={{ width: '100%', height: 300 }}>
                       <ResponsiveContainer>
                            <LineChart data={dailyRevenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip formatter={(value) => `₹${value}`} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} name="Revenue" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Quick Actions</h3>
                    <div className="space-y-3">
                       <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors">Register New Patient</button>
                       <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors">Schedule Appointment</button>
                       <button className="w-full text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-yellow-700 font-medium transition-colors">Generate Bill</button>
                       <button className="w-full text-left p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-indigo-700 font-medium transition-colors">Find Patient Record</button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

const PatientRegistrationPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">New Patient Registration</h2>
        <Card>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" placeholder="Enter full name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <input type="tel" placeholder="Enter contact number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea placeholder="Enter full address" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Register Patient</button>
                </div>
            </form>
        </Card>
    </div>
);

const AppointmentsPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Appointments</h2>
        <CustomTable
            title="Today's Appointments"
            data={mockTodaysAppointments}
            columns={[
                { header: 'Patient Name', accessor: 'patientName' },
                { header: 'Doctor', accessor: 'doctor' },
                { header: 'Time', accessor: 'time' },
                { header: 'Status', accessor: 'status', cell: (row) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        row.status === 'Checked In' ? 'bg-green-100 text-green-800' :
                        row.status === 'Billing Done' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                    }`}>{row.status}</span>
                )},
                { header: 'Action', accessor: 'action', cell: (row) => (
                    <div className="flex space-x-2">
                         {row.status === 'Scheduled' && <button className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600">Check In</button>}
                         {row.status === 'Checked In' && <button className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs hover:bg-yellow-600">Send to Billing</button>}
                    </div>
                )}
            ]}
        />
    </div>
);

const BillingPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Patient Billing</h2>
        <CustomTable
            title="Recent Bills"
            data={mockRecentBills}
            columns={[
                { header: 'Bill ID', accessor: 'billId' },
                { header: 'Patient Name', accessor: 'patientName' },
                { header: 'Amount', accessor: 'amount' },
                { header: 'Date', accessor: 'date' },
                { header: 'Status', accessor: 'status', cell: (row) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>{row.status}</span>
                )},
                { header: 'Action', accessor: 'action', cell: (row) => (
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600">View</button>
                        {row.status === 'Pending' && <button className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600">Mark as Paid</button>}
                    </div>
                )}
            ]}
        />
    </div>
);

const PatientSearchPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Patient Search</h2>
        <Card>
             <div className="flex">
                <input type="text" placeholder="Search by Patient ID, Name, or Phone Number..." className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 font-semibold flex items-center">
                    <Search size={18} className="mr-2"/> Search
                </button>
            </div>
        </Card>
    </div>
);
const ReceptionAccountPage = () => <div className="space-y-6"><h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Account</h2><Card><p>User account and profile settings for the reception staff.</p></Card></div>;


// --- CORE APP STRUCTURE ---
export default function App() {
    const [currentUser, setCurrentUser] = useState({ name: 'John "Laverne" Doe', role: 'reception' });
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <ReceptionDashboard />;
            case 'registration': return <PatientRegistrationPage />;
            case 'appointments': return <AppointmentsPage />;
            case 'billing': return <BillingPage />;
            case 'patient_search': return <PatientSearchPage />;
            case 'my_account': return <ReceptionAccountPage />;
            default: return <ReceptionDashboard />;
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
                     <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Menu</p>
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
