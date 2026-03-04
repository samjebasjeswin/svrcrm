"use client";
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

/**
 * CategoryDropdown – a reusable component that shows a dropdown of existing
 * categories (entries on the automatically‑created "Category" page) and allows
 * the user to add a new category on the fly.
 *
 * Usage example:
 *   <CategoryDropdown
 *     label="Category"
 *     onChange={(catId) => console.log('selected', catId)}
 *   />
 */
export default function CategoryDropdown({ label = 'Category', onChange }) {
    const {
        pages,
        currentCompanyId,
        getPage,
        getPageEntries,
        addEntry,
        ensureCategoryPage,
    } = useApp();

    const [categoryPageId, setCategoryPageId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState('');

    // Find (or create) the Category page on mount
    useEffect(() => {
        // ensureCategoryPage is already called in AppProvider, but we also need the id here
        const catPage = (pages[currentCompanyId] || []).find((p) => p.name === 'Category');
        if (catPage) {
            setCategoryPageId(catPage.id);
        }
    }, [pages, currentCompanyId]);

    // Load category entries whenever the page id changes
    useEffect(() => {
        if (!categoryPageId) return;
        const entries = getPageEntries(categoryPageId);
        setCategories(entries);
    }, [categoryPageId, getPageEntries]);

    const handleAddCategory = () => {
        const name = window.prompt('Enter new category name');
        if (!name) return;
        // The Category page has a single field "Name" – we build entry data accordingly
        const entryData = { Name: name };
        const newEntry = addEntry(categoryPageId, entryData);
        // Refresh list
        setCategories((prev) => [...prev, newEntry]);
        setSelectedId(newEntry.id);
        if (onChange) onChange(newEntry.id);
    };

    const handleSelect = (e) => {
        const id = e.target.value;
        setSelectedId(id);
        if (onChange) onChange(id);
    };

    return (
        <div className="category-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="category-select" style={{ fontWeight: '600' }}>{label}:</label>
            <select id="category-select" value={selectedId} onChange={handleSelect} style={{ padding: '0.4rem', minWidth: '120px' }}>
                <option value="">-- Select {label} --</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.data?.Name || `Category ${cat.id}`}
                    </option>
                ))}
            </select>
            <button type="button" onClick={handleAddCategory} style={{ padding: '0.4rem 0.8rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                + Add
            </button>
        </div>
    );
}
