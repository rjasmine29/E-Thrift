<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import CLaimedItemCard from '../ClaimedItemCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
=======
import React, { useState } from "react";
import ClaimedItemCard from "../ClaimedItemCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
>>>>>>> upstream/staging

import "./style.css";

const ClaimedItems = ({ setActiveFragment, claimedItems, isLoading }) => {
  const [renderItems, setRenderItems] = useState(null);

  if (renderItems === null) {
    if (claimedItems.data) {
      //console.log(activeItems)
      const items = claimedItems.data.map((item, index) => {
        console.log(item);
        const img = claimedItems.image.find(
          (image) => image.item_id === item.id
        );
        console.log(img);

<<<<<<< HEAD
    
    const [image, setImage] = useState([])
  
  
  useEffect(() => {
    const fetchData = async () => {

      setImage(claimedItems.image)
      
    }

    fetchData()
  }, [claimedItems])

    const renderItems = claimedItems.data && claimedItems.data.map((item, key) => { 
        
        return (
            <CLaimedItemCard 
                id={item.id}
                seller={item.seller}
                name={item.name}
                price={item.price}
                category={item.category}
                description={item.description}
                image={image}
                key={key}
            />
        )
    });

    return (
        <>
            <div className="active-items-header">
                <ArrowBackIcon className="go-back-btn" onClick={() => setActiveFragment("")} />
            <h2>Claimed Items</h2>
        </div>
            {isLoading &&
                <div className='loading-listings'>
                    ...loading
                </div>
            }
            {!isLoading && (
                <div className="claimed-items-container">
                    
                    {renderItems}
            </div>
            )
                
            }
        </>
    )
}
=======
        return (
          <ClaimedItemCard
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            category={item.category}
            description={item.description}
            image_url={img ? img.img_url : null}
            image_id={item.image_id}
          />
        );
      });
      setRenderItems(items);
    }
  }

  return (
    <div className="claimed-items-fragment">
      <div className="claimed-items-header">
        <ArrowBackIcon
          className="go-back-btn"
          aria-label="go-back-btn"
          aria-hidden={false}
          onClick={() => setActiveFragment("")}
        />
        <h2>claimed Items</h2>
      </div>
      {isLoading && <div className="loading-items" aria-label="loading-items">...loading</div>}
      {!isLoading && (
        <div className="claimed-items-container">{renderItems}</div>
      )}
    </div>
  );
};
>>>>>>> upstream/staging

export default ClaimedItems;
