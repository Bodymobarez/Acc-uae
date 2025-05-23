
import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import { mockBookings, mockClients, mockFinancialTransactions } from '../data/mockData';
import { BookingStatus, TransactionType } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const StatCard: React.FC<{ titleKey: string; value: string | number; icon: React.ReactNode; color: string }> = ({ titleKey, value, icon, color }) => {
  const { t } = useLanguage();
  return (
    <Card className={`border-s-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-500 uppercase tracking-wider">{t(titleKey as any)}</p>
          <p className="text-2xl font-semibold text-secondary-800">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-opacity-20 ${color.replace('border', 'bg').replace('-s-4', '')}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

const IconCurrency = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>;
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.098a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-4.098m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0v6.75A2.25 2.25 0 0118 22.5h-12a2.25 2.25 0 01-2.25-2.25V14.15m16.5 0a10.5 10.5 0 00-9-9.318V3.75a1.125 1.125 0 00-2.25 0v1.082A10.5 10.5 0 003.75 14.15m16.5 0Z" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>;


const DashboardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalNetProfit = mockBookings.reduce((sum, booking) => sum + booking.netProfit, 0);
  const activeBookings = mockBookings.filter(b => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.PENDING).length;
  const totalClients = mockClients.length;

  const recentTransactions = [...mockFinancialTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const monthlySalesData = mockBookings.reduce((acc, booking) => {
    const month = new Date(booking.bookingDate).toLocaleString(locale, { month: 'short' });
    acc[month] = (acc[month] || 0) + booking.totalPrice;
    return acc;
  }, {} as Record<string, number>);
  
  const chartData = Object.entries(monthlySalesData).map(([name, sales]) => ({ name, sales }));

  const bookingStatusData = Object.values(BookingStatus).map(status => ({
    name: t(`bookings.${status.toLowerCase()}` as any) || status, // Translate status names
    value: mockBookings.filter(b => b.status === status).length
  })).filter(d => d.value > 0);

  const PIE_COLORS = ['#0ea5e9', '#3b82f6', '#ec4899', '#f97316', '#10b981'];

  const formatCurrency = (value: number) => {
    return value.toLocaleString(locale, { style: 'currency', currency: 'AED', minimumFractionDigits:0, maximumFractionDigits:0 }).replace('AED', t('common.amount_aed').split(' ')[1]);
  }
  const formatNumber = (value: number) => value.toLocaleString(locale);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale);


  return (
    <div>
      <PageHeader title={t('common.dashboard')} subtitle={t('dashboard.welcome')} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard titleKey="common.total_revenue" value={`${formatCurrency(totalRevenue)}`} icon={<IconCurrency />} color="border-primary-500" />
        <StatCard titleKey="common.net_profit" value={`${formatCurrency(totalNetProfit)}`} icon={<IconTrendingUp />} color="border-green-500" />
        <StatCard titleKey="common.active_bookings" value={formatNumber(activeBookings)} icon={<IconBriefcase />} color="border-accent-500" />
        <StatCard titleKey="common.total_clients" value={formatNumber(totalClients)} icon={<IconUsers />} color="border-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card title={t('common.monthly_sales_overview')} className="lg:col-span-2">
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: language === 'ar' ? 0 : 20, left: language === 'ar' ? 20 : -20, bottom: 5 }} layout={language === 'ar' ? 'vertical' : 'horizontal'}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                {language === 'ar' ? (
                    <>
                        <XAxis type="number" tickFormatter={(value: number) => `${value/1000}k`} tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <YAxis type="category" dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} width={80} />
                    </>
                ) : (
                    <>
                        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <YAxis tickFormatter={(value: number) => `${t('common.amount_aed').split(' ')[1]} ${value/1000}k`} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    </>
                )}
                <Tooltip formatter={(value: number) => [formatCurrency(value), t('bookings.totalPrice')]} />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title={t('common.booking_status')}>
          <div style={{ height: '300px' }}>
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name: string; percent: number }) => `${name} ${formatNumber(parseFloat((percent * 100).toFixed(0)))}%`}
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`${formatNumber(value)} ${t('common.bookings').toLowerCase()}`, name]}/>
                <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <Card title={t('common.recent_transactions')}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-secondary-200">
              <tr>
                <th className="text-start py-2 px-3 text-xs font-medium text-secondary-500 uppercase">{t('common.date')}</th>
                <th className="text-start py-2 px-3 text-xs font-medium text-secondary-500 uppercase">{t('common.type')}</th>
                <th className="text-start py-2 px-3 text-xs font-medium text-secondary-500 uppercase">{t('common.party')}</th>
                <th className="text-start py-2 px-3 text-xs font-medium text-secondary-500 uppercase">{t('common.amount_aed')}</th>
                <th className="text-start py-2 px-3 text-xs font-medium text-secondary-500 uppercase">{t('common.description')}</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(tx => (
                <tr key={tx.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                  <td className="py-3 px-3 text-sm text-secondary-700">{formatDate(tx.date)}</td>
                  <td className="py-3 px-3 text-sm text-secondary-700">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      tx.type === TransactionType.COLLECTION ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {tx.type === TransactionType.COLLECTION ? t('common.collections') : t('common.payments')}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-sm text-secondary-700">{tx.partyName}</td>
                  <td className="py-3 px-3 text-sm text-secondary-700">{formatNumber(tx.amount)}</td>
                  <td className="py-3 px-3 text-sm text-secondary-700 truncate max-w-xs">{tx.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};

export default DashboardPage;