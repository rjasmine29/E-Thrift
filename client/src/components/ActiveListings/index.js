import React, { useState } from "react";
import ActiveItemCard from "../ActiveItemCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./style.css";

const ActiveListings = ({ setActiveFragment, activeItems, isLoading }) => {
  const [renderItems, setRenderItems] = useState(null);

  if (renderItems === null) {
    if (activeItems.data) {
      const items = activeItems.data.map((item, index) => {
        const img = activeItems.image.find(
          (image) => image.item_id === item.id
        );

        return (
          <ActiveItemCard
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            category={item.category}
            description={item.description}
            image_url={img.img_url}
            image_id={item.image_id}
          />
        );
      });
      setRenderItems(items);
    }
  }

  return (
    <div className="active-items-fragment">
      <h1>Active Items</h1>
      {isLoading && <div className="loading-listings">...loading</div>}
      {!isLoading && (
        <div className="active-listings-container">{renderItems}</div>
      )}
      <ArrowBackIcon aria-label='arrowback' onClick={() => setActiveFragment("")} />
    </div>
  );
};

export default ActiveListings;
