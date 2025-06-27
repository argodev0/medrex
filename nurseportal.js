import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, X, Users, BedDouble, Stethoscope, BarChart3, User, LogOut, Hospital, Pill, Search, ClipboardList, Beaker, Archive, AlertTriangle } from 'lucide-react';

// --- MOCK DATA FOR NURSING PORTAL ---
const mockWardPatients = [
  { id: 'PID007', name: 'Geeta Kapoor', bed: 'B-201', doctor: 'Dr. Reed', alert: 'High Fever' },
  { id: 'PID012', name: 'Suresh Raina', bed: 'B-202', doctor: 'Dr. Patel', alert: null },
  { id: 'PID009', name: 'Meena Kumari', bed: 'B-203', doctor: 'Dr. Reed', alert: 'Low BP' },
  { id: 'PID015', name: 'Amit Singh', bed: 'B-204', doctor: 'Dr. Gupta', alert: null },
];

const mockPendingMedications = [
  { id: 'MED01', patientName: 'Geeta Kapoor', medication: 'Paracetamol 500mg', time: '09:00 AM', status: 'Pending' },
  { id: 'MED02', patientName: 'Suresh Raina', medication: 'Amoxicillin 250mg', time: '09:30 AM', status: 'Pending' },
  { id: 'MED03', patientName: 'John Doe', medication: 'Ibuprofen 200mg', time: '08:00 AM', status: 'Administered' },
  { id: 'MED04', patientName: 'Meena Kumari', medication: 'Metformin 500mg', time: '10:00 AM', status: 'Pending' },
];

const mockPendingSamples = [
  { id: 'SAM01', patientName: 'Geeta Kapoor', type: 'Blood (CBC)', time: '09:15 AM', status: 'Pending' },
  { id: 'SAM02', patientName: 'Suresh Raina', type: 'Urine (Routine)', time: '11:00 AM', status: 'Collected' },
  { id: 'SAM03', patientName: 'Amit Singh', type: 'Blood (Sugar)', time: '10:30 AM', status: 'Pending' },
];

const mockInventory = [
    { id: 'INV001', name: 'Sterile Gloves (Box)', category: 'Consumables', stock: 25, status: 'In Stock' },
    { id: 'INV002', name: 'IV Cannula (22G)', category: 'Medical Supplies', stock: 8, status: 'Low Stock' },
    { id: 'INV003', name: 'Saline Solution (500ml)', category: 'Medication', stock: 50, status: 'In Stock' },
    { id: 'INV004', name: 'Syringes (10ml)', category: 'Consumables', stock: 150, status: 'In Stock' },
    { id: 'INV005', name: 'Band-Aids (Pack)', category: 'Consumables', stock: 0, status: 'Out of Stock' },
];

