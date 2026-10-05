import React from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useDemoState();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />;
            case 'warning':
              return <AlertTriangle className="text-amber-500 shrink-0" size={18} />;
            case 'error':
              return <XCircle className="text-rose-500 shrink-0" size={18} />;
            default:
              return <Info className="text-blue-500 shrink-0" size={18} />;
          }
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-slate-200 rounded-xl p-3.5 shadow-lg flex items-start gap-3 animate-fade-in border-l-4 border-l-blue-600"
          >
            {getIcon()}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900">{toast.title}</h4>
              {toast.message && <p className="text-xs text-slate-600 mt-0.5 leading-snug">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 shrink-0 p-0.5"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
