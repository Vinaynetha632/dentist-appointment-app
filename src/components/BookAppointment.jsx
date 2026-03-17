import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Calendar, User, UserCheck, Cake, Activity } from "lucide-react";

export default function BookAppointment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { dentistId } = useParams();

  // Fallback if navigating directly
if (!state?.dentist) {
    navigate("/");
    return null;
}

const dentist = state.dentist;

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    date: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
console.log("Booking dentist:", dentist);
    try {
    await axios.post("/api/appointments", {
    patientName: formData.patientName,
    dob: String(formData.age),
    gender: formData.gender,
    date: formData.date,
    dentistId: Number(dentist.id),
    dentistName: dentist.name,
    clinicName: dentist.clinicName 
});

      setStatus({ loading: false, success: true, error: null });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.error || "Failed to book appointment",
      });
    }
  };

  if (status.success) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center animate-in zoom-in duration-300">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Appointment Confirmed!
        </h2>
        <p className="text-slate-600 mb-6">
          Your appointment with {dentist.name} has been successfully booked for{" "}
          {formData.date}.
        </p>
        <p className="text-sm text-slate-500">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto shadow-xl rounded-3xl bg-white overflow-hidden border border-slate-100">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white">
        <h2 className="text-3xl font-bold tracking-wide">Book Appointment</h2>
        <p className="mt-2 text-blue-100 font-medium">
          with {dentist.name} at {dentist.clinicName}
        </p>
      </div>

      <div className="p-8">
        {status.error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm text-red-700">{status.error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" /> Patient Full Name
            </label>
            <input
              type="text"
              name="patientName"
              required
              value={formData.patientName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Cake className="w-4 h-4 text-blue-500" /> Age
              </label>
              <input
                type="number"
                name="age"
                required
                min="0"
                max="150"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Age in years"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-500" /> Gender
              </label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" /> Appointment Date
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status.loading}
              className="flex-[2] py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all flex justify-center items-center shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status.loading ? (
                <Activity className="w-5 h-5 animate-spin" />
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
