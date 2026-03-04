"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../../../components/AppLayout';
import InboundLinksView from '../../../../views/InboundLinksView';

export default function InboundLinksViewPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <AppLayout>
        <InboundLinksView {...props} />
      </AppLayout>
    </Suspense>
  );
}
