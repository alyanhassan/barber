import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Blade & Co.</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md bg-[#111111] border border-white/10 p-8 rounded-lg shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading text-primary mb-2">Admin Panel</h1>
            <p className="text-text-muted">Sign in to access dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full bg-background border border-white/10 rounded px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full bg-background border border-white/10 rounded px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-background font-bold py-3 px-4 rounded hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
