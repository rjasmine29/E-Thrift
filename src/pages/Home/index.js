import React from 'react';
import Carousel from 'react-elastic-Carousel'
import styled from 'styled-components'
import Card from '../../components/Card';
import "../../App.css"
import { breakpoints } from '@mui/system';




function Home() {
  const breakPoints = [
    {width: 1, itemsToShow:1},
    {width: 500, itemsToShow:2},
    {width: 700, itemsToShow:3},
    { width: 1000, itemsToShow: 4}
  
  ];
    return (
        <div className='home-container'>
            <h1>THRIFT & DONATE.</h1>
      <p> Sell your items here...</p>
     
{/*    DO CAROUSEL INSTEAD  
      <div class="card">
      <p> Recently viewed </p>
      <div class="row">
  <div class="column">
    <div class="card">
      <h3>Card 1</h3>
      <p>IMG./..</p>
      <p>Price: </p>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <h3>Card 2</h3>
      <p>Some text</p>
      <p>Price: </p>
    </div>
  </div>
  
  
  <div class="column">
    <div class="card">
      <h3>Card 3</h3>
      <p>Some text</p>
      <p>Price: </p>
    </div>
  </div>
</div>


</div> */}

 
    <Carousel breakPoints={breakPoints}>
      <Card number="1" />
      <Card number= "2" />
      <Card number= "3"/>
      <Card number= "4"/>
      <Card number= "5"/>
    
    </Carousel>


        </div>

    )
}

export default Home; breakpoints;
