import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AiFillSkin, AiFillShopping, AiTwotoneCustomerService, AiTwotoneExperiment, AiTwotoneGift } from 'react-icons/ai';

export const CatBar = () => {
    const [category, setCategory] = useState('All')
    console.log(category)
    useEffect(() => {
        const getCategory = async () => {

            if (category == 'All') {
                const cat = await fetch(`http://127.0.0.1:8000/items`)
                const jsonCat = await cat.json();
                console.log(jsonCat)
            } else {
                const cat = await fetch(`http://127.0.0.1:8000/items/get_by_category/${category}/`)
                const jsonCat = await cat.json();
                console.log(jsonCat)
            }
        }
        getCategory()

    }, [category])

  return (
    <div className='cat_container' id='categories'>

        <Stack direction='row' spacing={2}>
            {/* <Link to='/categories/all'> */}
                <Button variant='text' onClick={(e) => setCategory("All")}><AiFillShopping/>All</Button>
            {/* </Link>
            <Link to='/categories/clothes'> */}
                <Button variant='text'  onClick={(e) => setCategory("Clothes")}><AiFillSkin/>Clothes</Button>
            {/* </Link>
            <Link to='/categories/furniture'> */}
                <Button variant='text' onClick={(e) => setCategory("Furniture")}>Furniture</Button>
            {/* </Link>
            <Link to='/categories/entertainment'> */}
                <Button variant='text' onClick={(e) => setCategory("Entertainment")}><AiTwotoneCustomerService/>Entertainment</Button>
            {/* </Link>
            <Link to='/categories/misc'> */}
                <Button variant='text' onClick={(e) => setCategory("Mischelaneous")}><AiTwotoneExperiment/>Mischelaneous</Button>
            {/* </Link>
            <Link to='/categories/ornaments'> */}
                <Button variant='text' onClick={(e) => setCategory("Ornaments")}><AiTwotoneGift/>Ornaments</Button>
            {/* </Link> */}
        </Stack>

    </div>
    );
};

export default CatBar;
