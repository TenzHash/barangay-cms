import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface LoginProps {
  onSessionSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSessionSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    try {
      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      if (data.session) {
        onSessionSuccess();
      }
    } catch (err: any) {
      setErrorMsg(
        err.message ||
          "Maling impormasyon. Pakisuri ang iyong email at password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">
        {/* Portal Branding Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gov-navy text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md">
            RP
          </div>
          <div>
            <h2 className="text-lg font-bold text-gov-darkText tracking-tight">
              Barangay CMS Management Portal
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Authorized Personnel Authentication Access Gate
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-lg font-medium leading-relaxed animate-shake">
            {errorMsg}
          </div>
        )}

        {/* Access Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Official Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@barangay.gov.ph"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-gov-blue font-medium transition-colors"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Secure System Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-gov-blue tracking-widest transition-colors"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gov-navy hover:bg-gov-blue text-white font-semibold py-3 rounded-lg shadow-md transition-all uppercase tracking-wider text-[11px] mt-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading
              ? "Verifying Credentials Security Token..."
              : "Authenticate Access"}
          </button>
        </form>

        <div className="text-center pt-2 border-t text-[10px] text-slate-400">
          Security Protocol: Access tokens lapse after periods of terminal
          inactivity.
        </div>
      </div>
    </div>
  );
};
