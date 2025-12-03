'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Label, TextInput, Textarea, Checkbox } from 'flowbite-react';
import { companyFormSchema, CompanyFormData } from '@/lib/validations/companySchema';

interface AddEntryFormProps {
  onSubmit: (data: CompanyFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function AddEntryForm({ onSubmit, onCancel, isSubmitting = false }: AddEntryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      purchased: false,
      notes: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Company Name - Full Width */}
      <div>
        <Label htmlFor="company" value="Company Name *" />
        <TextInput
          id="company"
          {...register('company')}
          color={errors.company ? 'failure' : undefined}
          helperText={errors.company?.message}
        />
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country */}
        <div>
          <Label htmlFor="country" value="Country *" />
          <TextInput
            id="country"
            {...register('country')}
            color={errors.country ? 'failure' : undefined}
            helperText={errors.country?.message}
          />
        </div>

        {/* State */}
        <div>
          <Label htmlFor="state" value="State *" />
          <TextInput
            id="state"
            {...register('state')}
            color={errors.state ? 'failure' : undefined}
            helperText={errors.state?.message}
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city" value="City *" />
          <TextInput
            id="city"
            {...register('city')}
            color={errors.city ? 'failure' : undefined}
            helperText={errors.city?.message}
          />
        </div>

        {/* Zipcode */}
        <div>
          <Label htmlFor="zipcode" value="Zipcode *" />
          <TextInput
            id="zipcode"
            {...register('zipcode')}
            placeholder="12345 or 12345-6789"
            color={errors.zipcode ? 'failure' : undefined}
            helperText={errors.zipcode?.message}
          />
        </div>
      </div>

      {/* Business Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Employees */}
        <div>
          <Label htmlFor="employees" value="Employees *" />
          <TextInput
            id="employees"
            type="number"
            {...register('employees')}
            color={errors.employees ? 'failure' : undefined}
            helperText={errors.employees?.message}
          />
        </div>

        {/* Revenue */}
        <div>
          <Label htmlFor="revenue" value="Revenue *" />
          <TextInput
            id="revenue"
            type="number"
            {...register('revenue')}
            color={errors.revenue ? 'failure' : undefined}
            helperText={errors.revenue?.message}
          />
        </div>
      </div>

      {/* Website - Full Width */}
      <div>
        <Label htmlFor="website" value="Website *" />
        <TextInput
          id="website"
          type="url"
          placeholder="https://example.com"
          {...register('website')}
          color={errors.website ? 'failure' : undefined}
          helperText={errors.website?.message}
        />
      </div>

      {/* Sales Rep and Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sales Rep */}
        <div>
          <Label htmlFor="sales_rep" value="Sales Representative *" />
          <TextInput
            id="sales_rep"
            {...register('sales_rep')}
            color={errors.sales_rep ? 'failure' : undefined}
            helperText={errors.sales_rep?.message}
          />
        </div>

        {/* Last Contacted */}
        <div>
          <Label htmlFor="last_contacted" value="Last Contacted *" />
          <TextInput
            id="last_contacted"
            type="date"
            {...register('last_contacted')}
            color={errors.last_contacted ? 'failure' : undefined}
            helperText={errors.last_contacted?.message}
          />
        </div>
      </div>

      {/* Purchased Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox id="purchased" {...register('purchased')} />
        <Label htmlFor="purchased">Purchased</Label>
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes" value="Notes (Optional)" />
        <Textarea
          id="notes"
          rows={4}
          {...register('notes')}
          color={errors.notes ? 'failure' : undefined}
          helperText={errors.notes?.message}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button color="gray" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Entry'}
        </Button>
      </div>
    </form>
  );
}
