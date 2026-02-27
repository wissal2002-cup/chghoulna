// components/JoinCommunity.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./JoinCommunity.css";

const JoinCommunity = () => {
  const navigate = useNavigate();

  return (
    <section className="join-community">
      <h2>Rejoignez notre communauté aujourd'hui</h2>
      <p>
        Que vous cherchiez des services de qualité ou que vous souhaitiez proposer vos
        compétences, Chghoulna est la plateforme qu'il vous faut.
      </p>
      <div className="buttons">
        <button onClick={() => navigate("/Services")}>Trouver un service</button>
        <button className="outlined" onClick={() => navigate("/creer-annonce")}>
          Proposer mes services
        </button>
      </div>
    </section>
  );
};

export default JoinCommunity;
