import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import { ModulesProvider } from './context/ModuleContext';

export default function Home() {
  return (
    <ModulesProvider>
      <div className='flex' style={{ fontFamily: 'Satoshi !important' }}>
        <Sidebar />
        <MainContent />
      </div>
    </ModulesProvider>
  );
}
