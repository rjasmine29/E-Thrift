import React from 'react';
// import Carousel from 'react-elastic-carousel'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components'
import Card from '../../components/Card';
import "../../App.css"
import { breakpoints } from '@mui/system';

function Home() {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 700, itemsToShow: 3 },
        { width: 1000, itemsToShow: 4 }
    ];

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div className='home-container'>
            <h1>THRIFT & DONATE.</h1>
            <p> Sell your items here...</p>
            <img src="../../images/homeImage.png" alt="frontimage" className='homeI' />
            <div className="description">
                <p> Description: E-THRIFT is a....</p>
            </div>
            <div className='carousel'>
                <h3>Popular items..</h3>
                {/* <Carousel breakPoints={breakPoints}>
                    <div className="cardOne">
                        <img src="../../images/homeImage.png" alt="frontimage" /> </div>
                    <div className="cardTwo">
                        <img src="../../images/7683.jpg" alt="chair" /> </div>
                    <Card cardImage="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                    
                </Carousel> */}

                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    <div><img src="../../assets/homeImage.png" /></div>
                    {/* <div><img src="../../assets/homeImage.png" /></div> */}
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>
                </Carousel>;
            </div>
        </div>
    )
}

export default Home