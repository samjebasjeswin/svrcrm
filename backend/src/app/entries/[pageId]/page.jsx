"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../../components/AppLayout';
import EntriesList from '../../../views/EntriesList';

export default function EntriesListPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <AppLayout>
        <EntriesList {...props} />
      </AppLayout>
    </Suspense>
  );
}