// --- NAVIGATION CONFIGURATION FOR ROLES ---
const navConfig = {
  doctor: [
    // ... (doctor config from previous step)
  ],
  nursing: [
    { page: 'dashboard', label: 'Dashboard', icon: <BarChart3 /> },
    { page: 'my_patients', label: 'My Patients', icon: <Users /> },
    { page: 'medications', label: 'Pending Medications', icon: <ClipboardList /> },
    { page: 'samples', label: 'Pending Samples', icon: <Beaker /> },
    { page: 'ipd_wards', label: 'IPD Wards', icon: <BedDouble /> },
    { page: 'inventory', label: 'Inventory', icon: <Archive /> },
    { page: 'pharmacy', label: 'Pharmacy', icon: <Pill /> },
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

const NursingDashboard = () => {
    const pendingMedsCount = mockPendingMedications.filter(m => m.status === 'Pending').length;
    const pendingSamplesCount = mockPendingSamples.filter(s => s.status === 'Pending').length;
    const criticalAlertsCount = mockWardPatients.filter(p => p.alert).length;
    const lowStockCount = mockInventory.filter(i => i.status === 'Low Stock').length;
    
    return (
        <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Nurse's Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Pending Medications" value={pendingMedsCount} icon={<ClipboardList className="text-white" />} color="bg-sky-500" />
                <DashboardCard title="Samples to Collect" value={pendingSamplesCount} icon={<Beaker className="text-white" />} color="bg-teal-500" />
                <DashboardCard title="Critical Alerts" value={criticalAlertsCount} icon={<AlertTriangle className="text-white" />} color="bg-red-500" />
                <DashboardCard title="Low Stock Items" value={lowStockCount} icon={<Archive className="text-white" />} color="bg-orange-500" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <CustomTable 
                    title="Urgent Tasks"
                    data={[...mockPendingMedications.filter(m=>m.status==='Pending'), ...mockPendingSamples.filter(s=>s.status==='Pending')].slice(0, 5)}
                    columns={[
                        { header: 'Patient', accessor: 'patientName' },
                        { header: 'Task', accessor: 'medication', cell: (row) => row.medication || row.type },
                        { header: 'Time', accessor: 'time' },
                    ]}
                 />
                 <CustomTable 
                    title="Ward Status (Wing B)"
                    data={mockWardPatients}
                    columns={[
                        { header: 'Bed', accessor: 'bed' },
                        { header: 'Patient', accessor: 'name' },
                        { header: 'Alert', accessor: 'alert', cell: (row) => row.alert ? <span className="text-red-600 font-bold">{row.alert}</span> : 'None' },
                    ]}
                 />
            </div>
        </div>
    );
};

const PendingMedicationsPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Pending Medications</h2>
        <CustomTable 
            data={mockPendingMedications}
            columns={[
                { header: 'Patient Name', accessor: 'patientName' },
                { header: 'Medication', accessor: 'medication' },
                { header: 'Scheduled Time', accessor: 'time' },
                { header: 'Status', accessor: 'status', cell: (row) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>{row.status}</span>
                )},
                { header: 'Action', accessor: 'action', cell: (row) => (
                     row.status === 'Pending' && <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600">Administer</button>
                )}
            ]}
        />
    </div>
);

const PendingSamplesPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Pending Samples</h2>
        <CustomTable 
            data={mockPendingSamples}
            columns={[
                { header: 'Patient Name', accessor: 'patientName' },
                { header: 'Sample Type', accessor: 'type' },
                { header: 'Scheduled Time', accessor: 'time' },
                { header: 'Status', accessor: 'status', cell: (row) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'
                    }`}>{row.status}</span>
                )},
                { header: 'Action', accessor: 'action', cell: (row) => (
                     row.status === 'Pending' && <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600">Collect</button>
                )}
            ]}
        />
    </div>
);

const NursingIpdWardsPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">IPD Ward Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockWardPatients.map(patient => (
                <Card key={patient.id} className={patient.alert ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-lg text-gray-800">{patient.name}</p>
                            <p className="text-sm text-gray-500">Bed: {patient.bed}</p>
                        </div>
                        {patient.alert && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-semibold">{patient.alert}</span>}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Assigned Doctor: {patient.doctor}</p>
                    <div className="mt-4 flex space-x-2">
                        <button className="flex-1 text-center py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">View Vitals</button>
                        <button className="flex-1 text-center py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">Add Note</button>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const InventoryPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Ward Inventory</h2>
         <CustomTable 
            data={mockInventory}
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
                     row.status !== 'In Stock' && <button className="px-3 py-1 bg-indigo-500 text-white rounded-md text-xs hover:bg-indigo-600">Request</button>
                )}
            ]}
        />
    </div>
);

// Placeholder pages for consistency
const NursingMyPatientsPage = () => <div className="space-y-6"><h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Patients</h2><Card><p>A list of all patients assigned to the current nurse's ward will be shown here.</p></Card></div>;
const NursingPharmacyPage = () => <div className="space-y-6"><h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Pharmacy</h2><Card><p>A view for checking medication stock levels and details.</p></Card></div>;
const NursingMyAccountPage = () => <div className="space-y-6"><h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Account</h2><Card><p>User account and profile settings for the nurse.</p></Card></div>;


// --- CORE APP STRUCTURE ---
export default function App() {
    const [currentUser, setCurrentUser] = useState({ name: 'Carla Espinosa', role: 'nursing' });
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <NursingDashboard />;
            case 'my_patients': return <NursingMyPatientsPage />;
            case 'medications': return <PendingMedicationsPage />;
            case 'samples': return <PendingSamplesPage />;
            case 'ipd_wards': return <NursingIpdWardsPage />;
            case 'inventory': return <InventoryPage />;
            case 'pharmacy': return <NursingPharmacyPage />;
            case 'my_account': return <NursingMyAccountPage />;
            default: return <NursingDashboard />;
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
