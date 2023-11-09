import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import imageHome from "../../../Images/imageHome.webp";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fletchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/offers");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        error.message;
      }
    };
    fletchData();
  }, []);
  return isLoading ? (
    <p>Chargement en cours</p>
  ) : (
    <main className="home">
      <section>
        <img src={imageHome} alt="vêtements" />
        <div>
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Commencer à vendre</button>
        </div>
      </section>
      <section>
        {data.map((article) => {
          return (
            <Link
              to={`/offer/${article._id}`}
              key={article._id}
              className="article"
            >
              <div>
                {/* <img
                  src={article.owner.account.avatar.secure_url}
                  alt="photoAvatar"
                /> */}
                <p>{article.owner.account.username}</p>
              </div>
              <img src={article.product_image.secure_url} alt="photoArticle" />
              <p>{article.product_price} €</p>
              <p>{article.product_details[1].TAILLE}</p>
              <p>{article.product_details[0].MARQUE}</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
};
export default Home;
