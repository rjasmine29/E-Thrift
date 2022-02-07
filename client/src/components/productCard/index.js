import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { BsFillGeoAltFill } from 'react-icons/bs'
import { Mapbox, NavBar, CatBar, SearchBar } from '../../components';
import "./productCard.css"

export default function ProductCard({ category, map, mapboxgl }) {
  // required item information: item.id, item.name, item.price, item.category, item.address_id
  // image information: image.image_url, image.image_id
  const [image, setImage] = useState([])

  console.log(category)

  useEffect(() => {
    const fetchData = async () => {
    
      setImage(category.image)
    }

    fetchData()
  }, [category])

  let set = new Set()
  let list = []
  const catMap = category.data?.map((cat, key) => {
    console.log(image)

    const getCoordinates = async () => {
      let data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cat.address}.json?types=address&access_token=pk.eyJ1IjoiamFraXJ1bGZ4IiwiYSI6ImNreXhrMTZucTA1aTYycXVvbnRyaDR3NGgifQ.zvjCM2eXQNf6ntofj0cwbQ`)
      const jsons = await data.json();
      list.push(jsons.features[0].geometry.coordinates)
      return jsons.features[0].geometry.coordinates
    }
    (async () => {
      let value = await getCoordinates();

      

      let marker = new mapboxgl.Marker()
        .setLngLat(value)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${cat.name}</h3>`))
        .addTo(map.current);
     

    })()



    let imageString;

    image && image.map((image, key) => {

      if (image.item_id == cat.id && !set.has(image.item_id)) {
        set.add(image)
        console.log(image)
        imageString = `https://res.cloudinary.com/deizaqii7/${image.img_url}`
        return (
          <div key={key}>
            {"https://res.cloudinary.com/deizaqii7/" + image.img_url}
          </div>
        )
      }
    })


    return (
      <div key={key}>
        <Card sx={{ maxWidth: 345 }}>

          <CardMedia
            component="img"
            height="140"
            image={imageString}

            alt="item-image"
          />
          <CardContent>

            <Typography gutterBottom variant="h5" component="div">
              {cat.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cat.description}
            </Typography>
            <Typography variant='subtitle.2'>
              {cat.address} <BsFillGeoAltFill />
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Button size="small">Share</Button>
            <Button size="small">More Details</Button>
          </CardActions>
        </Card>

      </div>
    )
  })
  return (
    <div className="productCard">
      {Object.keys(category).length > 0 && category.data && category.data.length ?
        catMap
        :
        <h1>No posts yet!</h1>
      }
    </div>

  );
}

