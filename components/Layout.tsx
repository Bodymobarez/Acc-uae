
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <div className={`flex h-screen bg-secondary-100 font-sans ${language === 'ar' ? 'font-[Tahoma,Arial,sans-serif]' : 'font-sans'}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar setSidebarOpen={setSidebarOpen} />
        {/* Main content padding adjusted based on language, assuming sidebar is always on the 'start' side */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;