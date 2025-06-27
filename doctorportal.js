import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronLeft, Menu, X, Users, BedDouble, Stethoscope, BarChart3, User, LogOut, Hospital, Pill, Search, Building } from 'lucide-react';

// --- MOCK DATA ---
const mockOpdAppointments = [
  { id: 'AP001', patientName: 'Ravi Singh', time: '10:00 AM', status: 'Scheduled' },
  { id: 'AP002', patientName: 'Anita Desai', time: '10:30 AM', status: 'Completed' },
  { id: 'AP003', patientName: 'Vikram Rathore', time: '11:00 AM', status: 'Scheduled' },
  { id: 'AP004', patientName: 'Sonia Mehta', time: '11:30 AM', status: 'Cancelled' },
  { id: 'AP005', patientName: 'Rajesh Kumar', time: '12:00 PM', status: 'Scheduled' },
];

const mockMyPatients = [
  { id: 'PID001', name: 'Arun Kumar', age: 45, lastVisit: '2024-06-25', condition: 'Hypertension' },
  { id: 'PID002', name: 'Priya Sharma', age: 32, lastVisit: '2024-06-24', condition: 'Post-Op Follow-up' },
  { id: 'PID004', name: 'Sunita Devi', age: 58, lastVisit: '2024-06-26', condition: 'Diabetes Management' },
  { id: 'PID007', name: 'Geeta Kapoor', age: 55, lastVisit: '2024-06-27', condition: 'Admitted - Pneumonia' },
];

const weeklyActivityData = [
  { day: 'Mon', OPD: 15, Consultations: 20 },
  { day: 'Tue', OPD: 18, Consultations: 22 },
  { day: 'Wed', OPD: 25, Consultations: 30 },
  { day: 'Thu', OPD: 20, Consultations: 25 },
  { day: 'Fri', OPD: 28, Consultations: 35 },
  { day: 'Sat', OPD: 35, Consultations: 40 },
  { day: 'Sun', OPD: 10, Consultations: 12 },
];

// --- NAVIGATION CONFIGURATION FOR ROLES ---
const navConfig = {
  doctor: [
    { page: 'dashboard', label: 'Dashboard', icon: <BarChart3 /> },
    { page: 'opd', label: 'OPD', icon: <Stethoscope /> },
    { page: 'my_patients', label: 'My Patients', icon: <Users /> },
    { page: 'ipd_wards', label: 'IPD Wards', icon: <BedDouble /> },
    { page: 'pharmacy', label: 'Pharmacy', icon: <Pill /> },
    { page: 'my_account', label: 'My Account', icon: <User /> },
  ],
  // We will add other roles like 'admin', 'reception', etc. here
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
        <h3 className="font-bold text-lg mb-4 text-gray-700">{title}</h3>
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
                                    {col.accessor === 'status' ? (
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            row.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                            row.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {row[col.accessor]}
                                        </span>
                                    ) : (
                                        row[col.accessor]
                                    )}
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
const Dashboard = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Doctor's Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="Today's Appointments" value="12" icon={<Stethoscope className="text-white" />} color="bg-blue-500" />
            <DashboardCard title="My Active Patients" value="38" icon={<Users className="text-white" />} color="bg-green-500" />
            <DashboardCard title="IPD Rounds To-Do" value="6" icon={<BedDouble className="text-white" />} color="bg-yellow-500" />
            <DashboardCard title="Pending Reports" value="3" icon={<Building className="text-white" />} color="bg-indigo-500" />
        </div>
        <Card>
            <h3 className="font-bold text-lg mb-4 text-gray-700">My Weekly Activity</h3>
            <div style={{ width: '100%', height: 300 }}>
               <ResponsiveContainer>
                    <BarChart data={weeklyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="OPD" fill="#3b82f6" name="OPD Patients" />
                        <Bar dataKey="Consultations" fill="#8884d8" name="IPD Consultations" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </div>
);

const OPDPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My OPD Schedule</h2>
        <CustomTable 
            title="Today's Appointments"
            data={mockOpdAppointments}
            columns={[
                { header: 'Case ID', accessor: 'id' },
                { header: 'Patient Name', accessor: 'patientName' },
                { header: 'Time', accessor: 'time' },
                { header: 'Status', accessor: 'status' },
            ]}
        />
    </div>
);

const MyPatientsPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Patient List</h2>
        <CustomTable 
            title="All My Patients"
            data={mockMyPatients}
            columns={[
                { header: 'Patient ID', accessor: 'id' },
                { header: 'Name', accessor: 'name' },
                { header: 'Age', accessor: 'age' },
                { header: 'Last Visit', accessor: 'lastVisit' },
                { header: 'Primary Condition', accessor: 'condition' },
            ]}
        />
    </div>
);

const IpdWardsPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">IPD Wards</h2>
        <Card>
            <p className="text-gray-600">Ward management and patient monitoring functionalities will be displayed here. You will be able to view bed assignments, patient vitals, and update treatment plans.</p>
        </Card>
    </div>
);

const PharmacyPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Pharmacy</h2>
        <Card>
            <p className="text-gray-600">This section will allow you to prescribe medications, view availability, and check for drug interactions. Integration with the hospital's pharmacy inventory is planned.</p>
        </Card>
    </div>
);

const MyAccountPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Account</h2>
         <Card>
            <h3 className="text-lg font-bold text-gray-700 mb-4">Profile Information</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input type="text" defaultValue="Dr. Evelyn Reed" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100" readOnly />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Specialty</label>
                    <input type="text" defaultValue="Cardiology" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100" readOnly/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input type="email" defaultValue="e.reed@hospital.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Profile</button>
            </div>
        </Card>
    </div>
);


// --- CORE APP STRUCTURE ---
export default function App() {
    // Simulate a logged-in user. We can change 'doctor' to other roles later.
    const [currentUser, setCurrentUser] = useState({ name: 'Dr. Evelyn Reed', role: 'doctor' });
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <Dashboard />;
            case 'opd': return <OPDPage />;
            case 'my_patients': return <MyPatientsPage />;
            case 'ipd_wards': return <IpdWardsPage />;
            case 'pharmacy': return <PharmacyPage />;
            case 'my_account': return <MyAccountPage />;
            default: return <Dashboard />;
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
                        <button className="p-2 text-gray-600 hover:text-gray-900">
                            <Search size={22} />
                        </button>
                        <button className="p-2 ml-2 text-gray-600 hover:text-gray-900">
                            <LogOut size={22} />
                        </button>
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
