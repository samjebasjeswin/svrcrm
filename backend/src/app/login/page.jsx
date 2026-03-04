"use client";
import React, { Suspense } from 'react';

import Login from '../../views/Login';

export default function LoginPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <Login {...props} />
    </Suspense>
  );
}
