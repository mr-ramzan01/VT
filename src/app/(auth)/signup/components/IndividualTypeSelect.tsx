'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';

interface IndividualTypeSelectProps {
  error?: string;
}

const individualTypeOptions = [
  { value: "", label: "Select Individual Type" },
  { value: "company", label: "Company" },
  { value: "broker", label: "Broker" },
  { value: "asset_issuer", label: "Asset Issuer" },
  { value: "institution", label: "Institution" }
];

export default function IndividualTypeSelect({ error }: IndividualTypeSelectProps) {
  const { register, formState: { errors } } = useFormContext();
  
  // Use the error passed in or from the form context
  const errorMessage = error || errors.individualType?.message as string;
  
  return (
    <div className="w-full mb-4">
      <label className="block mb-1 text-xs font-medium text-[#475467]">
        Individual Type
      </label>
      <div className="relative">
        <select
          className={`w-full rounded-md border ${errorMessage ? 'border-red-500' : 'border-[#EBEBEB]'} bg-white py-2.5 px-3 text-sm text-[#1B1B1B] focus:outline-none focus:ring-1 ${errorMessage ? 'focus:ring-red-500' : 'focus:ring-[#8A2BE2]'} focus:border-[#8A2BE2] appearance-none pr-10`}
          {...register('individualType')}
        >
          {individualTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown size={16} className="text-[#1B1B1B]" />
        </div>
      </div>
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
} 