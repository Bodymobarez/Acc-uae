
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Column<T> {
  Header: string; // Will now be a translation key
  accessor: keyof T | ((row: T) => React.ReactNode);
  Cell?: (value: any, row: T) => React.ReactNode; 
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  renderRowActions?: (row: T) => React.ReactNode; 
  isLoading?: boolean;
  emptyStateMessage?: string; // Translation key or direct message
}

const Table = <T extends { id: string | number },>(
  { columns, data, onRowClick, renderRowActions, isLoading = false, emptyStateMessage = "common.no_data_available" }: TableProps<T>
): React.ReactElement => {
  const { t, language } = useLanguage();
  
  if (isLoading) {
    return (
        <div className="flex justify-center items-center p-10 text-secondary-500">
            <svg className="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ms-3">{t('common.loading')}</span>
        </div>
    );
  }

  const finalEmptyStateMessage = emptyStateMessage.startsWith("common.") ? t(emptyStateMessage as any) : emptyStateMessage;
  if (!data || data.length === 0) {
    return <div className="text-center py-10 text-secondary-500">{finalEmptyStateMessage}</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-secondary-200">
        <thead className="bg-secondary-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-start text-xs font-medium text-secondary-500 uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {t(column.Header as any)}
              </th>
            ))}
            {renderRowActions && (
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-secondary-500 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-secondary-200">
          {data.map((row) => (
            <tr 
              key={row.id} 
              className={`${onRowClick ? 'hover:bg-secondary-50 cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column, index) => {
                const value = typeof column.accessor === 'function'
                  ? column.accessor(row)
                  // @ts-ignore Property 'accessor' comes from an index signature, so it must be accessed with ['accessor'].
                  : row[column.accessor];
                return (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700 text-start">
                    {column.Cell ? column.Cell(value, row) : (typeof value === 'boolean' ? (value ? t('common.active') : t('common.inactive')) : value as React.ReactNode)}
                  </td>
                );
              })}
              {renderRowActions && (
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium space-x-2 rtl:space-x-reverse">
                  {renderRowActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;