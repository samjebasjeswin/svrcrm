"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../components/AppLayout';
import PagesManager from '../../views/PagesManager';

export default function PagesManagerPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <AppLayout>
        <PagesManager {...props} />
      </AppLayout>
    </Suspense>
  );
}
