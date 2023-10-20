import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MentionLegales = () => {
  return (
    <div>
      <Header />
      <div className="w-[80%]  m-auto mt-20">
        <h1 className=" text-3xl">Mentions légales</h1>
        <h2 className="text-2xl mb-10 mt-10 font-bold">
          Informations légales :
        </h2>
        <p>
          <span className=" font-bold"> Propriétaire : </span>
          <span>SAS L'AUTRE COTE - RESTAURANT IL GIRASOLE</span>
        </p>
        <p>
          <span className=" font-bold"> WebMaster : </span>
          <span>David Long Bin</span>
        </p>
        <p>
          <span className=" font-bold"> Adresse : </span>
          <span>12 Quai Saint Nicolas 67000 Strasbourg</span>
        </p>
        <p>
          <span className=" font-bold"> Téléphone : </span>
          <span>06.29.84.84.36</span>
        </p>
        <p>
          <span className=" font-bold"> E-mail :</span>
          <span>david@ilgirasole.fr</span>
        </p>
        <p>
          <span className=" font-bold"> SIRET : </span>
          <span>82456208600036</span>
        </p>

        <h2 className="text-2xl mb-10 mt-10 font-bold">Hébergement</h2>
        <p>Le site est hébergé par Netlify sur https://www.netlify.com/</p>
        <h2 className="text-2xl mb-10 mt-10 font-bold">
          Propriété intellectuelle :
        </h2>
        <p>
          L'ensemble des éléments composant ce site est la propriété exclusive
          de Il Girasole. Toute reproduction ou représentation totale ou
          partielle de ce site, par quelconque procédé que ce soit, sans
          l'autorisation expresse de Il Girasole est interdite et constituerait
          une contrefaçon sanctionnée par les articles L.335-2 et suivants du
          Code de la propriété intellectuelle.
        </p>
        <h2 className="text-2xl mb-10 mt-10 font-bold">
          Données personnelles:
        </h2>
        <p>
          Les informations recueillies à partir du formulaire de réservation ou
          de tout autre formulaire sont enregistrées dans un fichier informatisé
          par Il Girasole pour la gestion de notre clientèle. Elles sont
          conservées pendant 2 ans et sont destinées au service marketing et au
          service commercial établis au sein de notre société. Conformément à la
          loi « informatique et libertés », vous pouvez exercer votre droit
          d'accès aux données vous concernant et les faire rectifier en
          contactant : david@ilgirasole.fr.
        </p>
        <h2 className="text-2xl mb-10 mt-10 font-bold">
          Limitation de responsabilité :
        </h2>
        <p>
          Les informations recueillies à partir du formulaire de réservation ou
          de tout autre formulaire sont enregistrées dans un fichier informatisé
          par Il Girasole pour la gestion de notre clientèle. Elles sont
          conservées pendant 2 ans et sont destinées au service marketing et au
          service commercial établis au sein de notre société. Conformément à la
          loi « informatique et libertés », vous pouvez exercer votre droit
          d'accès aux données vous concernant et les faire rectifier en
          contactant : david@ilgirasole.fr.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default MentionLegales;
