"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../components/AppLayout';
import EditMappingHierarchy from '../../views/EditMappingHierarchy';

export default function EditMappingHierarchyPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <AppLayout>
        <EditMappingHierarchy {...props} />
      </AppLayout>
    </Suspense>
  );
}
