import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, GraduationCap, Map } from 'lucide-react';

export default function DentistList() {
    const [dentists, setDentists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       axios.get(`${API_BASE}/api/dentists`)
            .then(res => {
                setDentists(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching dentists", err);
                setError("Failed to load dentists. Please ensure backend is running.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0 text-red-500">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const getPhoto = (dentist) => {
        const imageMap = {
            "Dr. Sarah Jenkins": "/images/dentist1.jpg",
            "Dr. Michael Chen": "/images/dentist2.webp",
            "Dr. Emily Patel": "/images/dentist3.jpg",
            "Dr. John Smith": "/images/dentist4.jpg",
            "Dr. Lisa Ray": "/images/dentist5.jpg"
        };
        return imageMap[dentist.name] || dentist.photo;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Our Specialists
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-500">
                    Choose from our wide range of highly qualified and experienced dental professionals.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dentists.map((dentist) => (
                    <div key={dentist.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
                        <div className="h-48 overflow-hidden relative bg-slate-200">
                            <img 
                                src={getPhoto(dentist)} 
                                alt={dentist.name} 
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=300&h=300&fit=crop"; }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white tracking-wide">
                                {dentist.name}
                            </h3>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="space-y-4 mb-6 flex-1 text-slate-600">
                                <div className="flex items-start gap-3">
                                    <GraduationCap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span className="text-sm">{dentist.qualification}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Briefcase className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-800 font-medium">{dentist.experience} Years Experience</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold text-slate-800">{dentist.clinicName}</p>
                                        <p>{dentist.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Map className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span className="text-sm">{dentist.location}</span>
                                </div>
                            </div>
                            
                            <Link 
                                to={`/book/${dentist.id}`}
                                state={{ dentist }}
                                className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
