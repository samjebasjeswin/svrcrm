"use client";
import React, { Suspense } from 'react';

import WebhookHandler from '../../views/WebhookHandler';

export default function WebhookHandlerPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <WebhookHandler {...props} />
    </Suspense>
  );
}
