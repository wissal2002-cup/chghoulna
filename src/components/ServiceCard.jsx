// components/ServiceCard.jsx
import React from "react";
import "./ServiceCard.css";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";

const ServiceCard = ({ service }) => {
const navigate=useNavigate();
const isLoggedIn = !!localStorage.getItem("token");




   const initials = service.user?.name
   ?service.user.name
   .split("")
   .map( (n) => n[0])
   .join("")
   .toLowerCase()
 :"U";
 const handleProfileClick = ()=>{
  if (service.user?.id){
    navigate(`/profile/${service.user.id}`);
  };
 }


const handlePay = async () => {
if (!isLoggedIn) {
    alert("Vous devez être connecté pour réserver ce service.");
    return;
  }
  try {
    const res = await api.post("/payment/checkout", {
      service: service.title,
      amount: service.price,
      success_url: window.location.origin + "/success",
      cancel_url: window.location.href
    });
    window.location.href = res.data.url;
  } catch (err) {
    alert("Erreur de paiement");
    console.error(err);
  }
};


  return (
    <div className="service-card">
      <div className="service-header">
        <h3>{service.title}</h3>
        <span className="price">{service.price}</span>
      </div>
      <div className="service-meta">
        <span className={`type ${service.type === "Offre" ? "offer" : "demand"}`}>
          {service.type}
        </span>
        <span>{service.city}</span>
      </div>
      <p className="description">{service.description}</p>
      <div className="footer">
        <span className="date">
          Posté le {new Date(service.created_at).toLocaleDateString("fr-FR")}
        </span>

        <div 
        className="user" 
        onClick={handleProfileClick} 
        style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"0.5rem"}}
        >
          {service.user?.photo_url ?(
                  <img 
                  src={`http://127.0.0.1:8000${service.user?.photo_url}`} 
                  alt={service.user.name}
                  className="user-icon"
style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}

          />
          ) : (
            <div className="user-icon"
             style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#aaa",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
              }}
              >
                   {initials}
              </div>
          )}
         {isLoggedIn && (
  <button
  className="btn btn-outline-secondary btn-sm"
  onClick={(e) => {
    e.stopPropagation(); // ✅ prevents parent div click
    navigate(`/contact/${service.user.id}`);
  }}
>
  Contacter
</button>
)}


  {service.user?.name || "utilisateur"}
        </div>
        <button className="btn btn-success" style={{width:"90px",height:"40px",fontSize:"10px"}}onClick={handlePay}>
  Payer maintenant
</button>

      </div>
    </div>
  );
};

export default ServiceCard;
