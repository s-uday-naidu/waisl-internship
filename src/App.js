import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HomeCctv1 from './Tables/CCTV1/CCTVHome';
import CctvPing from './Tables/CCTV1/CctvPing';
import AddCctv from './Tables/Cctv/AddCctv';
import CCTVTAG from './Tables/Cctv/CCTVTAG';
import EditCctv from './Tables/Cctv/EditCctv';
import HomeCctv from './Tables/Cctv/HomeCctv';
import ViewCctv from './Tables/Cctv/ViewCctv';
import AddDy from './Tables/DigiYatra/AddDy';
import DYTAG from './Tables/DigiYatra/DYTAG';
import EditDy from './Tables/DigiYatra/EditDy';
import HomeDy from "./Tables/DigiYatra/HomeDy";
import ViewDy from './Tables/DigiYatra/ViewDy';
import AddEpos from './Tables/EPOS/AddEpos';
import EPOSTAG from './Tables/EPOS/EPOSTAG';
import EditEpos from './Tables/EPOS/EditEpos';
import HomeEpos from './Tables/EPOS/HomeEpos';
import ViewEpos from './Tables/EPOS/ViewEpos';
import AddEUS from './Tables/EUS/AddEus';
import EUSTAG from './Tables/EUS/EUSTAG';
import EditEUS from './Tables/EUS/EditEus';
import HomeEUS from './Tables/EUS/HomeEus';
import ViewEUS from './Tables/EUS/ViewEus';
import AddFids from './Tables/FIDS/AddFids';
import EditFids from './Tables/FIDS/EditFids';
import FIDSTAG from './Tables/FIDS/FIDSTAG';
import HomeFids from './Tables/FIDS/HomeFids';
import ViewFids from './Tables/FIDS/ViewFids';
import Addlaptop from './Tables/LAPTOP/AddLaptop';
import Editlaptop from './Tables/LAPTOP/EditLaptop';
import Homelaptop from './Tables/LAPTOP/HomeLaptop';
import LAPTOPTAG from './Tables/LAPTOP/LAPTOPTAG';
import Viewlaptop from './Tables/LAPTOP/ViewLaptop';
import AddMatv from './Tables/MATV/AddMatv';
import EditMatv from './Tables/MATV/EditMatv';
import HomeMatv from './Tables/MATV/HomeMatv';
import MATVTAG from './Tables/MATV/MATVTAG';
import ViewMatv from './Tables/MATV/ViewMatv';
import AddServer from './Tables/SERVERS/AddServer';
import EditServer from './Tables/SERVERS/EditServer';
import HomeServer from './Tables/SERVERS/HomeServer';
import SERVERTAG from './Tables/SERVERS/SERVERTAG';
import Viewserver from './Tables/SERVERS/ViewServer';
import Finder from './dashboard/Finder';
import Navbar from './layout/Navbar';
import CCTVUpdated from './pages/CctvUpdated';
import EposSuccessMessage from './pages/EposUpdated';
import EUSUPDATED from './pages/EusUpdated';
import FIDSUPDATED from './pages/FidsUpdated';
import Home from './pages/Home';
import LaptopUpdated from './pages/LaptopUpdated';
import UMATVupdated from './pages/MatvUpdated';
import CCTVSuccess from './pages/SuccessCctv';
import SuccessEpos from './pages/SuccessEpos';
import EUSSUCCESSMSG from './pages/SuccessEus';
import FIDSSUCCESS from './pages/SuccessFids';
import SuccessMatv from './pages/SuccessMatv';
import SuccessMessage from './pages/SuccessMsg';
import SuccessServer from './pages/SuccessSever';
import ServerSuccessMessage from './pages/serverupdated';
import USuccessMessage from './pages/updatesuccess';
function App() {

  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/SERVERS' element={<HomeServer/>}/>
        <Route exact path="/DY" element={<HomeDy/>}/>
        <Route exact path='/DYV' element={<ViewDy/>}/>
        <Route exact path="/addDYasset" element={<AddDy/>}/>
        <Route exact path='/addServerasset'element={<AddServer/>}/>
        <Route exact path='/success' element={<SuccessMessage/>}/>
        <Route exact path='/EditDy/:asset_tag_number' element={<EditDy/>}/>
        <Route exact path='/EditServer/:asset_tag_number' element={<EditServer/>}/>
        <Route exact path='/updated' element={<USuccessMessage/>}/>
        <Route exact path="/serversuccess" element={<ServerSuccessMessage />} />
        <Route exact path="/serveradded" element={<SuccessServer/>}/>
        <Route exact path='/SERVERSV' element={<Viewserver/>}/>
        <Route exact path='/EPOS' element={<HomeEpos/>}/>
        <Route exact path='/addEposasset'element={<AddEpos/>}/>
        <Route exact path='/epossuccess'element={<SuccessEpos/>}/>
        <Route exact path='/eposupdated'element={<EposSuccessMessage/>}/>
        <Route exact path='/EditEpos/:asset_tag_number' element={<EditEpos/>}/>
        <Route exact path='/EPOSV' element={<ViewEpos/>}/>
        <Route exact path='/DYTAG' element={<DYTAG/>}/>
        <Route exact path='/addEUSasset'element={<AddEUS/>}/>
        <Route exact path='/EUS' element={<HomeEUS/>}/>
        <Route exact path='/EUSView'element={<ViewEUS/>}/>
        <Route exact path='/EditEUS/:asset_tag_number'element={<EditEUS/>}/>
        <Route exact path='/CCTV' element={<HomeCctv/>}/>
        <Route exact path='/CCTVview' element={<ViewCctv/>}/>
        <Route exact path='/addCctvasset' element={<AddCctv/>}/>
        <Route exact path='/EditCctv/:asset_tag_number' element={<EditCctv/>}/>
        <Route exact path='/FIDS' element={<HomeFids/>}/>
        <Route exact path='/FIDSView' element={<ViewFids/>}/>
        <Route exact path='/EditFids/:asset_tag_number' element={<EditFids/>}/>
        <Route exact path='/AddFidsasset' element={<AddFids/>}/>
        <Route exact path='/MATV' element={<HomeMatv/>}/>
        <Route exact path='/addMatvasset' element={<AddMatv/>}/>
        <Route exact path='/MATVV' element={<ViewMatv/>}/>
        <Route exact path='/EditMatv/:asset_tag_number' element={<EditMatv/>}/>
        <Route exact path='/matvupdated' element={<UMATVupdated/>}/>
        <Route exact path='/matvsuccess' element={<SuccessMatv/>}/>
        <Route exact path='/cctvsuccess'element={<CCTVSuccess/>}/>
        <Route exact path='/cctvupdated'element={<CCTVUpdated/>}/>
        <Route exact path='/CCTVTAG' element={<CCTVTAG/>}/>
        <Route exact path='/EPOSTAG' element={<EPOSTAG/>}/>
        <Route exact path='/eussuccess'element={<EUSSUCCESSMSG/>}/>
        <Route exact path='/eusupdated'element={<EUSUPDATED/>}/>
        <Route exact path='/EUSTAG' element={<EUSTAG/>}/>
        <Route exact path='/fidssuccess'element={<FIDSSUCCESS/>}/>
        <Route exact path='/FIDSTAG' element={<FIDSTAG/>}/>
        <Route exact path='/fidsupdated'element={<FIDSUPDATED/>}/>
        <Route exact path='/MATVTAG'element={<MATVTAG/>}/>
        <Route exact path='/SERVERTAG'element={<SERVERTAG/>}/>
        <Route path="/Summary" element={<Finder />} />
        <Route path="/laptop"element={<Homelaptop/>}/>
        <Route path="/addlaptop"element={<Addlaptop/>}/>
        <Route path="/laptoptag"element={<LAPTOPTAG/>}/>
        <Route path='/viewlaptop'element={<Viewlaptop/>}/>
        <Route path='/editlaptop/:asset_tag_number'element={<Editlaptop/>}/>
        <Route path='/laptopupdated' element={<LaptopUpdated/>}/>
        <Route path="/cctv1home" element={<HomeCctv1/>}/>
        <Route path="/cctv-ping" element={<CctvPing/>}/>
      </Routes>
      </Router>
    </div>
  );
};

export default App;
