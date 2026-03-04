"use client";
import React, { Suspense } from 'react';

import ProductForm from '../../../views/ProductForm';

export default function ProductFormPage(props) {
  return (
    <Suspense fallback={<div style={{padding: '2rem'}}>Loading...</div>}>
      <ProductForm {...props} />
    </Suspense>
  );
}
