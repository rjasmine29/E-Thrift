import  React, { useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { getSearch } from '../../helpers/requests';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import './searchbar.css';

const SearchBar = ({setCategory}) => {
    const query = useRef();
    const [category, setCat] = useState('All');

    

    const handleSearch = async (e) => {
        e.preventDefault();
        const queryVal = query.current.value;
        // send value to the fetch function 
        let data = await getSearch(queryVal, category) 
        setCategory(data)
    }

    const handleChange = (e) => {
        setCat(e.target.value);
    };


  return (
  <div>

      <form className='search-bar' onSubmit={handleSearch}>
        <TextField 
            className='search-bar'
            autoFocus={true}
            // this is mui specific
            inputRef={query}
            id="outlined-full-width"
            label='Search for stuff'
            style={{ margin: 8 }}
            placeholder='Search for stuff'
            required={true}
            sx={{width: 5 / 6,}}
            margin='normal'
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon />
                    </InputAdornment>
                ), 
                endAdornment: (
                    <InputAdornment position='end'>
                        <InputLabel 
                        id='cat-selector-label'
                        className='cat-sel-label'
                        // sx={{ m: 1 }}
                        >Category:</InputLabel>
                        <Select 
                            className='cat-select'
                            role='cat-select'
                            labelId='cat-selector-label'
                            id = 'cat-selector'
                            value={category}
                            label="Category"
                            onChange={handleChange}
                            sx={{ mr: 2, ml: 0.5, px: 1.5}}
                        >
                            
                           <MenuItem value='All'>All</MenuItem>
                           <MenuItem value='Clothes'>Clothes</MenuItem> 
                           <MenuItem value='Furniture'>Furniture</MenuItem> 
                           <MenuItem value='Entertainment'>Entertainment</MenuItem> 
                           <MenuItem value='Mischelaneous'>Mischelaneous</MenuItem> 
                           <MenuItem value='Ornaments'>Ornaments</MenuItem>
                           <MenuItem value='Other'>Other</MenuItem>  

 
                        </Select>
                        <Button role='form-submit' className='search-btn' variant='contained' type='submit'>
                            Search
                        </Button>
                    </InputAdornment>
                ), 
                // classes: {
                //     root: classes.root, 
                //     focused: classes.focused, 
                //     notchedOutline: classes.notchedOutline, 
                // },
            }}
            variant='outlined'
        />
      </form>
  </div>);
};

export default SearchBar;
