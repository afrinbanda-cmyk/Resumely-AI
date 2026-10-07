import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import ThemeToggle from '../components/common/ThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('alex.johnson@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    // Navigate directly to dashboard
    navigate('/dashboard');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] dark:bg-[#14110E] text-[#231B15] dark:text-[#FAF5EE] flex flex-col justify-between p-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
        <Logo size="md" to="/" />
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full mx-auto my-12 bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#E39A7B]/15 text-[#E39A7B] flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#231B15] dark:text-[#FAF5EE]">
            Welcome to Resumely AI
          </h2>
          <p className="text-xs text-[#73675F] dark:text-[#BAADA0]">
            Sign in to access your saved resumes and AI recommendations
          </p>
        </div>

        {/* 1-Click Demo User shortcut */}
        <div className="p-3.5 rounded-2xl bg-[#FAF0E6] dark:bg-[#28201A] border border-[#E39A7B]/30 space-y-2">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#E39A7B]" />
            <span className="text-xs font-bold text-[#C87553] dark:text-[#F3AB8F]">
              Instant Demo Access
            </span>
          </div>
          <p className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">
            Experience all builder features, AI analysis, templates, and PDF export with preloaded sample data.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDemoLogin}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="w-full text-xs font-semibold"
          >
            Continue as Demo User (Alex Johnson)
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[#E8DFD3] dark:border-[#352C25]" />
          <span className="absolute px-3 bg-white dark:bg-[#1E1A16] text-[11px] font-semibold text-[#9E9187] uppercase tracking-wider">
            or sign in with email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>
          </div>

          <Button type="submit" variant="secondary" size="md" className="w-full font-semibold">
            Sign In with Demo Credentials
          </Button>
        </form>

        <p className="text-[11px] text-center text-[#9E9187]">
          Pure client-side application. No real credentials or authentication required.
        </p>
      </div>

      <div className="text-center text-xs text-[#73675F] dark:text-[#BAADA0]">
        <Link to="/" className="hover:text-[#E39A7B]">← Back to Resumely AI Home</Link>
      </div>
    </div>
  );
}
