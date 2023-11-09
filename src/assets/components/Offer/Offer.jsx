import "./Offer.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  console.log(id);
  useEffect(() => {
    const fletchData = async () => {
      const response = await axios.get(`http://localhost:3000/offers/${id}`);
      setData(response.data);
      setIsLoading(false);
    };
    console.log(data);
    fletchData();
  }, []);

  return isLoading ? (
    <p>Chargement en cours</p>
  ) : (
    <main className="offer">
      <section>
        <img src={data.product_image.secure_url} alt="" />
        <div className="infosOffer">
          <p>{data.product_price} €</p>
          <div>
            <p>Marque</p>
            <p>{data.product_details[0].MARQUE}</p>
          </div>
          <div>
            <p>Taille</p>
            <p>{data.product_details[1].TAILLE}</p>
          </div>
          <div>
            <p>Etat</p>
            <p>{data.product_details[2].ETAT}</p>
          </div>
          <div>
            <p>Couleur</p>
            <p>{data.product_details[3].COULEUR}</p>
          </div>
          <div>
            <p>Emplacement</p>
            <p>{data.product_details[4].EMPLACEMENT}</p>
          </div>
          <div>
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
            <div>
              <img src={data.owner.account.secure_url} alt="profilPicture" />
              <p>{data.owner.account.username}</p>
            </div>
            <button>Acheter</button>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Offer;
