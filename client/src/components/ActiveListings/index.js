import React from 'react';
import ActiveItemCard from '../ActiveItemCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './style.css';

const ActiveListings = ({ setActiveFragment, activeItems, isLoading }) => {

    const renderItems = activeItems.map((item) => { 
        return (
            <ActiveItemCard 
                id={item.id}
                name={item.name}
                price={item.price}
                category={item.category}
                description={item.description}
                image_url={item.image_url}
                image_id={item.image_id}
            />
        )
    });

    return (
        <>
            <h1>Active Items</h1>
            {isLoading &&
                <div className='loading-listings'>
                    ...loading
                </div>
            }
            {!isLoading && 
                <div className="active-listings-container">
                    {renderItems}
                </div>
            }
            <ArrowBackIcon onClick={setActiveFragment("")} />
        </>
    )
}

export default ActiveListings;