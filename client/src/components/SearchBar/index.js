import  React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { getSearch } from '../../helpers/requests';

const SearchBar = () => {
    const query = useRef();

    const handleSearch = (e) => {
        e.preventDefault();
        const queryVal = query.current.value;
        console.log(queryVal)
        // send value to the fetch function 
        getSearch(queryVal)
    }
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
            fullWidth
            margin='normal'
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon />
                    </InputAdornment>
                ), 
                endAdornment: (
                    <InputAdornment position='end'>
                        <Button className='search-btn' variant='contained' type='submit'>
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
