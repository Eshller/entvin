import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import { ComplianceProvider } from './context/ComplianceContext';

export default function Home() {
  return (
    <ComplianceProvider>
      <div className='flex' style={{ fontFamily: 'Satoshi !important' }}>
        <Sidebar />
        <MainContent />
      </div>
    </ComplianceProvider>
  );
}
