import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-5 border-top" id="footer">
      <div class="parent">

<div class="div1"> 
    
     <Link to="/" className="logo">
                  <img src={logo} alt="Logo" />
        </Link>
        <p>Chghoulna est une plateforme marocaine qui connecte les femmes pour des services de proximite de qualite.</p>

</div>
<div class="div2">
   <h5>Nos engagements</h5> 
 <ul className="list-unstyled">
  <li>✔️ Services fiables</li>
  <li>✔️ Pour les femmes, par les femmes</li>
  <li>✔️ Sécurité & proximité</li>
</ul>
     </div>
<div class="div3"> 
    <h5>Informations</h5>
   <Link to="/CommentCaMarche">À propos</Link><br/><br/>
<Link to="/conditions-utilisation">Conditions d'utilisation</Link><br/><br/>
<Link to="/politique-confidentialite">Politique de confidentialité</Link>
</div>
<div class="div4"> 
    <h5>Contact</h5>
    <p>123 Avenue Mohammed V, Rabat</p>
    <p>+212 522 123 456</p>
    <p>Contact@Chghoulna.ma</p>
    
</div>
<div class="div5"> 
    <span></span>
    <p className="mb-0">
        &copy; {new Date().getFullYear()} Chghoulna. Tous droits réservés.
        </p>
</div>
</div>
    </footer>
  );
};

export default Footer;
