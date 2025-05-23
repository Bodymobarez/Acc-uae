
import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import { useLanguage } from '../contexts/LanguageContext';

interface ReportLink {
  titleKey: string;
  descriptionKey: string;
  path: string;
  icon: React.ReactNode;
}

const IconChartBar = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
const IconDocumentText = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.125 11.25H12m0 0H9.75M12 15.75V13.5m0 0V11.25m0 2.25H14.25m-2.25 0H9.75M7.5 21H3.375c-.621 0-1.125-.504-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125V21H7.5zm12 0h-4.5c-.621 0-1.125-.504-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125V21H19.5z" /></svg>;
const IconScale = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.286-2.032m-17.25 0l2.286 2.032m12.75 0A48.416 48.416 0 0112 4.5c2.291 0 4.545.16 6.75.47M5.25 4.97A48.416 48.416 0 0112 4.5c-2.291 0-4.545.16-6.75.47m13.5 0l-2.286 2.032" /></svg>;
const IconCollection = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary-600"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;


const reportLinks: ReportLink[] = [
  {
    titleKey: 'common.generalLedger',
    descriptionKey: 'ledger.pageSubtitle',
    path: '/ledger',
    icon: <IconDocumentText />,
  },
  {
    titleKey: 'common.trialBalance',
    descriptionKey: 'trialBalance.reportDesc',
    path: '/trial-balance',
    icon: <IconScale />,
  },
  {
    titleKey: 'reports.profit_loss_title',
    descriptionKey: 'reports.profit_loss_desc',
    path: '/reports/profit-loss', 
    icon: <IconChartBar />,
  },
  {
    titleKey: 'reports.balance_sheet_title',
    descriptionKey: 'reports.balance_sheet_desc',
    path: '/reports/balance-sheet', 
    icon: <IconCollection />,
  },
  {
    titleKey: 'reports.commission_report_title',
    descriptionKey: 'reports.commission_report_desc',
    path: '/reports/commission', 
    icon: <IconUsers />, 
  },
   {
    titleKey: 'reports.vat_report_title',
    descriptionKey: 'reports.vat_report_desc',
    path: '/reports/vat-uae', 
    icon: <IconDocumentText />, 
  },
];

const ReportsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div>
      <PageHeader title={t('reports.pageTitle')} subtitle={t('reports.pageSubtitle')} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportLinks.map((report) => (
          <Link key={report.path} to={report.path}>
            <Card className="hover:shadow-xl transition-shadow duration-200 ease-in-out h-full flex flex-col">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-lg">
                  {report.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-800">{t(report.titleKey as any)}</h3>
                  <p className="mt-1 text-sm text-secondary-600">{t(report.descriptionKey as any)}</p>
                </div>
              </div>
               <div className="mt-auto pt-4 text-end rtl:text-start">
                  <span className="text-sm text-primary-600 hover:text-primary-700 font-medium">{t('reports.view_report_link')}</span>
                </div>
            </Card>
          </Link>
        ))}
      </div>
       <div className="mt-8 p-4 bg-yellow-50 border-s-4 border-yellow-400 text-yellow-700 rounded-md">
        <p className="font-bold">{t('reports.note_placeholder_title')}</p>
        <p>{t('reports.note_placeholder')}</p>
      </div>
    </div>
  );
};

export default ReportsPage;
