import { useContext } from 'react';
import './App.css';
import AdminDashBoard from './pages/admin/home_admin/AdminDashBoard';
import ClientDashBoard from './pages/client/home_client/ClientDashBoard';
import { ContextAuth } from './context/AuthProvider';

function App() {
   const { isLogin } = useContext(ContextAuth);
   
  return (
    <>
      {isLogin?.id_role == "admin" ? <AdminDashBoard/>  : <ClientDashBoard/> }
    </>
  );
}

export default App;
