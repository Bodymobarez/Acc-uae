
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, SupportedLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen }) => {
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Hamburger menu for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-secondary-600 hover:text-primary-500 focus:outline-none md:hidden"
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Search (optional) - can be expanded later */}
      <div className="relative hidden md:block">
        {/* 
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-secondary-400" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
        <input
          type="text"
          placeholder={t('common.search')}
          className="w-full py-2 ps-10 pe-4 text-secondary-700 bg-secondary-100 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        /> 
        */}
      </div>
      
      <div className="flex items-center space-x-4 rtl:space-x-reverse ms-auto">
        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="p-2 text-secondary-500 hover:text-primary-500 rounded-full hover:bg-primary-100 focus:outline-none focus:bg-primary-100 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M7.75 2.75a.75.75 0 00-1.5 0V3.5h-.216c-2.015 0-3.82.962-4.998 2.537A.75.75 0 001.75 7H3c.048 0 .095-.009.14-.026A4.002 4.002 0 016.932 5H9.5V3.657a2.667 2.667 0 01-.75-.087V2.75zM10.25 2.75a.75.75 0 00-1.5 0V3.5H9.5A2.5 2.5 0 007 6.032V7.5H2.75A.75.75 0 002 8.25v5.5a.75.75 0 00.75.75H4.5v.917c0 .414.336.75.75.75h1.25a.75.75 0 00.75-.75V14.5h1.5v.917a.75.75 0 00.75.75h1.25a.75.75 0 00.75-.75V14.5H13a2.5 2.5 0 012.5-2.5h.216c2.015 0 3.82-.962 4.998-2.537a.75.75 0 00-.716-1.047H17c-.048 0-.095.009-.14.026A4.002 4.002 0 0113.069 5H10.5V3.657a2.667 2.667 0 00.75-.087V2.75zM8.5 7.5V6.032A2.5 2.5 0 0110.5 3.5h.216a4.002 4.002 0 013.143 1.526.75.75 0 00.67.474H16.25a.75.75 0 00.75-.75V3.657c0-.414-.336-.75-.75-.75h-1.25a.75.75 0 00-.75.75V5H9.084A4.002 4.002 0 015.14 6.974.75.75 0 004.47 7.5H2.75V2.843c0-.414.336-.75.75-.75h1.25a.75.75 0 00.75.75V5h2.916A4.002 4.002 0 0112.36 3.026.75.75 0 0013.03 2.5H14.25c.414 0 .75.336.75.75v4.172A2.5 2.5 0 0112.5 9.5H12c-.398 0-.779-.093-1.125-.268V7.5z"/>
            </svg>
            <span className="ms-1 text-sm font-medium">{language.toUpperCase()}</span>
          </button>
          {langDropdownOpen && (
            <div className="absolute end-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 z-50">
              <button onClick={() => handleLanguageChange('en')} className={`block w-full text-start px-4 py-2 text-sm ${language === 'en' ? 'bg-primary-100 text-primary-700' : 'text-secondary-700 hover:bg-secondary-100'}`}>English</button>
              <button onClick={() => handleLanguageChange('ar')} className={`block w-full text-start px-4 py-2 text-sm ${language === 'ar' ? 'bg-primary-100 text-primary-700' : 'text-secondary-700 hover:bg-secondary-100'}`}>العربية</button>
            </div>
          )}
        </div>

        {/* Notifications Icon (Placeholder) */}
        <button className="p-2 text-secondary-500 hover:text-primary-500 rounded-full hover:bg-primary-100 focus:outline-none focus:bg-primary-100">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 rtl:space-x-reverse focus:outline-none">
            <img
              className="h-9 w-9 rounded-full object-cover"
              src="https://picsum.photos/seed/user1/100/100"
              alt="User avatar"
            />
            <span className="hidden md:inline text-sm font-medium text-secondary-700">{t('common.admin_user')}</span>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-secondary-400 hidden md:inline">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute end-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link to="/profile" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-100">{t('common.profile')}</Link>
              <Link to="/settings" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-100">{t('common.settings')}</Link>
              <button className="block w-full text-start px-4 py-2 text-sm text-secondary-700 hover:bg-primary-100">{t('common.logout')}</button>
            </div> 
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;