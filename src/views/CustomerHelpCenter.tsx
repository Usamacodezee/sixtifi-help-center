import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { INITIAL_ARTICLES } from '../data/mockData';
import { 
  Search, 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  Calendar, 
  Users, 
  TrendingUp, 
  UserPlus, 
  FileText, 
  Layers, 
  ChevronRight,
  LifeBuoy
} from 'lucide-react';

export const CustomerHelpCenter: React.FC = () => {
  const { setActiveView, setSelectedArticleId, setPrefilledCategory } = useDemoState();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const popularArticles = [
    { title: 'How to process monthly payroll', category: 'Payroll', articleId: 'kb-104' },
    { title: 'How are salary deductions calculated?', category: 'Payroll', articleId: 'kb-101' },
    { title: 'How to generate salary slips', category: 'Payroll', articleId: 'kb-105' },
    { title: 'How to configure professional tax', category: 'Payroll', articleId: 'kb-102' },
    { title: 'How to add a new employee', category: 'Employee Management', articleId: 'kb-106' },
    { title: 'How to configure attendance policies', category: 'Attendance', articleId: 'kb-107' }
  ];

  const productCategories = [
    { name: 'Payroll', icon: <DollarSign className="text-blue-600" size={24} />, count: '24 articles' },
    { name: 'Attendance', icon: <Clock className="text-indigo-600" size={24} />, count: '18 articles' },
    { name: 'Leave', icon: <Calendar className="text-emerald-600" size={24} />, count: '14 articles' },
    { name: 'Employee Management', icon: <Users className="text-purple-600" size={24} />, count: '30 articles' },
    { name: 'Performance', icon: <TrendingUp className="text-amber-600" size={24} />, count: '12 articles' },
    { name: 'Recruitment', icon: <UserPlus className="text-rose-600" size={24} />, count: '16 articles' },
    { name: 'Reports', icon: <FileText className="text-cyan-600" size={24} />, count: '20 articles' },
    { name: 'Integrations & API', icon: <Layers className="text-slate-600" size={24} />, count: '15 articles' }
  ];

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setActiveView('article-detail');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Search Hero Header */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="bg-blue-700/60 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-400/30 uppercase tracking-wider inline-block mb-3">
            Sixtify HRMS Customer Help Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            How can we help you today?
          </h1>
          <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto mb-8">
            Search our knowledge base, explore setup guides, or raise a support ticket with Sixtify's payroll specialists.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-2xl shadow-xl p-2 border border-slate-200">
              <Search className="text-slate-400 ml-3 shrink-0" size={22} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(e.target.value.length > 0);
                }}
                placeholder="Search for articles, questions or topics..."
                className="w-full px-3 py-2 text-slate-800 text-sm md:text-base focus:outline-none placeholder-slate-400"
                id="help-center-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Suggested Search Results Dropdown */}
            {isSearching && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 text-left p-4 z-30 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Suggested Knowledge Base Articles
                  </span>
                  <span className="text-xs text-slate-400">Found 3 relevant guides</span>
                </div>

                <div className="space-y-2">
                  <div
                    onClick={() => handleArticleClick('kb-101')}
                    className="p-3 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-blue-100 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm">
                        1. How Salary Deductions Are Calculated
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">Payroll</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      Learn about statutory deductions (PF, PT, TDS) and custom voluntary deductions in Sixtify.
                    </p>
                  </div>

                  <div
                    onClick={() => handleArticleClick('kb-102')}
                    className="p-3 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-blue-100 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm">
                        2. Understanding Professional Tax
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">Tax</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      Step-by-step guide to configuring state-wise Professional Tax slabs and exemption thresholds.
                    </p>
                  </div>

                  <div
                    onClick={() => handleArticleClick('kb-103')}
                    className="p-3 hover:bg-blue-50/80 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-blue-100 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm">
                        3. Troubleshooting Salary Calculation Issues
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded">Troubleshooting</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      Common causes for salary calculation mismatches and steps to audit formulas before locking payroll.
                    </p>
                  </div>
                </div>

                {/* Still Need Help Banner */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="text-amber-500" size={18} />
                    <span className="text-xs font-medium text-slate-700">
                      Articles didn't solve your issue?
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveView('raise-ticket')}
                    className="btn btn-primary btn-sm bg-blue-600 hover:bg-blue-700 border-none text-xs"
                    id="create-ticket-from-search-btn"
                  >
                    Create Support Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Section 1: Popular Articles */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Popular Articles</h2>
              <p className="text-xs text-slate-500">Frequently searched help guides and troubleshooting procedures</p>
            </div>
            <button onClick={() => setIsSearching(true)} className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View all articles <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((art, idx) => (
              <div
                key={idx}
                onClick={() => handleArticleClick(art.articleId)}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {art.category}
                    </span>
                    <BookOpen size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors leading-snug">
                    {art.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Knowledge Base</span>
                  <span className="group-hover:translate-x-1 transition-transform text-blue-600 font-medium">Read article →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Browse by Product */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Browse by Product</h2>
            <p className="text-xs text-slate-500">Explore documentation categorized by Sixtify HRMS modules</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productCategories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setPrefilledCategory(cat.name as any);
                  setActiveView('raise-ticket');
                }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col items-start group"
              >
                <div className="p-2.5 bg-slate-50 rounded-xl mb-3 group-hover:bg-blue-50 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{cat.name}</h3>
                <span className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
                  Raise Request →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Need More Help Banner */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <LifeBuoy size={16} />
              Support Team Standing By
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
              Can't find what you're looking for?
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              If self-service articles don't resolve your issue, our dedicated Sixtify HRMS Support Team is ready to investigate and assist.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => setActiveView('raise-ticket')}
              className="bg-white hover:bg-blue-50 text-blue-900 font-bold px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm md:text-base border border-white"
              id="raise-support-request-btn"
            >
              <span>Raise a Support Request</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
