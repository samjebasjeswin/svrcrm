"use client";
import React, { Suspense } from 'react';

import PublicCompanyProfile from '../../../views/PublicCompanyProfile';

export default function PublicCompanyProfilePage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <PublicCompanyProfile {...props} />
    </Suspense>
  );
}
