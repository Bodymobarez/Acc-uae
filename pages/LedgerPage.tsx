
import React, { useState, useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import Select from '../components/common/Select';
import Card from '../components/common/Card';
import { Account, AccountType, JournalEntry, JournalEntryDetail } from '../types';
import { mockAccounts, mockJournalEntries } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface LedgerEntry extends JournalEntryDetail {
  date: string;
  description: string;
  journalEntryId: string;
  balance: number;
}

interface SelectOption {
  value: string;
  label: string;
}

const LedgerPage: React.FC = () => {
  const { t, language } = useLanguage();
  const locale = language === 'ar' ? 'ar-AE' : 'en-US';

  const [accounts] = useState<Account[]>(mockAccounts);
  const [journalEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(accounts.length > 0 ? accounts[0].id : '');

  const formatCurrency = (value: number) => value.toLocaleString(locale, { minimumFractionDigits:2, maximumFractionDigits:2 });
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(locale);

  const accountOptions: SelectOption[] = accounts.map((acc): SelectOption => ({ value: acc.id, label: `${acc.code} - ${acc.name}` }));

  const ledgerData = useMemo(() => {
    if (!selectedAccountId) return [];
    
    const selectedAccount = accounts.find(acc => acc.id === selectedAccountId);
    if (!selectedAccount) return [];

    const entries: LedgerEntry[] = [];
    let currentBalance = 0; 

    journalEntries
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) 
      .forEach(je => {
        je.details.forEach(detail => {
          if (detail.accountId === selectedAccountId) {
            const change = detail.debit - detail.credit;
            if (selectedAccount.type === AccountType.ASSET || selectedAccount.type === AccountType.EXPENSE) {
                currentBalance += change;
            } else {
                currentBalance -= change; 
            }

            entries.push({
              ...detail,
              date: je.date,
              description: je.description,
              journalEntryId: je.id,
              balance: currentBalance,
            });
          }
        });
      });
    return entries;
  }, [selectedAccountId, accounts, journalEntries]);
  
  const selectedAccountDetails = accounts.find(acc => acc.id === selectedAccountId);
  const finalBalance = ledgerData.length > 0 ? ledgerData[ledgerData.length-1].balance : 0;

  return (
    <div>
      <PageHeader title={t('ledger.pageTitle')} subtitle={t('ledger.pageSubtitle')} />

      <Card className="mb-6">
        <Select
          label={t('ledger.selectAccount')}
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          options={accountOptions}
          wrapperClassName="max-w-md"
        />
      </Card>

      {selectedAccountDetails && (
        <Card title={t('ledger.ledgerFor', { accountName: selectedAccountDetails.name, accountCode: selectedAccountDetails.code })}>
          {ledgerData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-4 py-2 text-start text-xs font-medium text-secondary-500 uppercase">{t('common.date')}</th>
                    <th className="px-4 py-2 text-start text-xs font-medium text-secondary-500 uppercase">{t('common.description')}</th>
                    <th className="px-4 py-2 text-start text-xs font-medium text-secondary-500 uppercase">{t('ledger.jeRef')}</th>
                    <th className="px-4 py-2 text-end text-xs font-medium text-secondary-500 uppercase">{t('journalEntries.debitAed')}</th>
                    <th className="px-4 py-2 text-end text-xs font-medium text-secondary-500 uppercase">{t('journalEntries.creditAed')}</th>
                    <th className="px-4 py-2 text-end text-xs font-medium text-secondary-500 uppercase">{t('ledger.balanceAed')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {ledgerData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700">{formatDate(entry.date)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700">{entry.description}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700">{entry.journalEntryId.substring(0,8)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700 text-end">{entry.debit > 0 ? formatCurrency(entry.debit) : '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700 text-end">{entry.credit > 0 ? formatCurrency(entry.credit) : '-'}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary-700 text-end font-semibold">{formatCurrency(entry.balance)}</td>
                    </tr>
                  ))}
                </tbody>
                 <tfoot className="bg-secondary-100">
                    <tr>
                        <td colSpan={5} className="px-4 py-2 text-end text-sm font-bold text-secondary-800">{t('ledger.endingBalance')}</td>
                        <td className="px-4 py-2 text-end text-sm font-bold text-secondary-800">{formatCurrency(finalBalance)}</td>
                    </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p className="text-secondary-500 p-4 text-center">{t('ledger.no_transactions_found')}</p>
          )}
        </Card>
      )}
    </div>
  );
};

export default LedgerPage;
