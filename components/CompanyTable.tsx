'use client';

import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { Button } from 'flowbite-react';
import { CompanyData } from '@/types/company';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface CompanyTableProps {
  companies: CompanyData[];
  onAddEntry?: () => void;
  onResetData?: () => void;
}

export function CompanyTable({ companies, onAddEntry, onResetData }: CompanyTableProps) {
  // Column definitions with useMemo to prevent unnecessary re-renders
  const columnDefs = useMemo<ColDef<CompanyData>[]>(
    () => [
      { field: 'company', headerName: 'Company', sortable: true, filter: true },
      { field: 'country', headerName: 'Country', sortable: true, filter: true },
      { field: 'state', headerName: 'State', sortable: true, filter: true },
      { field: 'city', headerName: 'City', sortable: true, filter: true },
      { field: 'zipcode', headerName: 'Zipcode', sortable: true, filter: true },
      {
        field: 'employees',
        headerName: 'Employees',
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) => params.value?.toLocaleString() ?? '',
      },
      {
        field: 'revenue',
        headerName: 'Revenue',
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) =>
          params.value ? `$${params.value.toLocaleString()}` : '',
      },
      { field: 'website', headerName: 'Website', sortable: true, filter: true },
      { field: 'sales_rep', headerName: 'Sales Rep', sortable: true, filter: true },
      {
        field: 'last_contacted',
        headerName: 'Last Contacted',
        sortable: true,
        filter: 'agDateColumnFilter',
      },
      {
        field: 'purchased',
        headerName: 'Purchased',
        sortable: true,
        filter: true,
        cellRenderer: (params: { value: boolean }) => (params.value ? '✓' : '✗'),
      },
    ],
    []
  );

  // Default column configuration with useMemo
  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      minWidth: 0,
    }),
    []
  );

  // Row data memoized to prevent unnecessary re-renders
  const rowData = useMemo(() => companies, [companies]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header with Action Buttons */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Company Data ({companies.length} entries)
        </h3>
        <div className="flex gap-2">
          {onResetData && (
            <Button onClick={onResetData} size="sm" color="failure">
              Reset Data
            </Button>
          )}
          {onAddEntry && (
            <Button onClick={onAddEntry} size="sm">
              Add Entry
            </Button>
          )}
        </div>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine flex-1" style={{ width: '100%', minHeight: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
        />
      </div>
    </div>
  );
}
