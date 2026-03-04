"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../../components/AppLayout';
import EditPage from '../../../views/EditPage';

export default function EditPagePage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <AppLayout>
        <EditPage {...props} />
      </AppLayout>
    </Suspense>
  );
}
