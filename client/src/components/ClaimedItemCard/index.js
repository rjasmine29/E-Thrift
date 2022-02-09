import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TwitterShareButton, TwitterIcon } from "react-share";

function CLaimedItemCard({ id, name, seller, price, category, description, image }) {

  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/view/${id}`)
  }

  let set = new Set()

  let imageString;

  image && image.map((image, key) => {

    if (image.item_id === id && !set.has(image.item_id)) {
      set.add(image)
      imageString = `https://res.cloudinary.com/deizaqii7/${image.img_url}`
      return (
        <div key={key}>
          {"https://res.cloudinary.com/deizaqii7/" + image.img_url}
        </div>
      )
    }
  })

  return (

    <Card sx={{ maxWidth: 345 }} onClick={handleShowDetails} >
      <CardMedia
        component="img"
        height="140"
        image={imageString}
        alt="item-image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <a onClick={() => navigate(`/view/${id}`)}>{name}</a>
        </Typography>
        {showDetails &&
          <>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="subtitle.2" color="text.secondary">
              {seller}
            </Typography>
            <Typography variant="subtitle.2" color="text.secondary">
              {price}
            </Typography>
          </>
        }

      </CardContent>
      <CardActions >
       
        <Button size="small"><TwitterShareButton
          children={"SHARE TO TWITTER"}
          url={`http://localhost:3000/view/${id}`}
          title={'Check out this ' + name + '!'}
        /></Button>
        <Button size="small" onClick={() => { setShowDetails(!showDetails) }}>More Details</Button>
      </CardActions>
    </Card>
  );
}

export default CLaimedItemCard;

