import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { X, AlertOctagon, HelpCircle, CheckCircle, Star } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
}

export const EscalateTicketModal: React.FC<ModalProps> = ({ isOpen, onClose, ticketId }) => {
  const { escalateTicketToEngineering } = useDemoState();
  const [escalateTo, setEscalateTo] = useState<'L2 Product Support' | 'Payroll Specialist' | 'Engineering'>('Engineering');
  const [reason, setReason] = useState('Software bug');
  const [note, setNote] = useState('Payroll calculation appears to be incorrect for professional tax. Deduction shows ₹3,100 instead of state slab limit ₹2,500.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    escalateTicketToEngineering(ticketId, reason, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-fade-in border border-slate-200">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertOctagon className="text-amber-400" size={20} />
            <h3 className="font-bold text-base">Escalate Ticket {ticketId}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-xs leading-relaxed">
            <strong>Internal Escalation Flow:</strong> Escalating routes the ticket internally to Tier-3 Product Engineering while preserving customer ticket ID <strong>{ticketId}</strong> in "In Progress" status.
          </div>

          <div className="form-group">
            <label className="form-label">Escalate To</label>
            <select
              value={escalateTo}
              onChange={(e) => setEscalateTo(e.target.value as any)}
              className="form-select"
            >
              <option value="L2 Product Support">L2 Product Support</option>
              <option value="Payroll Specialist">Payroll Specialist</option>
              <option value="Engineering">Engineering (Payroll Core Engine Team)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Escalation Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-select"
            >
              <option value="Software bug">Software bug / Calculation Engine Error</option>
              <option value="Configuration issue">Configuration issue</option>
              <option value="Product issue">Product issue</option>
              <option value="Data issue">Data corruption issue</option>
              <option value="Customer environment">Customer environment error</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Escalation Technical Note</label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="form-textarea"
              placeholder="Provide exact technical context, expected vs actual values..."
              required
            />
          </div>

          <div className="flex justify-between items-center gap-3 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-mono">
              Payroll Support → L2 → Engineering
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
              <button type="submit" className="btn btn-primary bg-amber-600 hover:bg-amber-700 border-none">
                Escalate Ticket
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const RequestInfoModal: React.FC<ModalProps> = ({ isOpen, onClose, ticketId }) => {
  const { requestInformation } = useDemoState();
  const [message, setMessage] = useState('Please upload the September payroll calculation report so our team can continue investigating this issue.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestInformation(ticketId, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-fade-in border border-slate-200">
        <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HelpCircle className="text-blue-300" size={20} />
            <h3 className="font-bold text-base">Request Information from Customer</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-3 text-xs">
            This will transition ticket status to <strong>"Waiting for You"</strong> on the customer portal and request file upload or response.
          </div>

          <div className="form-group">
            <label className="form-label">Message / File Request Prompt</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">
              Send Information Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ResolveTicketModal: React.FC<ModalProps> = ({ isOpen, onClose, ticketId }) => {
  const { resolveTicket } = useDemoState();
  const [resolutionType, setResolutionType] = useState<'Product Bug Fixed' | 'Solved' | 'Configuration Updated' | 'Information Provided'>('Product Bug Fixed');
  const [summary, setSummary] = useState('The payroll calculation issue was caused by an incorrect professional tax calculation in the payroll engine. The issue has been fixed and the affected calculation has been corrected.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resolveTicket(ticketId, resolutionType, summary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-fade-in border border-slate-200">
        <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-emerald-300" size={20} />
            <h3 className="font-bold text-base">Resolve Support Ticket {ticketId}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="form-group">
            <label className="form-label">Resolution Type</label>
            <select
              value={resolutionType}
              onChange={(e) => setResolutionType(e.target.value as any)}
              className="form-select"
            >
              <option value="Product Bug Fixed">Product Bug Fixed</option>
              <option value="Solved">Solved</option>
              <option value="Configuration Updated">Configuration Updated</option>
              <option value="Information Provided">Information Provided</option>
              <option value="Duplicate">Duplicate</option>
              <option value="Not Reproducible">Not Reproducible</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Customer Resolution Summary</label>
            <textarea
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-success">
              Mark as Resolved
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CSATModal: React.FC<ModalProps> = ({ isOpen, onClose, ticketId }) => {
  const { submitCSATFeedback } = useDemoState();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('Outstanding support! The support team identified the payroll tax bug, escalated to engineering, and resolved it promptly.');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCSATFeedback(ticketId, rating, comment);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-fade-in border border-slate-200">
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <h3 className="font-bold text-base">Support Experience Feedback</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-lg font-bold text-slate-900">Thank you for your feedback!</h4>
            <p className="text-xs text-slate-500">Your response helps Sixtify continuously improve support quality.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 text-center">
            <div>
              <h4 className="font-bold text-slate-900 text-base">How was your support experience?</h4>
              <p className="text-xs text-slate-500 mt-1">Please rate the assistance received for ticket {ticketId}</p>
            </div>

            {/* Interactive Stars */}
            <div className="flex justify-center items-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hoverRating || rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-amber-600">
              {rating === 5 ? '5 Stars — Extremely Satisfied' : `${rating} Stars`}
            </span>

            <div className="form-group text-left">
              <label className="form-label">How satisfied are you with the support you received?</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-textarea"
                placeholder="Tell us more about your experience..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="btn btn-secondary">Skip</button>
              <button type="submit" className="btn btn-primary">
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
