import { useState } from "react";
import "./Publish.css";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate();
  const [offer, setOffer] = useState({
    file: "",
    title: "",
    description: "",
    brand: "",
    size: "",
    color: "",
    condition: "",
    city: "",
    price: "",
  });
  const formData = new FormData();
  formData.append("picture", offer.picture);
  formData.append("title", offer.title);
  formData.append("description", offer.description);
  formData.append("brand", offer.brand);
  formData.append("size", offer.size);
  formData.append("color", offer.color);
  formData.append("condition", offer.condition);
  formData.append("city", offer.city);
  formData.append("price", offer.price);
  const token = Cookies.get("token");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState("");
  const addOffer = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/offers/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <form className="addOffer" onSubmit={addOffer}>
      <h1>Vends tes articles</h1>
      {error && <p>{error}</p>}
      <div className="image">
        {picture ? (
          <div className="divImage">
            <img src={picture} alt="photo" />
            <FontAwesomeIcon
              icon={faCross}
              className="cross"
              onClick={() => {
                setPicture(null);
                setOffer((offer) => ({
                  ...offer,
                  picture: null,
                }));
              }}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="picture">Décris ton article</label>
            <input
              type="file"
              id="picture"
              placeholder="Ajouter une photo"
              value={offer.file}
              onChange={(event) => {
                setOffer((offer) => ({
                  ...offer,
                  picture: event.target.files[0],
                }));
                setPicture(URL.createObjectURL(event.target.files[0]));
              }}
            />
            <FontAwesomeIcon icon={faCross} className="cross" />
          </div>
        )}
      </div>
      <div>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={offer.title}
            placeholder="ex: Chemise Sézanne verte"
            onChange={(event) => {
              setOffer((offer) => ({ ...offer, title: event.target.value }));
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Décris ton article</label>
          <input
            type="text"
            id="description"
            value={offer.description}
            placeholder="ex: porté quelquefois, taille correctement"
            onChange={(event) => {
              setOffer((offer) => ({
                ...offer,
                description: event.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="brand">Marque</label>
          <input
            type="text"
            id="brand"
            value={offer.brand}
            placeholder="ex: Zara"
            onChange={(event) => {
              setOffer((offer) => ({ ...offer, brand: event.target.value }));
            }}
          />
        </div>
        <div>
          <label htmlFor="size">Taille</label>
          <input
            type="text"
            id="size"
            value={offer.size}
            placeholder="ex: L / 40 / 12"
            onChange={(event) => {
              setOffer((offer) => ({ ...offer, size: event.target.value }));
            }}
          />
        </div>
        <div>
          <label htmlFor="color">Couleur</label>
          <input
            type="text"
            id="color"
            value={offer.color}
            placeholder="ex: Fushia"
            onChange={(event) => {
              setOffer((offer) => ({ ...offer, color: event.target.value }));
            }}
          />
        </div>
        <div>
          <label htmlFor="condition">Etat</label>
          <input
            type="text"
            id="condition"
            value={offer.condition}
            placeholder="ex: Neuf avec étiquette"
            onChange={(event) => {
              setOffer((offer) => ({
                ...offer,
                condition: event.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label htmlFor="city">Lieu</label>
          <input
            type="text"
            id="city"
            value={offer.city}
            placeholder="ex: Paris"
            onChange={(event) => {
              setOffer((offer) => ({ ...offer, city: event.target.value }));
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="price">Prix</label>
        <input
          type="text"
          id="price"
          value={offer.price}
          placeholder="ex: 0.00 €"
          onChange={(event) => {
            setOffer((offer) => ({ ...offer, price: event.target.value }));
          }}
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
};
export default Publish;
