"use client";
import React, { Suspense } from 'react';
import AppLayout from '../../components/AppLayout';
import Dashboard from '../../views/Dashboard';

export default function DashboardPage() {
    return (
        <Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
            <AppLayout>
                <Dashboard />
            </AppLayout>
        </Suspense>
    );
}
