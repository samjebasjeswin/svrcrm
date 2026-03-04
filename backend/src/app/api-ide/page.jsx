"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../components/AppLayout';
import ApiIde from '../../views/ApiIde';

export default function ApiIdePage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <AppLayout>
        <ApiIde {...props} />
      </AppLayout>
    </Suspense>
  );
}
