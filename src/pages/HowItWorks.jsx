import React from "react";
import { Search, MessageCircle, CalendarCheck } from "lucide-react"; // Optional icons
import "./HowItWorks.css";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>Comment ça marche</h2>
      <p className="subtitle">Trouvez le service dont vous avez besoin en quelques étapes simples</p>

      <div className="steps">
        <div className="step-card">
          <div className="icon"><Search /></div>
          <h3>1. Recherchez un service</h3>
          <p>Trouvez le service dont vous avez besoin parmi notre large sélection de prestataires qualifiés.</p>
        </div>

        <div className="step-card">
          <div className="icon"><MessageCircle /></div>
          <h3>2. Contactez la prestataire</h3>
          <p>Discutez directement avec la prestataire pour préciser vos besoins et convenir des détails.</p>
        </div>

        <div className="step-card">
          <div className="icon"><CalendarCheck /></div>
          <h3>3. Réservez en confiance</h3>
          <p>Confirmez votre réservation et profitez d’un service de qualité, assuré par des professionnelles vérifiées.</p>
        </div>
      </div>
    
      <button className="btns " >
        <Link to="/Inscription" style={{textDecoration:"none",color:"AppWorkspace"}}>S'inscrire maintenant</Link>
        </button>
    

    </section>
  );
};

export default HowItWorks;
