import './App.css';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';

function App() {
  return (
    <>
      <div className="flex">
        <div className="min-w-[12vw]">
          <Menu></Menu>
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
