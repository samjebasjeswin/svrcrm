"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../../components/AppLayout';
import InquiryDetail from '../../../views/InquiryDetail';

export default function InquiryDetailPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <AppLayout>
        <InquiryDetail {...props} />
      </AppLayout>
    </Suspense>
  );
}
