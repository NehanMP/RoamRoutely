import React from "react";
import "./PlaceDetails.css";
import { AiOutlineHome, AiOutlinePhone } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  function StarRating({ rating }) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}  className="gold-star">&#9733;</span>); // filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // empty star
      }
    }
    return <div>{stars}</div>;
  }
  return (
    <div className="card">
      <img
        className="card-img"
        src={
          place.photo
            ? place.photo.images.large.url
            : "https://img.freepik.com/free-vector/neon-icon-dish_1262-15632.jpg?w=740&t=st=1708764919~exp=1708765519~hmac=801be7948fa81ea3fd10049f3d8b9364a626211b7212d677c6da6286d144567b" // if no image posted at hotel/restraunt
        }
        alt={place.name}
      />
      <div className="card-content">
        <h5 className="card-title">{place.name}</h5>
        <div className="card-rating">
          <StarRating rating={place.rating} />
        </div>
        <div className="card-reviews">
          {place.num_reviews} review{place.num_reviews > 1 && "s"}
        </div>
        <div className="card-price">Price: {place.price_level}</div>
        <div className="card-ranking">Ranking: {place.ranking}</div>

        {place?.cuisine?.map(({ name }) => (
          <span className="card-cuisine">
            {name.replace(/([A-Z])/g, " $1").trim()}
          </span>
        ))}

        {place.address && (
          <div className="card-address">
            <AiOutlineHome /> {place.address}
          </div>
        )}
        {place.phone && (
          <div className="card-phone">
            <AiOutlinePhone /> {place.phone}
          </div>
        )}
        <div className="card-actions">
          <a href={place.web_url} target="_blank" rel="noopener noreferrer">
            learn more...
          </a>
          <a href={place.website} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
