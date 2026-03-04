import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import SelectCompany from './pages/SelectCompany';
import CreateCompany from './pages/CreateCompany';
import PagesManager from './pages/PagesManager';
import EditPage from './pages/EditPage';
import DataEntry from './pages/DataEntry';
import EntriesList from './pages/EntriesList';
import MappedDataView from './pages/MappedDataView';
import EditMappingHierarchy from './pages/EditMappingHierarchy';
import InquiryForm from './pages/InquiryForm';
import Login from './pages/Login';
import PublicCompanyProfile from './pages/PublicCompanyProfile';
import ProductForm from './pages/ProductForm';
import InquiryDetail from './pages/InquiryDetail';
import InboundLinksView from './pages/InboundLinksView';
import WebhookHandler from './pages/WebhookHandler';
import ApiIde from './pages/ApiIde';
import AppLayout from './components/AppLayout';
import { useApp } from './context/AppContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, withLayout = true }) {
  const { user } = useApp();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (withLayout) {
    return <AppLayout>{children}</AppLayout>;
  }
  return children;
}

function App() {
  const { user, getCompanyPages } = useApp();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute withLayout={false}><SelectCompany /></ProtectedRoute>} />
      <Route path="/create-company" element={<ProtectedRoute withLayout={false}><CreateCompany /></ProtectedRoute>} />
      <Route path="/pages" element={<ProtectedRoute><PagesManager /></ProtectedRoute>} />
      <Route path="/edit-page/:pageId" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
      <Route path="/data-entry/:pageId" element={<ProtectedRoute><EntriesList /></ProtectedRoute>} />
      <Route path="/data-entry/:pageId/new" element={<ProtectedRoute><DataEntry /></ProtectedRoute>} />
      <Route path="/data-entry/:pageId/:entryId" element={<ProtectedRoute><DataEntry /></ProtectedRoute>} />
      <Route path="/view-mapping/:mappingId" element={<ProtectedRoute><MappedDataView /></ProtectedRoute>} />
      <Route path="/edit-hierarchy/:mappingId" element={<ProtectedRoute><EditMappingHierarchy /></ProtectedRoute>} />
      <Route path="/c/:companyId" element={<PublicCompanyProfile />} />
      <Route path="/form/:companyId" element={<InquiryForm />} />
      <Route path="/p-form/:companyId" element={<ProductForm />} />
      <Route path="/api/:companyId/:type" element={<WebhookHandler />} />
      <Route path="/webhook/submit" element={<WebhookHandler />} />
      <Route path="/inquiry/:id" element={<ProtectedRoute><InquiryDetail /></ProtectedRoute>} />
      <Route path="/inbound-links/:pageId/:entryId" element={<ProtectedRoute><InboundLinksView /></ProtectedRoute>} />
      <Route path="/api-ide" element={<ProtectedRoute><ApiIde /></ProtectedRoute>} />
      <Route path="/form" element={<Navigate to="/form/2" replace />} />
      <Route path="/forms" element={<Navigate to="/form" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  );
}
