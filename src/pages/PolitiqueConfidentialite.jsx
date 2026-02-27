import React from "react";
import "./legalPages.css";

const PolitiqueConfidentialite = () => {
  return (
    <div className="legal-container">
      <h2>Politique de confidentialité</h2>

      <p>
        Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre plateforme <strong>Chghoulna</strong>.
      </p>

      <h4>1. Collecte des données</h4>
      <p>Nous collectons les informations suivantes lorsque vous vous inscrivez :</p>
      <ul>
        <li>Nom et prénom</li>
        <li>Adresse e-mail</li>
        <li>Ville et numéro de téléphone</li>
        <li>Photo de profil et biographie</li>
      </ul>

      <h4>2. Utilisation des données</h4>
      <p>Vos données sont utilisées pour :</p>
      <ul>
        <li>Créer et gérer votre compte</li>
        <li>Vous mettre en relation avec d'autres utilisatrices</li>
        <li>Améliorer l'expérience utilisateur</li>
        <li>Vous envoyer des notifications importantes</li>
      </ul>

      <h4>3. Partage des données</h4>
      <p>
        Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement :
      </p>
      <ul>
        <li>Avec votre consentement explicite</li>
        <li>Pour des raisons légales (obligation judiciaire)</li>
      </ul>

      <h4>4. Sécurité</h4>
      <p>
        Nous mettons en œuvre des mesures techniques pour protéger vos données contre tout accès non autorisé.
      </p>

      <h4>5. Vos droits</h4>
      <p>Vous avez le droit de :</p>
      <ul>
        <li>Accéder à vos données</li>
        <li>Demander leur correction ou leur suppression</li>
        <li>Retirer votre consentement à tout moment</li>
      </ul>

      <h4>6. Contact</h4>
      <p>
        Pour toute question concernant vos données personnelles, contactez-nous à l'adresse :
        <br />
        <a href="mailto:support@chghoulna.com">support@chghoulna.com</a>
      </p>
    </div>
  );
};

export default PolitiqueConfidentialite;
