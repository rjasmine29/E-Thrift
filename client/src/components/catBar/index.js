import React from 'react';
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AiFillSkin, AiFillShopping, AiTwotoneCustomerService, AiTwotoneExperiment, AiTwotoneGift } from 'react-icons/ai'

export const CatBar = () => {

  return (
    <div className='cat_container' id='categories'>
        <Stack direction='row' spacing={2}>
            <Link to='/categories/all'>
                <Button variant='text'><AiFillShopping/>All</Button>
            </Link>
            <Link to='/categories/clothes'>
                <Button variant='text'><AiFillSkin/>Clothes</Button>
            </Link>
            <Link to='/categories/furniture'>
                <Button variant='text'>Furniture</Button>
            </Link>
            <Link to='/categories/entertainment'>
                <Button variant='text'><AiTwotoneCustomerService/>Entertainment</Button>
            </Link>
            <Link to='/categories/misc'>
                <Button variant='text'><AiTwotoneExperiment/>Mischelaneous</Button>
            </Link>
            <Link to='/categories/ornaments'>
                <Button variant='text'><AiTwotoneGift/>Ornaments</Button>
            </Link>
        </Stack>

    </div>
    );
};

export default CatBar;