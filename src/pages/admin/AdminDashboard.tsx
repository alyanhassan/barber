import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2, LogOut, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookings(data as Booking[]);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus as Booking['status'] } : b));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (!error) {
        setBookings(bookings.filter(b => b.id !== id));
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'confirmed': return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'completed': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'cancelled': return 'bg-red-500/20 text-red-500 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Blade & Co.</title>
      </Helmet>
      <div className="min-h-screen bg-background text-text-primary p-6 md:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-heading text-primary">Admin Dashboard</h1>
              <p className="text-text-muted mt-1">Manage your bookings</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-white/10 rounded hover:border-primary hover:text-primary transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#111111] border border-white/10 p-6 rounded-lg text-center">
              <div className="text-3xl font-heading text-primary mb-1">{stats.total}</div>
              <div className="text-sm text-text-muted uppercase tracking-wider">Total</div>
            </div>
            <div className="bg-[#111111] border border-white/10 p-6 rounded-lg text-center">
              <div className="text-3xl font-heading text-yellow-500 mb-1">{stats.pending}</div>
              <div className="text-sm text-text-muted uppercase tracking-wider">Pending</div>
            </div>
            <div className="bg-[#111111] border border-white/10 p-6 rounded-lg text-center">
              <div className="text-3xl font-heading text-green-500 mb-1">{stats.confirmed}</div>
              <div className="text-sm text-text-muted uppercase tracking-wider">Confirmed</div>
            </div>
            <div className="bg-[#111111] border border-white/10 p-6 rounded-lg text-center">
              <div className="text-3xl font-heading text-blue-500 mb-1">{stats.completed}</div>
              <div className="text-sm text-text-muted uppercase tracking-wider">Completed</div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              ) : bookings.length === 0 ? (
                <div className="p-12 text-center text-text-muted">
                  No bookings yet.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-background/50 border-b border-white/10 text-sm text-text-muted uppercase tracking-wider">
                      <th className="p-4 font-medium">Date/Time</th>
                      <th className="p-4 font-medium">Client</th>
                      <th className="p-4 font-medium">Service</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-white/5 hover:bg-background/30 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-text-primary">{booking.date}</div>
                          {booking.time && <div className="text-sm text-text-muted">{booking.time}</div>}
                          <div className="text-xs text-text-muted mt-1">
                            Booked: {new Date(booking.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-text-primary">{booking.name}</div>
                          <div className="text-sm text-text-muted">{booking.email}</div>
                          <div className="text-sm text-text-muted">{booking.phone}</div>
                          {booking.message && (
                            <div className="text-xs text-text-muted italic mt-1 max-w-[200px] truncate" title={booking.message}>
                              "{booking.message}"
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-text-primary">{booking.service}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer outline-none ${getStatusColor(booking.status)} appearance-none text-center`}
                            style={{ textAlignLast: 'center' }}
                          >
                            <option className="bg-[#111111] text-text-primary" value="pending">Pending</option>
                            <option className="bg-[#111111] text-text-primary" value="confirmed">Confirmed</option>
                            <option className="bg-[#111111] text-text-primary" value="completed">Completed</option>
                            <option className="bg-[#111111] text-text-primary" value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="p-2 text-text-muted hover:text-red-500 transition-colors"
                            title="Delete booking"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
