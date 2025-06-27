import React, { useState } from 'react';
import { Calendar, Download, FileText, Pill, Receipt, User, LogOut, Hospital, Search, BarChart3, Bell, Menu } from 'lucide-react';

// --- MOCK DATA FOR PATIENT PORTAL ---
const mockPatientAppointments = [
  { id: 'APP-071', doctor: 'Dr. Evelyn Reed', department: 'Cardiology', date: '2025-07-15', time: '11:00 AM', status: 'Upcoming' },
  { id: 'APP-065', doctor: 'Dr. Alan Grant', department: 'Orthopedics', date: '2025-06-20', time: '02:30 PM', status: 'Completed' },
  { id: 'APP-059', doctor: 'Dr. Patel', department: 'General Medicine', date: '2025-05-10', time: '09:00 AM', status: 'Completed' },
];

const mockPatientReports = [
    { id: 'REP-101', name: 'Complete Blood Count (CBC)', date: '2025-06-21' },
    { id: 'REP-102', name: 'Lipid Profile', date: '2025-06-21' },
    { id: 'REP-098', name: 'X-Ray - Left Knee', date: '2025-04-15' },
];

const mockPatientBills = [
    { billId: 'B250621-01', description: 'Consultation & Lab Tests', amount: '₹2,500', date: '2025-06-21', status: 'Paid' },
    { billId: 'B250415-03', description: 'X-Ray & Consultation', amount: '₹1,800', date: '2025-04-15', status: 'Paid' },
    { billId: 'B250715-01', description: 'Upcoming Consultation Booking', amount: '₹800', date: '2025-06-27', status: 'Due' },
];

const mockPatientPrescriptions = [
    { id: 'PRESC-055', doctor: 'Dr. Evelyn Reed', date: '2025-06-21', medication: 'Atorvastatin 10mg', dosage: 'Once daily at night'},
    { id: 'PRESC-049', doctor: 'Dr. Alan Grant', date: '2025-04-15', medication: 'Calcium Tablets', dosage: 'Twice daily after meals'},
]

// --- NAVIGATION CONFIGURATION FOR ROLES ---
const navConfig = {
  patient: [
    { page: 'dashboard', label: 'Dashboard', icon: <BarChart3 /> },
    { page: 'appointments', label: 'My Appointments', icon: <Calendar /> },
    { page: 'reports', label: 'My Reports', icon: <FileText /> },
    { page: 'prescriptions', label: 'My Prescriptions', icon: <Pill /> },
    { page: 'billing', label: 'Billing & Invoices', icon: <Receipt /> },
    { page: 'profile', label: 'My Profile', icon: <User /> },
  ]
};

// --- REUSABLE UI COMPONENTS ---
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

// --- PAGE COMPONENTS ---
const PatientDashboard = ({setCurrentPage}) => (
    <div className="space-y-6">
        <Card className="bg-blue-600 text-black">
            <h2 className="text-2xl sm:text-3xl font-bold">Welcome back, Priya!</h2>
            <p className="mt-2 text-blue-200">Here's a summary of your health dashboard. Stay healthy!</p>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('appointments')}>
                <h3 className="font-bold text-lg text-gray-700 flex items-center"><Calendar className="mr-2 text-blue-500"/>Upcoming Appointment</h3>
                <p className="text-gray-600 mt-2">Dr. Evelyn Reed</p>
                <p className="font-semibold text-gray-800">15th July 2025, 11:00 AM</p>
                <p className="text-sm text-gray-500">Cardiology Department</p>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('reports')}>
                <h3 className="font-bold text-lg text-gray-700 flex items-center"><FileText className="mr-2 text-green-500"/>Recent Report</h3>
                <p className="text-gray-600 mt-2">Complete Blood Count results are available.</p>
                <p className="text-sm text-gray-500">Uploaded on: 21st June 2025</p>
            </Card>
             <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage('billing')}>
                <h3 className="font-bold text-lg text-gray-700 flex items-center"><Receipt className="mr-2 text-yellow-500"/>Payment Due</h3>
                <p className="text-gray-600 mt-2">A payment of <span className="font-bold">₹800</span> is due for your next appointment booking.</p>
                <button className="mt-2 text-sm text-white bg-yellow-500 hover:bg-yellow-600 font-semibold py-1 px-3 rounded-md">Pay Now</button>
            </Card>
        </div>
         <div className="text-center">
            <button onClick={() => setCurrentPage('appointments')} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg">Book a New Appointment</button>
         </div>
    </div>
);

