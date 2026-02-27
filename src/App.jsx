import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stats from './pages/Statistiques';
import ServiceList from './pages/ServicesList';
import Services from './pages/ServicePage';
import HowItWorks from './pages/HowItWorks';
import JoinCommunity from "./pages/JoinCommunity";
import TrustSection from "./pages/TrustSection";
import Inscription from './pages/Inscription';
import Connexion from "./pages/Connexion";
import CommentCaMarche from "./pages/CommentCaMarche";
import ContactezNous from "./pages/ContactezNous";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CreerAnnonce from './pages/CreerAnnonce';
import PrivateRoute from "./components/PrivateRoute";
import MessageForm from './components/MessageForm';
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";



/*
import Profile from './pages/Profile';
import Reservation from './pages/Reservation';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
*/

function App() {
  return (
    <Router>
      <Header />
      
        <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="/CommentCaMarche" element={<CommentCaMarche />} />
        <Route path="/ContactezNous" element={<ContactezNous />} />
        <Route path="/profile/:id" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
        <Route path="/profile/edit" element={ <PrivateRoute> <EditProfile /> </PrivateRoute>} />
        <Route path="/creer-annonce" element={<CreerAnnonce />} />
        <Route path="/modifier-annonce/:id" element={<CreerAnnonce />} />
       <Route path="/contact/:receiverId" element={<PrivateRoute><MessageForm /></PrivateRoute>} />
        <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
<Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />      
        <Route path="/Services" element={<Services />} />

          <Route path="/" element={
            <>
          <Home />
          <Stats />
           <ServiceList />
           <HowItWorks />
           <JoinCommunity />
           <TrustSection />
          </>} 

          />

          {/*
          <Route path="/services" element={<ServicesList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservation/:id" element={<Reservation />} />
          <Route path="*" element={<NotFound />} />
          */}
        </Routes>

      <Footer />
    </Router>
  );
}

export default App;
