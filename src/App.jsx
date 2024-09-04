import './App.css';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <div className="flex">
          <div className="min-w-[12vw]">
            <Menu></Menu>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
