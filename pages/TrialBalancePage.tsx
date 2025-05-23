
import React, { useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import { Account, AccountType, JournalEntry } from '../types';
import { mockAccounts, mockJournalEntries } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface TrialBalanceRow {
  accountId: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  debit: number;
  credit: number;
}

const TrialBalancePage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';
  const formatCurrency = (value: number) => value.toLocaleString(locale, { minimumFractionDigits:2, maximumFractionDigits:2 });

  const trialBalanceData = useMemo(() => {
    const accountBalances: Record<string, { debit: number, credit: number, type: AccountType }> = {};

    mockAccounts.forEach(acc => {
      accountBalances[acc.id] = { debit: 0, credit: 0, type: acc.type };
    });
    
    mockJournalEntries.forEach(je => {
      je.details.forEach(detail => {
        if (accountBalances[detail.accountId]) {
          accountBalances[detail.accountId].debit += detail.debit;
          accountBalances[detail.accountId].credit += detail.credit;
        }
      });
    });

    const rows: TrialBalanceRow[] = mockAccounts.map(acc => {
      const balanceInfo = accountBalances[acc.id];
      let finalDebit = 0;
      let finalCredit = 0;
      
      const netChange = balanceInfo.debit - balanceInfo.credit;

      if (acc.type === AccountType.ASSET || acc.type === AccountType.EXPENSE) {
        if (netChange > 0) finalDebit = netChange;
        else finalCredit = -netChange; 
      } else { 
        if (netChange < 0) finalCredit = -netChange;
        else finalDebit = netChange; 
      }
      
      if (finalDebit !== 0 || finalCredit !== 0) {
        return {
          accountId: acc.id,
          accountCode: acc.code,
          accountName: acc.name,
          accountType: acc.type,
          debit: finalDebit,
          credit: finalCredit,
        };
      }
      return null;
    }).filter(row => row !== null) as TrialBalanceRow[];

    return rows.sort((a,b) => a.accountCode.localeCompare(b.accountCode));
  }, []);

  const totalDebits = trialBalanceData.reduce((sum, row) => sum + row.debit, 0);
  const totalCredits = trialBalanceData.reduce((sum, row) => sum + row.credit, 0);
  const reportDate = new Date().toLocaleDateString(locale);

  return (
    <div>
      <PageHeader title={t('trialBalance.pageTitle')} subtitle={t('trialBalance.pageSubtitle', { date: reportDate })} />
      <Card>
        {trialBalanceData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-4 py-2 text-start text-xs font-medium text-secondary-500 uppercase">{t('trialBalance.code')}</th>
                  <th className="px-4 py-2 text-start text-xs font-medium text-secondary-500 uppercase">{t('trialBalance.accountName')}</th>
                  <th className="px-4 py-2 text-start text-xs font-medium text-secondary-500 uppercase">{t('common.type')}</th>
                  <th className="px-4 py-2 text-end text-xs font-medium text-secondary-500 uppercase">{t('journalEntries.debitAed')}</th>
                  <th className="px-4 py-2 text-end text-xs font-medium text-secondary-500 uppercase">{t('journalEntries.creditAed')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {trialBalanceData.map((row) => (
                  <tr key={row.accountId}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700">{row.accountCode}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700">{row.accountName}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700">{row.accountType}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700 text-end">
                      {row.debit !== 0 ? formatCurrency(row.debit) : '-'}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700 text-end">
                      {row.credit !== 0 ? formatCurrency(row.credit) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-secondary-100 border-t-2 border-secondary-300">
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-end text-sm font-bold text-secondary-800">{t('trialBalance.totals')}</td>
                  <td className="px-4 py-2 text-end text-sm font-bold text-secondary-800">{formatCurrency(totalDebits)}</td>
                  <td className="px-4 py-2 text-end text-sm font-bold text-secondary-800">{formatCurrency(totalCredits)}</td>
                </tr>
                {totalDebits !== totalCredits && (
                    <tr>
                        <td colSpan={5} className="px-4 py-1 text-center text-sm font-semibold text-red-600 bg-red-50">
                            {t('trialBalance.warning_mismatch', { difference: formatCurrency(totalDebits - totalCredits) })}
                        </td>
                    </tr>
                )}
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="text-secondary-500 p-4 text-center">{t('trialBalance.no_balances_to_display')}</p>
        )}
      </Card>
      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded-md">
        <p className="font-bold">{t('common.notes')}:</p>
        <p>{t('trialBalance.note_simplified')}</p>
      </div>
    </div>
  );
};

export default TrialBalancePage;
