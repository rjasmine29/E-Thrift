import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AiFillSkin, AiFillShopping, AiTwotoneCustomerService, AiTwotoneExperiment, AiTwotoneGift } from 'react-icons/ai';
import ChairIcon from '@mui/icons-material/Chair';
import axios from 'axios';
import Divider from '@mui/material/Divider';

export const CatBar = ({setCategory}) => {

    const [cat, setCat] = useState('All')
  
    useEffect(() => {
        const getCategory = async () => {

            if (cat == 'All') {
                const {data} = await axios.get(`http://127.0.0.1:8000/items/get_unclaimed/`)
                return data
                // setCat(jsonCat)
               
            } else {
                const {data} = await axios.get(`http://127.0.0.1:8000/items/get_by_category_unsold/${cat}/`)
                return data

                // setCat(jsonCat)
            }
        }
        (async () => {
            const data = await getCategory();
            setCategory(data)
        })()

    }, [cat])
    

  return (
    <div aria-label = 'cat_container' className='cat_container' id='categories' alignItems='center'>

        <Stack direction='row' direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Button aria-label='all' variant='text' onClick={() => setCat("All")}><AiFillShopping/>All</Button>
                <Button aria-label='clothes' variant='text'  onClick={() => setCat("Clothes")}><AiFillSkin/>Clothes</Button>
                <Button aria-label='furniture' variant='text' onClick={() => setCat("Furniture")}><ChairIcon fontSize='small'/>Furniture</Button>
                <Button aria-label='entertainment' variant='text' onClick={() => setCat("Entertainment")}><AiTwotoneCustomerService/>Entertainment</Button>
                <Button aria-label='mis' variant='text' onClick={() => setCat("Mischelaneous")}><AiTwotoneExperiment/>Mischelaneous</Button>
                <Button aria-label='orn' variant='text' onClick={() => setCat("Ornaments")}><AiTwotoneGift/>Ornaments</Button>
                <Button aria-label='orn' variant='text' onClick={() => setCat("Other")}><AiTwotoneGift/>Other</Button>
        </Stack>


    </div>
    );
};

export default CatBar;
