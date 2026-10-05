import React from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { DemoStateProvider, useDemoState } from './context/DemoStateContext';
import { Header } from './components/Header';
import { GuidedDemoBar } from './components/GuidedDemoBar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/Toast';

// Customer Views
import { CustomerHelpCenter } from './views/CustomerHelpCenter';
import { CustomerArticleView } from './views/CustomerArticleView';
import { CustomerCreateTicket } from './views/CustomerCreateTicket';
import { CustomerTicketSuccess } from './views/CustomerTicketSuccess';
import { CustomerMyTickets } from './views/CustomerMyTickets';
import { CustomerTicketDetail } from './views/CustomerTicketDetail';

// Provider Views
import { ProviderDashboard } from './views/ProviderDashboard';
import { ProviderTicketQueue } from './views/ProviderTicketQueue';
import { ProviderTicketDetail } from './views/ProviderTicketDetail';
import { ProviderAdminView } from './views/ProviderAdminView';

// Engineering Views
import { EngineeringQueueView } from './views/EngineeringQueueView';

import './styles/global.css';

const MainViewRenderer: React.FC = () => {
  const { role, activeView } = useDemoState();

  if (role === 'engineering') {
    return <EngineeringQueueView />;
  }

  if (role === 'agent' || role === 'manager') {
    switch (activeView) {
      case 'provider-dashboard':
        return <ProviderDashboard />;
      case 'provider-queue':
        return <ProviderTicketQueue />;
      case 'provider-ticket-detail':
        return <ProviderTicketDetail />;
      case 'provider-admin':
        return <ProviderAdminView />;
      default:
        return <ProviderDashboard />;
    }
  }

  // Customer Role Views
  switch (activeView) {
    case 'help-center':
      return <CustomerHelpCenter />;
    case 'article-detail':
      return <CustomerArticleView />;
    case 'raise-ticket':
      return <CustomerCreateTicket />;
    case 'ticket-success':
      return <CustomerTicketSuccess />;
    case 'my-tickets':
      return <CustomerMyTickets />;
    case 'customer-ticket-detail':
      return <CustomerTicketDetail />;
    default:
      return <CustomerHelpCenter />;
  }
};

const AppContent: React.FC = () => {
  const { role } = useDemoState();
  const isCustomer = role === 'customer';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Render Sidebar ONLY for non-customer roles as requested */}
      {!isCustomer && <Sidebar />}

      {/* Right Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Primary Navigation Header */}
        <Header />

        {/* Dynamic View Content */}
        <main className="flex-1">
          <MainViewRenderer />
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ConfigProvider>
      <DemoStateProvider>
        <AppContent />
      </DemoStateProvider>
    </ConfigProvider>
  );
}

export default App;
