'use client';

import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { CompanyData } from '@/types/company';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface CompanyTableProps {
  companies: CompanyData[];
}

export function CompanyTable({ companies }: CompanyTableProps) {
  // Column definitions with useMemo to prevent unnecessary re-renders
  const columnDefs = useMemo<ColDef<CompanyData>[]>(
    () => [
      { field: 'company', headerName: 'Company', sortable: true, filter: true, flex: 1 },
      { field: 'country', headerName: 'Country', sortable: true, filter: true, flex: 1 },
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
      { field: 'website', headerName: 'Website', sortable: true, filter: true, flex: 1 },
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
      { field: 'notes', headerName: 'Notes', sortable: true, filter: true, flex: 2 },
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
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        animateRows={true}
      />
    </div>
  );
}
