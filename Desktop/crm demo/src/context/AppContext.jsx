import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const INITIAL_COMPANIES = [
  { id: 1, name: 'SVR Global Solutions India', role: 'Company Admin', initials: 'SG' },
  { id: 2, name: 'Demo Testing Company', role: 'Company Admin', initials: 'DT' },
];

const STORAGE_KEY = 'crm_demo_data';

export function AppProvider({ children }) {
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_companies`);
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });
  const [currentCompanyId, setCurrentCompanyId] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_currentCompanyId`);
    return saved ? JSON.parse(saved) : null;
  });
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_pages`);
    return saved ? JSON.parse(saved) : {};
  });
  const [savedEntries, setSavedEntries] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_entries`);
    return saved ? JSON.parse(saved) : {};
  });
  const [pageLinks, setPageLinks] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_links`);
    return saved ? JSON.parse(saved) : [];
  });
  const [fieldMappings, setFieldMappings] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_mappings`);
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : null;
  });
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_inquiries`);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_companies`, JSON.stringify(companies));
    localStorage.setItem(`${STORAGE_KEY}_currentCompanyId`, JSON.stringify(currentCompanyId));
    localStorage.setItem(`${STORAGE_KEY}_pages`, JSON.stringify(pages));
    localStorage.setItem(`${STORAGE_KEY}_entries`, JSON.stringify(savedEntries));
    localStorage.setItem(`${STORAGE_KEY}_links`, JSON.stringify(pageLinks));
    localStorage.setItem(`${STORAGE_KEY}_mappings`, JSON.stringify(fieldMappings));
    localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(user));
    localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
  }, [companies, currentCompanyId, pages, savedEntries, pageLinks, fieldMappings, user, inquiries]);

  const addCompany = (company, includeDefaultPages = false) => {
    const newId = Date.now();
    const initials = company.companyName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    const newCompany = { id: newId, name: company.companyName, role: 'Company Admin', initials, details: company };
    setCompanies((prev) => [...prev, newCompany]);
    setCurrentCompanyId(newId);

    // Create default pages if requested
    let initialPages = [];
    if (includeDefaultPages) {
      initialPages = [
        {
          id: Date.now() + 10,
          name: 'home page',
          headings: [
            {
              id: Date.now() + 11,
              title: 'Welcome Section',
              subHeadings: [
                { id: Date.now() + 12, title: '', fields: [] },
              ],
            },
          ],
        },
        {
          id: Date.now() + 20,
          name: 'Contact Us',
          headings: [
            {
              id: Date.now() + 21,
              title: 'Contact Details',
              subHeadings: [
                { id: Date.now() + 22, title: '', fields: [] },
              ],
            },
          ],
        },
        {
          id: Date.now() + 30,
          name: 'Product Inquiry',
          headings: [
            {
              id: Date.now() + 31,
              title: 'Product Info',
              subHeadings: [
                { id: Date.now() + 32, title: '', fields: [] },
              ],
            },
          ],
        },
        {
          id: Date.now() + 40,
          name: 'Static SEO',
          headings: [
            {
              id: Date.now() + 41,
              title: 'SEO Meta Data',
              subHeadings: [
                {
                  id: Date.now() + 42,
                  title: 'Standard Meta Tags',
                  fields: [
                    { id: Date.now() + 43, label: 'Web Page Title (<title>)', valueType: 'Text', placeholder: 'Title of the web page' },
                    { id: Date.now() + 44, label: 'Meta Description (<meta name="description">)', valueType: 'Text', placeholder: 'Enter a concise description of the page (150-160 chars)' },
                    { id: Date.now() + 45, label: 'Meta Keywords (<meta name="keywords">)', valueType: 'Text', placeholder: 'keyword1, keyword2, keyword3' },
                    { id: Date.now() + 46, label: 'Robots (<meta name="robots">)', valueType: 'Text', placeholder: 'index, follow' },
                    { id: Date.now() + 47, label: 'Website Name (<meta name="author">)', valueType: 'Text', placeholder: 'e.g. Valves Only - USA' },
                    { id: Date.now() + 48, label: 'Refresh (<meta name="refresh">)', valueType: 'Text', placeholder: '30' },
                    { id: Date.now() + 49, label: 'Canonical URL (<link rel="canonical">)', valueType: 'Text', placeholder: 'https://www.yourwebsite.com/' },
                  ],
                },
                {
                  id: Date.now() + 50,
                  title: 'Open Graph Data',
                  fields: [
                    { id: Date.now() + 51, label: 'OG Title (<meta property="og:title">)', valueType: 'Text', placeholder: 'Social media title' },
                    { id: Date.now() + 52, label: 'OG Type (<meta property="og:type">)', valueType: 'Text', placeholder: 'website, article' },
                    { id: Date.now() + 53, label: 'OG URL (<meta property="og:url">)', valueType: 'Text', placeholder: 'https://www.yourwebsite.com/page-url' },
                    { id: Date.now() + 54, label: 'OG Image (<meta property="og:image">)', valueType: 'Image', placeholder: '' },
                    { id: Date.now() + 55, label: 'OG Description (<meta property="og:description">)', valueType: 'Text', placeholder: 'Social media description' },
                    { id: Date.now() + 56, label: 'OG Locale (<meta property="og:locale">)', valueType: 'Text', placeholder: 'en_US' },
                    { id: Date.now() + 57, label: 'OG Site Name (<meta property="og:site_name">)', valueType: 'Text', placeholder: 'Your Website Name' },
                    { id: Date.now() + 58, label: 'Article Published Time (<meta property="article:published_time">)', valueType: 'Text', placeholder: 'YYYY-MM-DDTHH:mm:ss+00:00' },
                    { id: Date.now() + 59, label: 'Article Modified Time (<meta property="article:modified_time">)', valueType: 'Text', placeholder: 'YYYY-MM-DDTHH:mm:ss+00:00' },
                    { id: Date.now() + 60, label: 'Article Author (<meta property="article:author">)', valueType: 'Text', placeholder: 'Author URL' },
                  ],
                },
                {
                  id: Date.now() + 61,
                  title: 'Twitter Card Data',
                  fields: [
                    { id: Date.now() + 62, label: 'Twitter Card (<meta name="twitter:card">)', valueType: 'Text', placeholder: 'summary_large_image' },
                    { id: Date.now() + 63, label: 'Twitter Site (<meta name="twitter:site">)', valueType: 'Text', placeholder: '@yourwebsite' },
                    { id: Date.now() + 64, label: 'Twitter Title (<meta name="twitter:title">)', valueType: 'Text', placeholder: 'Social Title' },
                    { id: Date.now() + 65, label: 'Twitter Description (<meta name="twitter:description">)', valueType: 'Text', placeholder: 'Social Description' },
                    { id: Date.now() + 66, label: 'Twitter Creator (<meta name="twitter:creator">)', valueType: 'Text', placeholder: '@yourtwitter' },
                    { id: Date.now() + 67, label: 'Twitter Image (<meta name="twitter:image">)', valueType: 'Image', placeholder: '' },
                  ],
                },
                {
                  id: Date.now() + 68,
                  title: 'Dublin Core Metadata',
                  fields: [
                    { id: Date.now() + 69, label: 'DC Title (<meta name="dc.title">)', valueType: 'Text', placeholder: 'Dublin Core Title' },
                    { id: Date.now() + 70, label: 'DC Description (<meta name="dc.description">)', valueType: 'Text', placeholder: 'Dublin Core Description' },
                    { id: Date.now() + 71, label: 'DC Subject (<meta name="dc.subject">)', valueType: 'Text', placeholder: 'Keywords, Subject' },
                    { id: Date.now() + 72, label: 'DC Created (<meta name="dc.created">)', valueType: 'Text', placeholder: 'YYYY-MM-DD' },
                    { id: Date.now() + 73, label: 'DC Modified (<meta name="dc.modified">)', valueType: 'Text', placeholder: 'YYYY-MM-DD' },
                    { id: Date.now() + 74, label: 'DC Language (<meta name="dc.language">)', valueType: 'Text', placeholder: 'en' },
                  ],
                },
              ],
            },
          ],
        }
      ];
    }

    setPages((prev) => ({ ...prev, [newId]: initialPages }));
    return newId;
  };

  const updateCompany = (id, updatedCompany) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedCompany } : c)));
  };

  const selectCompany = (id) => {
    setCurrentCompanyId(id);
    if (!pages[id]) {
      setPages((prev) => ({ ...prev, [id]: [] }));
    }
  };

  const getCompanyPages = () => pages[currentCompanyId] || [];

  const addPage = (pageName) => {
    const newPage = {
      id: Date.now(),
      name: pageName,
      headings: [
        {
          id: Date.now() + 1,
          title: 'Basic Information',
          subHeadings: [
            { id: Date.now() + 2, title: '', fields: [] },
          ],
        },
      ],
    };
    setPages((prev) => ({
      ...prev,
      [currentCompanyId]: [...(prev[currentCompanyId] || []), newPage],
    }));
    return newPage.id;
  };

  const deletePage = (pageId) => {
    setPages((prev) => ({
      ...prev,
      [currentCompanyId]: (prev[currentCompanyId] || []).filter((p) => p.id !== pageId),
    }));
    // Clean up links where this page was source or target
    setPageLinks((prev) => prev.filter((l) => l.sourcePageId !== pageId && l.targetPageId !== pageId));
    // Clean up entries
    setSavedEntries((prev) => {
      const newEntries = { ...prev };
      delete newEntries[`${currentCompanyId}_${pageId}`];
      return newEntries;
    });
  };

  const updatePage = (pageId, updatedPage) => {
    setPages((prev) => ({
      ...prev,
      [currentCompanyId]: (prev[currentCompanyId] || []).map((p) =>
        p.id === pageId ? { ...p, ...updatedPage } : p
      ),
    }));
  };

  const getPage = (pageId) => {
    return (pages[currentCompanyId] || []).find((p) => p.id === Number(pageId));
  };

  // Ensure a "form" page exists; create it if missing (case-insensitive check)
  const ensureFormPage = () => {
    if (!currentCompanyId) return;
    const currentPages = pages[currentCompanyId] || [];
    const existing = currentPages.find((p) => p.name.toLowerCase().trim() === 'form');
    if (!existing) {
      addPage('form');
    }
  };

  const ensureSeoPage = () => {
    if (!currentCompanyId) return;
    const currentPages = pages[currentCompanyId] || [];
    const existingIndex = currentPages.findIndex((p) => p.name.toLowerCase().trim() === 'static seo');

    // Schema definition for comparison/creation
    const seoSchema = {
      name: 'Static SEO',
      headings: [
        {
          id: Date.now() + 41,
          title: 'SEO Meta Data',
          subHeadings: [
            {
              id: Date.now() + 42,
              title: 'Standard Meta Tags',
              fields: [
                { id: Date.now() + 43, label: 'Web Page Title (<title>)', valueType: 'Text', placeholder: 'Title of the web page' },
                { id: Date.now() + 44, label: 'Meta Description (<meta name="description">)', valueType: 'Text', placeholder: 'Enter a concise description of the page (150-160 chars)' },
                { id: Date.now() + 45, label: 'Meta Keywords (<meta name="keywords">)', valueType: 'Text', placeholder: 'keyword1, keyword2, keyword3' },
                { id: Date.now() + 46, label: 'Robots (<meta name="robots">)', valueType: 'Text', placeholder: 'index, follow' },
                { id: Date.now() + 47, label: 'Website Name (<meta name="author">)', valueType: 'Text', placeholder: 'e.g. Valves Only - USA' },
                { id: Date.now() + 48, label: 'Refresh (<meta name="refresh">)', valueType: 'Text', placeholder: '30' },
                { id: Date.now() + 49, label: 'Canonical URL (<link rel="canonical">)', valueType: 'Text', placeholder: 'https://www.yourwebsite.com/' },
              ],
            },
            {
              id: Date.now() + 50,
              title: 'Open Graph Data',
              fields: [
                { id: Date.now() + 51, label: 'OG Title (<meta property="og:title">)', valueType: 'Text', placeholder: 'Social media title' },
                { id: Date.now() + 52, label: 'OG Type (<meta property="og:type">)', valueType: 'Text', placeholder: 'website, article' },
                { id: Date.now() + 53, label: 'OG URL (<meta property="og:url">)', valueType: 'Text', placeholder: 'https://www.yourwebsite.com/page-url' },
                { id: Date.now() + 54, label: 'OG Image (<meta property="og:image">)', valueType: 'Image', placeholder: '' },
                { id: Date.now() + 55, label: 'OG Description (<meta property="og:description">)', valueType: 'Text', placeholder: 'Social media description' },
                { id: Date.now() + 56, label: 'OG Locale (<meta property="og:locale">)', valueType: 'Text', placeholder: 'en_US' },
                { id: Date.now() + 57, label: 'OG Site Name (<meta property="og:site_name">)', valueType: 'Text', placeholder: 'Your Website Name' },
                { id: Date.now() + 58, label: 'Article Published Time (<meta property="article:published_time">)', valueType: 'Text', placeholder: 'YYYY-MM-DDTHH:mm:ss+00:00' },
                { id: Date.now() + 59, label: 'Article Modified Time (<meta property="article:modified_time">)', valueType: 'Text', placeholder: 'YYYY-MM-DDTHH:mm:ss+00:00' },
                { id: Date.now() + 60, label: 'Article Author (<meta property="article:author">)', valueType: 'Text', placeholder: 'Author URL' },
              ],
            },
            {
              id: Date.now() + 61,
              title: 'Twitter Card Data',
              fields: [
                { id: Date.now() + 62, label: 'Twitter Card (<meta name="twitter:card">)', valueType: 'Text', placeholder: 'summary_large_image' },
                { id: Date.now() + 63, label: 'Twitter Site (<meta name="twitter:site">)', valueType: 'Text', placeholder: '@yourwebsite' },
                { id: Date.now() + 64, label: 'Twitter Title (<meta name="twitter:title">)', valueType: 'Text', placeholder: 'Social Title' },
                { id: Date.now() + 65, label: 'Twitter Description (<meta name="twitter:description">)', valueType: 'Text', placeholder: 'Social Description' },
                { id: Date.now() + 66, label: 'Twitter Creator (<meta name="twitter:creator">)', valueType: 'Text', placeholder: '@yourtwitter' },
                { id: Date.now() + 67, label: 'Twitter Image (<meta name="twitter:image">)', valueType: 'Image', placeholder: '' },
              ],
            },
            {
              id: Date.now() + 68,
              title: 'Dublin Core Metadata',
              fields: [
                { id: Date.now() + 69, label: 'DC Title (<meta name="dc.title">)', valueType: 'Text', placeholder: 'Dublin Core Title' },
                { id: Date.now() + 70, label: 'DC Description (<meta name="dc.description">)', valueType: 'Text', placeholder: 'Dublin Core Description' },
                { id: Date.now() + 71, label: 'DC Subject (<meta name="dc.subject">)', valueType: 'Text', placeholder: 'Keywords, Subject' },
                { id: Date.now() + 72, label: 'DC Created (<meta name="dc.created">)', valueType: 'Text', placeholder: 'YYYY-MM-DD' },
                { id: Date.now() + 73, label: 'DC Modified (<meta name="dc.modified">)', valueType: 'Text', placeholder: 'YYYY-MM-DD' },
                { id: Date.now() + 74, label: 'DC Language (<meta name="dc.language">)', valueType: 'Text', placeholder: 'en' },
              ],
            },
          ],
        },
      ],
    };

    if (existingIndex === -1) {
      setPages((prev) => ({
        ...prev,
        [currentCompanyId]: [...(prev[currentCompanyId] || []), { ...seoSchema, id: Date.now() + 400 }],
      }));
    } else {
      // Repair logic: check if labels match. If they are the old ones (don't contain '<'), update the page structure.
      const existingPage = currentPages[existingIndex];
      const needsUpdate = !existingPage.headings?.[0]?.subHeadings?.[0]?.fields?.[0]?.label?.includes('<');

      if (needsUpdate) {
        setPages((prev) => {
          const updatedPages = [...(prev[currentCompanyId] || [])];
          updatedPages[existingIndex] = { ...existingPage, headings: seoSchema.headings };
          return { ...prev, [currentCompanyId]: updatedPages };
        });
      }
    }
  };

  // Call once on mount or when currentCompanyId changes
  useEffect(() => {
    ensureFormPage();
    ensureSeoPage();
  }, [currentCompanyId, pages]);

  // ---- Saved Entries (shared across pages for linking) ----
  const addEntry = (pageId, entryData) => {
    const key = `${currentCompanyId}_${pageId}`;
    const entry = { id: Date.now(), data: entryData, savedAt: new Date().toLocaleString() };
    setSavedEntries((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), entry],
    }));
    return entry;
  };

  const updateEntry = (pageId, entryId, entryData) => {
    const key = `${currentCompanyId}_${pageId}`;
    setSavedEntries((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((e) =>
        e.id === Number(entryId) ? { ...e, data: entryData, updatedAt: new Date().toLocaleString() } : e
      ),
    }));
  };

  const deleteEntry = (pageId, entryId) => {
    const key = `${currentCompanyId}_${pageId}`;
    setSavedEntries((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((e) => e.id !== Number(entryId)),
    }));
  };

  const getPageEntries = (pageId, companyId) => {
    const key = `${companyId || currentCompanyId}_${pageId}`;
    return savedEntries[key] || [];
  };

  // Get display value for a linked entry: use specific field if provided, else fallback to first field
  const getLinkedEntryDisplayValue = (pageId, entryId, displayFieldName) => {
    const entries = getPageEntries(pageId);
    const entry = entries.find((e) => e.id === Number(entryId));
    if (!entry || !entry.data) return '';
    const page = getPage(pageId);
    if (!page) return '';

    // If a specific field name is requested, find its value
    if (displayFieldName) {
      for (const heading of page.headings || []) {
        for (const sub of heading.subHeadings || []) {
          for (const field of sub.fields || []) {
            if (field.label === displayFieldName) {
              const key = `${heading.id}_${sub.id}_${field.id}`;
              const val = entry.data[key];
              if (val !== undefined && val !== null && val !== '') return val.toString();
            }
          }
        }
      }
    }

    // Fallback: Find the first populated field's value
    for (const heading of page.headings || []) {
      for (const sub of heading.subHeadings || []) {
        for (const field of sub.fields || []) {
          const key = `${heading.id}_${sub.id}_${field.id}`;
          const val = entry.data[key];
          if (val !== undefined && val !== null && val !== '') return val.toString();

          // Check for grid fields
          if (field.valueType === 'Grid') {
            for (let i = 0; i < (field.gridCols?.length || 0); i++) {
              const gVal = entry.data[`${key}_col${i}`];
              if (gVal !== undefined && gVal !== null && gVal !== '') return gVal.toString();
            }
          }
        }
      }
    }
    return `Entry #${entryId}`;
  };

  const addPageLinks = (links) => {
    if (!links || links.length === 0) return;

    // Add to link history
    const newLinksBatch = links.map(l => ({ ...l, id: Date.now() + Math.random() }));
    setPageLinks((prev) => [...prev, ...newLinksBatch]);

    const targetPageId = links[0].targetPageId;
    const targetPage = getPage(targetPageId);

    if (targetPage) {
      // Create a deep copy of headings to avoid mutation issues
      const updatedHeadings = JSON.parse(JSON.stringify(targetPage.headings));

      if (updatedHeadings.length === 0) {
        updatedHeadings.push({ id: Date.now(), title: 'Linked Data', subHeadings: [] });
      }

      const mainHeading = updatedHeadings[0];

      links.forEach((link, idx) => {
        let targetSubHeading;

        if (link.groupName) {
          // Find or create a named sub-heading
          targetSubHeading = mainHeading.subHeadings.find(sh => sh.title === link.groupName);
          if (!targetSubHeading) {
            targetSubHeading = { id: Date.now() + Math.random() + idx, title: link.groupName, fields: [] };
            mainHeading.subHeadings.push(targetSubHeading);
          }
        } else {
          // Default to the first sub-heading or create one
          if (mainHeading.subHeadings.length === 0) {
            mainHeading.subHeadings.push({ id: Date.now() + Math.random() + idx, title: '', fields: [] });
          }
          targetSubHeading = mainHeading.subHeadings[0];
        }

        // Add the field with precise metadata
        targetSubHeading.fields.push({
          id: Date.now() + Math.random() + idx,
          label: link.linkName || `Link to ${getPage(link.sourcePageId)?.name}`,
          valueType: 'Link',
          linkedPageId: link.sourcePageId,
          displayFieldName: link.sourceFieldName, // This is CRITICAL for showing correct value
          required: false
        });
      });

      updatePage(targetPageId, { headings: updatedHeadings });
    }
  };

  const deletePageLink = (linkId) => {
    setPageLinks((prev) => prev.filter((l) => l.id !== linkId));
  };

  return (
    <AppContext.Provider
      value={{
        companies,
        currentCompanyId,
        addCompany,
        updateCompany,
        selectCompany,
        getCompanyPages,
        addPage,
        deletePage,
        updatePage,
        getPage,
        addEntry,
        updateEntry,
        deleteEntry,
        getPageEntries,
        getLinkedEntryDisplayValue,
        pageLinks,
        addPageLinks,
        deletePageLink,
        ensureFormPage,
        fieldMappings,
        addFieldMapping: (m) => setFieldMappings(prev => [...prev, { ...m, id: Date.now() }]),
        updateFieldMapping: (id, m) => setFieldMappings(prev => prev.map(item => item.id === id ? { ...item, ...m } : item)),
        deleteFieldMapping: (id) => setFieldMappings(prev => prev.filter(m => m.id !== id)),

        // ---- Inquiries ----
        addInquiry: (inquiryData, companyId, type = 'contact') => {
          const newInquiry = {
            id: Date.now(),
            ...inquiryData,
            type, // 'contact' or 'product'
            status: 'New', // Default status
            companyId: companyId ? Number(companyId) : null,
            submittedAt: new Date().toLocaleString()
          };
          setInquiries((prev) => [newInquiry, ...prev]);
        },
        updateInquiryStatus: (id, status) => {
          setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
        },
        deleteInquiry: (id) => setInquiries(prev => prev.filter(i => i.id !== id)),
        inquiries,

        user,
        login: (username, password) => {
          if (username === 'superadmin' && password === 'pass') {
            const newUser = { username, role: 'Super Admin' };
            setUser(newUser);
            return { success: true, user: newUser };
          }
          if (username === 'systemadmin' && password === 'password') {
            const newUser = { username, role: 'System Admin' };
            setUser(newUser);
            return { success: true, user: newUser };
          }
          return { success: false, message: 'Invalid credentials' };
        },
        logout: () => setUser(null),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
