import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { INITIAL_ARTICLES } from '../data/mockData';
import { ArrowLeft, ThumbsUp, ThumbsDown, BookOpen, Clock, Tag, MessageSquare, LifeBuoy } from 'lucide-react';

export const CustomerArticleView: React.FC = () => {
  const { selectedArticleId, setActiveView, addToast } = useDemoState();
  const [voted, setVoted] = useState<boolean>(false);

  const article = INITIAL_ARTICLES.find(a => a.id === selectedArticleId) || INITIAL_ARTICLES[0];

  const handleVote = (isHelpful: boolean) => {
    if (voted) return;
    setVoted(true);
    addToast('success', 'Feedback Submitted', isHelpful ? 'Thank you! Marked as helpful.' : 'Thank you for your feedback.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Back */}
        <button
          onClick={() => setActiveView('help-center')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Help Center Home
        </button>

        {/* Article Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10 space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 font-semibold text-xs px-2.5 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock size={13} />
                {article.readTime}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Updated {article.lastUpdated}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h1>

            <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {article.summary}
            </p>
          </div>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-800 text-sm md:text-base leading-relaxed space-y-4">
            <h3 className="text-lg font-bold text-slate-900">1. Statutory Tax Rules in Sixtify</h3>
            <p>
              Professional Tax (PT) is calculated automatically based on state-specific earnings brackets established by local municipal tax authorities. 
              When processing monthly payroll for employee records like <strong>John Doe (EMP-1042)</strong>, the calculation engine inspects gross taxable wages earned during the active pay period.
            </p>

            <h3 className="text-lg font-bold text-slate-900">2. Professional Tax Slab Limits</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Monthly Gross Wages &lt; ₹15,000 → PT: ₹0</li>
              <li>Monthly Gross Wages ₹15,000 – ₹25,000 → PT: ₹1,500</li>
              <li>Monthly Gross Wages &gt; ₹25,000 → Standard PT Cap: <strong>₹2,500 / month</strong></li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl my-4 text-xs md:text-sm text-amber-900 leading-relaxed">
              <strong>Important Notice:</strong> If an employee shows an unexpected deduction variance (e.g. ₹3,100 instead of ₹2,500), verify whether a dual-state jurisdiction rule or retroactive tax recalculation was inadvertently applied during batch lock.
            </div>

            <h3 className="text-lg font-bold text-slate-900">3. Resolving Formula Discrepancies</h3>
            <p>
              If your audit reveals a software calculation engine anomaly that cannot be adjusted via standard tax templates, please submit a support ticket attaching the monthly salary slip or calculation report.
            </p>
          </div>

          {/* Article Footer & Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={15} className="text-slate-400" />
              {article.tags.map((tag, i) => (
                <span key={i} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-md font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Voting Component */}
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-700">Was this article helpful?</span>
              <button
                onClick={() => handleVote(true)}
                disabled={voted}
                className={`p-1.5 rounded-lg transition-colors ${voted ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'}`}
              >
                <ThumbsUp size={16} />
              </button>
              <button
                onClick={() => handleVote(false)}
                disabled={voted}
                className={`p-1.5 rounded-lg transition-colors ${voted ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'}`}
              >
                <ThumbsDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Create Support Request Callout */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <LifeBuoy size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Did not solve your issue?</h4>
              <p className="text-xs text-slate-500">Raise a support request directly with the Sixtify Payroll Support team.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('raise-ticket')}
            className="btn btn-primary text-xs shrink-0"
            id="article-view-create-ticket-btn"
          >
            Create Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
