// components/TrustSection.jsx
import React from "react";
import "./TrustSection.css";
import {
  Shield,
  CreditCard,
  UserCheck,
  Headphones,
} from "lucide-react";

const TrustSection = () => {
  return (
    <section className="trust-section">
      <h3>Ils nous font confiance</h3>
      <div className="trust-items">
        <div className="trust-item">
          <Shield className="trust-icon" />
          <p>Protection des données</p>
        </div>
        <div className="trust-item">
          <CreditCard className="trust-icon" />
          <p>Paiement sécurisé</p>
        </div>
        <div className="trust-item">
          <UserCheck className="trust-icon" />
          <p>Prestataires vérifiés</p>
        </div>
        <div className="trust-item">
          <Headphones className="trust-icon" />
          <p>Support 7j/7</p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
