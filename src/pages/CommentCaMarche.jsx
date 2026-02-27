import React from "react";

const CommentCaMarche = () => {
  const steps = [
    {
      title: "1. Inscrivez-vous",
      description:
        "Créez votre compte en quelques étapes simples pour rejoindre notre communauté.",
    },
    {
      title: "2. Publiez une annonce",
      description:
        "Proposez vos services ou demandez l’aide dont vous avez besoin.",
    },
    {
      title: "3. Connectez-vous",
      description:
        "Communiquez avec d'autres membres et organisez vos services.",
    },
    {
      title: "4. Évaluez vos expériences",
      description:
        "Partagez votre feedback pour aider à maintenir la qualité de notre communauté.",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-3">Comment ça marche</h2>
      <p className="text-center mb-5">
        Chghoulna est une plateforme solidaire 100% féminine qui permet aux femmes au Maroc
        de proposer ou demander des services entre elles.
      </p>

      {steps.map((step, index) => (
        <div className="card shadow-sm mb-4" key={index}>
          <div className="card-body">
            <h5 className="card-title text-primary">{step.title}</h5>
            <p className="card-text">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCaMarche;
