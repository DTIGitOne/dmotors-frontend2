import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from 'react';
import { brandNames } from '../Data/Brands';
import { brandModels } from '../Data/BrandModels';
import { OutlinedInput, InputLabel, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { yearRange } from '../Constants/constants';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { findCars } from '../API/API';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageNumber } from '../Redux/Slices/PageSlice';

// Brand
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

const CarTypeInput = () => {
  const [selectedBrand, setSelectedBrand] = useState(''); // Brand
  const [selectedModel, setSelectedModel] = useState(undefined); // Model
  const [filteredModels, setFilteredModels] = useState([]); // Filtered Models
  const [selectedYear, setSelectedYear] = useState(undefined); // Year
  const [milageValue, setMileageValue] = useState(undefined); // Mileage
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const dispatch = useDispatch();

  // Brand
  const handleBrandChange = (event, newValue) => {
    setSelectedBrand(newValue);
    setSelectedModel(null); // Reset selected model when brand changes
    if (newValue) {
      const brandModel = brandModels.find((brand) => brand.id === newValue.id);
      setFilteredModels(brandModel ? brandModel.models : []);
    } else {
      setFilteredModels([]);
    }
  };

  const handleModelChange = (event, newValue) => {
    setSelectedModel(newValue);
  };

  const navigate = useNavigate();

  // Show series
  const validBrandIds = new Set([3, 5, 6, 7, 8, 31, 41, 63]);

  // Search
  const handleSearch = async () => {
    const vehicle = {
      Brand: selectedBrand?.title,
      Model: selectedModel?.model,
      Year: selectedYear ? parseInt(selectedYear, 10) : undefined, // Correct radix value
      Milage: milageValue ? parseInt(milageValue, 10) : undefined, // Correct radix value
      minPrice: minPrice ? parseInt(minPrice, 10) : undefined, // Correct radix value
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined, // Correct radix value
    };

    const filteredVehicle = Object.fromEntries(Object.entries(vehicle).filter(([_, v]) => v != null));

    const searchParams = new URLSearchParams(filteredVehicle).toString();

    dispatch(setPageNumber(1));

    navigate(`/Search/Results?${searchParams}`);
  };

  return (
    <>
      <Autocomplete
        id="filter-demo"
        options={brandNames}
        getOptionLabel={(option) => option.title}
        filterOptions={filterOptions}
        onChange={handleBrandChange}
        sx={{ width: '100%', fontFamily: 'Poppins', fontWeight: 500, mt: '10px' }}
        renderInput={(params) => <TextField {...params} label="Brand" />}
      />

      <Autocomplete
        id="grouped-demo"
        options={filteredModels}
        groupBy={(option) => (selectedBrand && validBrandIds.has(selectedBrand.id)) ? option.series : null}
        disabled={!selectedBrand}
        value={selectedModel}
        onChange={handleModelChange}
        getOptionLabel={(option) => option.model}
        sx={{ width: '100%', fontFamily: 'Poppins' }}
        renderInput={(params) => <TextField {...params} label="Model" />}
      />

      <FormControl fullWidth sx={{ mt: 0 }}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedYear}
          label="Year"
          onChange={handleYearChange}
        >
          <MenuItem value={undefined}>
            <em>Any</em>
          </MenuItem>
          {yearRange.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: '100%' }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-weight"
          endAdornment={<InputAdornment position="end">Km</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          type="number"
          value={milageValue}
          onChange={(e) => setMileageValue(e.target.value)}
        />
        <FormHelperText id="outlined-weight-helper-text" sx={{ width: '100%', fontFamily: 'Poppins' }}>
          Mileage
        </FormHelperText>
      </FormControl>

      <div className="h-14 w-full flex justify-center items-center font-semibold">
        Price:
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">From</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            label="Amount"
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </FormControl>
        To:
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </FormControl>
      </div>

      <button onClick={handleSearch} className="h-14 w-full button-bg rounded-2xl text-white">
        Search
      </button>
    </>
  );
};

export default CarTypeInput;