const PatientAppointmentsPage = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Appointments</h2>
             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center"><Calendar className="mr-2" size={18}/> Book New</button>
        </div>
        <Card>
            <h3 className="font-bold text-lg mb-4 text-gray-700">Upcoming Appointments</h3>
            {mockPatientAppointments.filter(a => a.status === 'Upcoming').map(app => (
                <div key={app.id} className="p-4 border rounded-lg mb-3 bg-blue-50">
                    <p className="font-bold text-blue-800">{app.department}</p>
                    <p className="text-gray-700">With {app.doctor} on {app.date} at {app.time}</p>
                </div>
            ))}
            <h3 className="font-bold text-lg mb-4 mt-6 text-gray-700">Past Appointments</h3>
             {mockPatientAppointments.filter(a => a.status === 'Completed').map(app => (
                <div key={app.id} className="p-4 border rounded-lg mb-3">
                    <p className="font-bold text-gray-800">{app.department}</p>
                    <p className="text-gray-700">With {app.doctor} on {app.date}</p>
                </div>
            ))}
        </Card>
    </div>
);

const PatientReportsPage = () => (
    <div className="space-y-6">
         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Lab Reports</h2>
         <Card>
            <div className="space-y-3">
                {mockPatientReports.map(report => (
                    <div key={report.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                            <p className="font-semibold text-gray-800">{report.name}</p>
                            <p className="text-sm text-gray-500">Date: {report.date}</p>
                        </div>
                        <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><Download size={20}/></button>
                    </div>
                ))}
            </div>
         </Card>
    </div>
);

const PatientPrescriptionsPage = () => (
    <div className="space-y-6">
         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Prescriptions</h2>
         <Card>
            <div className="space-y-4">
                {mockPatientPrescriptions.map(p => (
                    <div key={p.id} className="p-4 border rounded-lg">
                        <p className="font-bold text-gray-800">{p.medication}</p>
                        <p className="text-sm text-gray-600">Prescribed by {p.doctor} on {p.date}</p>
                        <p className="mt-1 text-gray-700"><strong>Dosage:</strong> {p.dosage}</p>
                    </div>
                ))}
            </div>
         </Card>
    </div>
);


const PatientBillingPage = () => (
     <div className="space-y-6">
         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Billing & Invoices</h2>
         <Card>
            <div className="space-y-3">
                 {mockPatientBills.map(bill => (
                    <div key={bill.billId} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                            <p className="font-semibold text-gray-800">{bill.description}</p>
                            <p className="text-sm text-gray-500">Bill ID: {bill.billId} | Date: {bill.date}</p>
                            <p className="font-bold text-lg mt-1 text-gray-800">{bill.amount}</p>
                        </div>
                        <div>
                            {bill.status === 'Paid' ? (
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-sm">Paid</span>
                            ) : (
                                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold">Pay Now</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
         </Card>
    </div>
);

const PatientProfilePage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Profile</h2>
        <Card>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                    <input type="text" defaultValue="Priya Sharma" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600">Contact Number</label>
                    <input type="text" defaultValue="+91-9876543210" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Address</label>
                    <textarea defaultValue="123, Sunshine Colony, New Delhi" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </div>
        </Card>
    </div>
);


// --- CORE APP STRUCTURE ---
export default function App() {
    const [currentUser, setCurrentUser] = useState({ name: 'Priya Sharma', role: 'patient' });
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <PatientDashboard setCurrentPage={setCurrentPage}/>;
            case 'appointments': return <PatientAppointmentsPage />;
            case 'reports': return <PatientReportsPage />;
            case 'prescriptions': return <PatientPrescriptionsPage />;
            case 'billing': return <PatientBillingPage />;
            case 'profile': return <PatientProfilePage />;
            default: return <PatientDashboard setCurrentPage={setCurrentPage}/>;
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
                     <ul>{navLinks.map(link => <NavLink key={link.page} {...link} />)}</ul>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200">
                     <div className="flex items-center p-2">
                        <User className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-600"/>
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
        <div className="bg-gray-100 min-h-screen font-sans">
            <Sidebar userRole={currentUser.role} />
            <div className="lg:ml-64">
                 <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-30 flex items-center justify-between p-4 h-16 border-b border-gray-200">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 mr-2"><Menu size={24} className="text-gray-600" /></button>
                        <h2 className="hidden sm:block text-xl font-bold text-gray-700">{navConfig[currentUser.role].find(l => l.page === currentPage)?.label}</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-gray-900"><Bell size={22} /></button>
                        <button className="p-2 text-gray-600 hover:text-gray-900"><LogOut size={22} /></button>
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
