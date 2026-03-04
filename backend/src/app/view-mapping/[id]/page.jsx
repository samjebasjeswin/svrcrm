"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../../components/AppLayout';
import MappedDataView from '../../../views/MappedDataView';

export default function ViewMappingPage(props) {
    return (
        <Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
            <AppLayout>
                <MappedDataView {...props} />
            </AppLayout>
        </Suspense>
    );
}
