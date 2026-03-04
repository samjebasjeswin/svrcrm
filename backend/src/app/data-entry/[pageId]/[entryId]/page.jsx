"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../../../components/AppLayout';
import DataEntry from '../../../../views/DataEntry';

export default function DataEntryWithEntryPage(props) {
    return (
        <Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
            <AppLayout>
                <DataEntry {...props} />
            </AppLayout>
        </Suspense>
    );
}
