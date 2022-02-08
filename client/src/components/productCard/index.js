import * as React from 'react';
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

export default function ProductCard() {
    // required item information: item.id, item.name, item.price, item.category, item.address_id
    // image information: image.image_url, image.image_id


  return (
    <div role='product-card'>
      <Card sx={{ maxWidth: 345 }}>
          
        <CardMedia
          component="img"
          height="140"
          image="https://static.wikia.nocookie.net/ssb-tourney/images/2/2e/Oogway-white.png"
          alt="item-image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Item title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            item description
          </Typography>
          <Typography variant='subtitle.2'>
              Distance <BsFillGeoAltFill />
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
  );
}

