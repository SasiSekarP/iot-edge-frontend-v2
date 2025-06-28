import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import CourseTable from './CourseTable';
import ViewDialog from './app/profile/profile-view';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/basicComponents/components/homepage';
import ForgetPassword from './components/basicComponents/components/forgetPassword';
import Login from './components/basicComponents/components/login';
import ResetPassword from './components/basicComponents/components/ressetPassword';
import PageNotFound from './components/basicComponents/components/pageNotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
        <Route path="" element={<CourseTable />}/>
          {/* <Route path="configuration/*" element={<Configuration/>}/> */}
          {/* <Route path="energy-module/*" element={<EnergyDashboardIndex/>}/> */}
        </Route>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
