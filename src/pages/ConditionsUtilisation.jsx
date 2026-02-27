import React from "react";
import "./legalPages.css"; // importe le fichier CSS

const ConditionsUtilisation = () => {
  return (
    <div className="legal-container">
      <h2>Conditions d'utilisation</h2>
      <p>
        Bienvenue sur notre plateforme. En utilisant nos services, vous acceptez les conditions suivantes :
      </p>
      <ul>
        <li>Respect des autres utilisateurs.</li>
        <li>Ne pas publier de contenu inapproprié.</li>
        <li>Respecter les règles de sécurité.</li>
        {/* Ajoute plus si nécessaire */}
      </ul>
    </div>
  );
};

export default ConditionsUtilisation;
