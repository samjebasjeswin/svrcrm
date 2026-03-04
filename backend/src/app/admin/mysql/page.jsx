"use client";
import React, { Suspense } from 'react';

import MySQLAdmin from '../../../views/MySQLAdmin';

export default function MySQLAdminPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <MySQLAdmin {...props} />
    </Suspense>
  );
}
