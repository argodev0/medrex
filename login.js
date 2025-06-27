import React, { useState } from 'react';
import { Hospital, LogIn } from 'lucide-react';

// This is a standalone login page component.
// It would typically receive an `onLogin` function as a prop
// to handle the authentication logic in the main app.
export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('doctor');
    const [error, setError] = useState('');

    const handleDemoLogin = (e) => {
        e.preventDefault();
        // In a real app, you would send the email and password to a server.
        // For this demo, we'll just simulate a successful login based on the selected role.
        if (!role) {
            setError('Please select a role.');
            return;
        }
        console.log(`Logging in as ${role} with email ${email}`);
        
        // The onLogin prop would be passed from the parent App component
        // to update the application's state and navigate to the correct portal.
        if (onLogin) {
            // Mock user data based on role
            const mockUsers = {
                admin: { name: 'Admin User', role: 'admin' },
                doctor: { name: 'Dr. Evelyn Reed', role: 'doctor' },
                nursing: { name: 'Carla Espinosa', role: 'nursing' },
                reception: { name: 'John Doe', role: 'reception' },
                lab_technician: { name: 'Laura Palmer', role: 'lab_technician' },
                patient: { name: 'Priya Sharma', role: 'patient' },
            };
            onLogin(mockUsers[role]);
        } else {
             // Fallback for standalone viewing
            alert(`Logged in as: ${role}\nEmail: ${email}`);
        }
    };
    
    // Auto-fill email when role changes for demo purposes
    React.useEffect(() => {
        if(role) {
            setEmail(`${role.split('_')[0]}@medrex.com`);
        } else {
            setEmail('');
        }
    }, [role]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-md m-4">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                       <Hospital className="text-blue-600" size={48} />
                       <span className="text-4xl font-bold text-gray-800 ml-3">MedRex</span>
                    </div>
                    <p className="text-gray-600">Unified Hospital Management System</p>
                </div>

                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Portal Login</h2>
                    <form onSubmit={handleDemoLogin} className="space-y-6">
                        <div>
                            <label htmlFor="role" className="text-sm font-bold text-gray-600 block mb-2">Select Your Role</label>
                            <select 
                                id="role" 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)} 
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition"
                            >
                                <option value="doctor">Doctor</option>
                                <option value="nursing">Nursing Staff</option>
                                <option value="reception">Reception/Billing</option>
                                <option value="lab_technician">Lab Technician</option>
                                <option value="admin">Administrator</option>
                                <option value="patient">Patient</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm font-bold text-gray-600 block mb-2">Username / Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g., doctor@medrex.com"
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition" 
                                required 
                            />
                        </div>

                         <div>
                            <label htmlFor="password"className="text-sm font-bold text-gray-600 block mb-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition" 
                                required 
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        
                        <div>
                            <button 
                                type="submit" 
                                className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                <LogIn className="mr-2" size={20} />
                                Login
                            </button>
                        </div>
                         <div className="text-center">
                             <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                    </form>
                </div>
                 <p className="text-center text-gray-500 text-sm mt-6">
                    &copy; 2025 MedRex Corporation. All rights reserved.
                </p>
            </div>
        </div>
    );
};
