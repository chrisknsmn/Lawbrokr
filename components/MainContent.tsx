'use client';

import { useState } from 'react';
import { Spinner, Alert, Button, Modal } from 'flowbite-react';
import { BitcoinPriceChart } from '@/components/BitcoinPriceChart';
import { BitcoinScatterChart } from '@/components/BitcoinScatterChart';
import { CompanyTable } from '@/components/CompanyTable';
import { AddEntryForm } from '@/components/AddEntryForm';
import { useCompanyData } from '@/hooks/useCompanyData';
import { useCompanyStore } from '@/store/companyStore';
import { CompanyFormData } from '@/lib/validations/companySchema';
import { CompanyData } from '@/types/company';

export function MainContent() {
  const { companies, isLoading, error, resetData } = useCompanyData();
  const { addOrUpdateCompany } = useCompanyStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleResetData = async () => {
    setIsResetting(true);
    try {
      await resetData();
      setShowResetModal(false);
    } catch (err) {
      console.error('Error resetting data:', err);
    } finally {
      setIsResetting(false);
    }
  };

  const handleAddEntry = async (formData: CompanyFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const companyData: CompanyData = {
        company: formData.company,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        zipcode: formData.zipcode,
        employees: formData.employees,
        revenue: formData.revenue,
        website: formData.website,
        sales_rep: formData.sales_rep,
        last_contacted: formData.last_contacted,
        purchased: formData.purchased,
        notes: formData.notes || '',
      };

      const result = addOrUpdateCompany(companyData);

      if (result.wasUpdated) {
        setSubmitMessage({
          type: 'success',
          text: `Entry updated! 5+ fields matched an existing entry.`,
        });
      } else {
        setSubmitMessage({
          type: 'success',
          text: 'New entry added successfully!',
        });
      }

      setTimeout(() => {
        setShowAddModal(false);
        setSubmitMessage(null);
      }, 2000);
    } catch (err) {
      setSubmitMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save entry',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex flex-1 flex-col gap-2 overflow-scroll md:overflow-hidden">
        {/* Charts Row */}
        <div className='h-full flex flex-col md:flex-row gap-2'>
          <div className='flex-1 overflow-hidden flex items-center justify-center'>
            <BitcoinPriceChart />
          </div>
          <div className='flex-1 overflow-hidden flex items-center justify-center'>
            <BitcoinScatterChart /> 
          </div>
        </div>
        {/* Bottom Section */}
        <div className='h-half overflow-scroll border rounded-md'>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Spinner size="xl" />
              <span className="ml-3 text-lg">Loading company data...</span>
            </div>
          ) : error ? (
            <div className="p-4">
              <Alert color="failure">
                <span className="font-medium">Error:</span> {error}
              </Alert>
            </div>
          ) : (
            <CompanyTable
              companies={companies}
              onAddEntry={() => setShowAddModal(true)}
              onResetData={() => setShowResetModal(true)}
            />
          )}
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex lg:hidden flex-col flex-1 overflow-auto gap-4">
          <div className="min-h-[50vh] max-w-full">
            <BitcoinPriceChart />
          </div>
          <div className="min-h-[50vh] max-w-full">
            <BitcoinScatterChart />
          </div>
          <div className='w-full min-h-[80vh] overflow-x-auto overflow-y-auto'>
            {isLoading ? (
              <div className="flex items-center justify-center h-full py-12">
                <Spinner size="xl" />
                <span className="ml-3 text-lg">Loading company data...</span>
              </div>
            ) : error ? (
              <div className="p-4">
                <Alert color="failure">
                  <span className="font-medium">Error:</span> {error}
                </Alert>
              </div>
            ) : (
              <div style={{ minWidth: '100%', width: 'max-content' }}>
                <CompanyTable
                  companies={companies}
                  onAddEntry={() => setShowAddModal(true)}
                  onResetData={() => setShowResetModal(true)}
                />
              </div>
            )}
          </div>
      </div>

      {/* Add Entry Modal */}
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)} size="3xl">
        <Modal.Header className='p-4'>Add Company Entry</Modal.Header>
        <Modal.Body className='p-4'>
          {submitMessage && (
            <Alert
              color={submitMessage.type === 'success' ? 'success' : 'failure'}
              className="mb-4"
            >
              {submitMessage.text}
            </Alert>
          )}
          <AddEntryForm
            onSubmit={handleAddEntry}
            onCancel={() => setShowAddModal(false)}
            isSubmitting={isSubmitting}
          />
        </Modal.Body>
      </Modal>

      {/* Reset Data Confirmation Modal */}
      <Modal show={showResetModal} onClose={() => setShowResetModal(false)} size="md">
        <Modal.Header className='p-4'>Reset Company Data</Modal.Header>
        <Modal.Body className='p-4'>
          <div className="text-center">
            <svg
              className="mx-auto mb-4 h-14 w-14 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to reset all company data?
            </h3>
            <p className="mb-5 text-sm text-gray-500">
              This will clear all stored data and reload fresh data from the API.
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleResetData}
                disabled={isResetting}
              >
                {isResetting ? 'Resetting...' : 'Yes, Reset Data'}
              </Button>
              <Button
                color="gray"
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
