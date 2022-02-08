import React from 'react';
import ActiveItemCard from '../ActiveItemCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './style.css';

const ActiveListings = ({ setActiveFragment, activeItems, isLoading }) => {

    //const images = activeItems.image;
    
    if (activeItems) {
        const items = activeItems.data;
        // items.map(item => console.log(item))
    }

    // items.map(item => {
    //     console.log(item)
    //     console.log(images.find(img => img.item_id === item.id))
    // })
    //console.log(`items: ${items}`)
    // const renderItems = items.map((item) => { 
    //     // const img = images.find(img => img.item_id === item.id)
    //     return (
    //         <ActiveItemCard 
    //             id={item.id}
    //             name={item.name}
    //             price={item.price}
    //             category={item.category}
    //             description={item.description}
    //             // image_url={img.img_url}
    //             image_id={item.image_id}
    //         />
    //     )
    // });

    return (
        <>
            <h1>Active Items</h1>
            {isLoading &&
                <div className='loading-listings'>
                    ...loading
                </div>
            }
            {!activeItems && 
                <div className="active-listings-container">
                    {console.log(`items length is: ${activeItems.length}`)}
                    {/* {renderItems} */}
                </div>
            }
            <ArrowBackIcon onClick={()=>setActiveFragment("")} />
        </>
    )
}

export default ActiveListings;