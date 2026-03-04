"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../components/AppLayout';
import CreateCompany from '../../views/CreateCompany';

export default function CreateCompanyPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <AppLayout>
        <CreateCompany {...props} />
      </AppLayout>
    </Suspense>
  );
}
