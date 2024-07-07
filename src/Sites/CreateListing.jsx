import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import MenuBar from "../Components/MenuBar";
import { sendCarData } from "../API/API";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { brandNames } from '../Data/Brands';
import { brandModels } from '../Data/BrandModels';
import TextField from '@mui/material/TextField';
import { OutlinedInput, InputLabel, InputAdornment, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { yearRange } from '../Constants/constants';
import { CategoryList } from "../Data/Category";
import '../CustomCSS/Create.css';
import { driveTrainList } from "../Data/DruveTrain";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { pollutantClassList } from "../Data/Pollutant";
import { vehicleOptions } from "../Data/VehicleOptions";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, useParams } from "react-router-dom";
import { getIdToken } from "../functions/getTokenPayload";
import CircularProgress from '@mui/material/CircularProgress';
import { generateYearRange , generateYearRangeNew } from "../functions/getTokenPayload";
import { numberRegex } from "../Regex/Regex";
import { PriceChange } from "@mui/icons-material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const User = () => {
   const { id } = useParams();
   const tokenId = getIdToken();
   const token = localStorage.getItem('authorization');

   const navigate = useNavigate();

   if (id !== tokenId) {
     navigate('/');
   }

   const [loading, setLoading] = useState(false);
   const [isNotRegistered, setIsNotRegistered] = useState(false);

   const [images, setImages] = useState([]);
   const [formData, setFormData] = useState({});
   const [selectedBrand, setSelectedBrand] = useState(""); // Brand
   const [selectedModel, setSelectedModel] = useState(undefined); // Model
   const [selectedYear, setSelectedYear] = useState(undefined); // Year
   const [price, setPrice] = useState(undefined);
   const [milageValue , setMileageValue] = useState(undefined); // Mileage
   const [Condition, setCondition] = useState(undefined);
   const [VIN, setVIN] = useState(undefined);
   const [registration, setRegistration] = useState({ month: "", year: "" });
   const [firstRegistration, setFirstRegistration] = useState({ month: "", year: "" });
   const [category, setCategory] = useState(undefined);
   const [performance, setPerformance] = useState(undefined);
   const [driveType, setDriveType] = useState(undefined);
   const [driveTrain, setDriveTrain] = useState(undefined);
   const [seats, setSeats] = useState(undefined);
   const [doors, setDoors] = useState(undefined);
   const [pollutantClass, setPollutantClass] = useState(undefined);
   const [fuel, setFuel] = useState(undefined);
   const [transmitionType, setTransmitionType] = useState(undefined);
   const [owners, setOwners] = useState(undefined);
   const [color, setColor] = useState(undefined);
   const [colorManufacturer, setColorManufacturer] = useState(undefined);
   const [interior, setInterior] = useState(undefined);
   const [userTittle, setUserTittle] = useState(undefined);
   const [aditionalBio, setAditionalBio] = useState(undefined);
   const [carOptions , setCarOptions] = useState([]);

   const [imageError, setImageError] = useState("");
   const [brandError, setBrandError] = useState("");
   const [modelError, setModelError] = useState("");
   const [mileageError, setMileageError] = useState("");
   const [VINError, setVINError] = useState("");
   const [yearError, setYearError] = useState("");
   const [conditionError, setConditionError] = useState("");
   const [priceError, setPriceError] = useState(undefined);
   const [registrationError, setRegistrationError] = useState("");
   const [firstRegistrationError, setFirstRegistrationError] = useState("");
   const [categoryError, setCategoryError] = useState("");
   const [performanceError, setPerformanceError] = useState("");
   const [driveTypeError, setDriveTypeError] = useState("");
   const [driveTrainError, setDriveTrainError] = useState("");
   const [seatsError, setSeatsError] = useState("");
   const [doorsError, setDoorsError] = useState("");
   const [pollutantClassError, setPollutantClassError] = useState("");
   const [fuelError, setFuelError] = useState("");
   const [transmitionTypeError, setTransmitionTypeError] = useState("");
   const [ownersError, setOwnersError] = useState("");
   const [colorError, setColorError] = useState("");
   const [colorManufacturerError, setColorManufacturerError] = useState("");
   const [interiorError, setInteriorError] = useState("");
   const [userTittleError, setUserTittleError] = useState("");

   const errorRef = useRef(null);

   const currentYear = new Date().getFullYear();

   const filteredBrandModels = brandModels.map(brand => ({
    ...brand,
    models: brand.models.filter(model => !model.model.includes('(All)'))
   }));

   const yearRangeRegiNew = selectedYear
    ? generateYearRangeNew(selectedYear)
    : generateYearRange(1950);

    const yearRangeRegi = selectedYear
    ? generateYearRange(selectedYear)
    : generateYearRange(1950);

   const handleYearChangeFunc = (event) => {
     setSelectedYear(event.target.value);
   };

   const handleModelChange = (event, newValue) => {
    setSelectedModel(newValue);
   };

   const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
   });

   const filteredModels = selectedBrand
    ? filteredBrandModels.find(brand => brand.id === selectedBrand.id).models
    : [];

   const settings = {
      dots: false,
      infinite: images.length > 1,
      arrows: true,
      fade: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplayspeed: 3000,
    };

    useEffect(() => {
       setRegistration({ month: "", year: "" })
       setFirstRegistration({ month: "", year: "" })
       setRegistrationError("");
       setFirstRegistrationError("");
    }, [isNotRegistered]);

    useEffect(() => {
      if (
        imageError || brandError || modelError || mileageError || VINError || 
        yearError || conditionError || registrationError || firstRegistrationError || 
        categoryError || performanceError || driveTypeError || driveTrainError || 
        seatsError || doorsError || pollutantClassError || fuelError || 
        transmitionTypeError || ownersError || colorError || 
        colorManufacturerError || interiorError || userTittleError || priceError
      ) {
        errorRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [
      imageError, brandError, modelError, mileageError, VINError, yearError,
      conditionError, registrationError, firstRegistrationError, categoryError,
      performanceError, driveTypeError, driveTrainError, seatsError, doorsError,
      pollutantClassError, fuelError, transmitionTypeError, ownersError,
      colorError, colorManufacturerError, interiorError, userTittleError, priceError
    ]);

   const [isDragging , setIsDragging] = useState(false);

   const handleYearChange = (event) => {
     setSelectedYear(event.target.value);
   };

   const handleCheckboxChange = (event) => {
     setIsNotRegistered(event.target.checked);
   };
   
     // Brand
     const handleBrandChange = (event, newValue) => {
       setSelectedBrand(newValue);
       setSelectedModel(null); // Reset selected model when brand changes
       if (newValue) {
         const brandModel = brandModels.find(brand => brand.id === newValue.id);
         setSelectedModel(brandModel ? brandModel.models : []);
       } else {
        setSelectedModel([]);
       }
     };
     
     //showSeries
     const validBrandIds = new Set([3, 5, 6, 7, 8,31 ,41 ,63]);

   const clearErrors = () => {
     setBrandError("");
     setModelError("");
     setMileageError("");
     setYearError("");
     setConditionError("");
     setVINError("");
     setPriceError("");
     setRegistrationError("");
     setFirstRegistrationError("");
     setCategoryError("");
     setPerformanceError("");
     setDriveTypeError("");
     setFuelError("");
     setSeatsError("");
     setDoorsError("");
     setPollutantClassError("");
     setDriveTrainError("");
     setTransmitionTypeError("");
     setOwnersError("");
     setColorError("");
     setColorManufacturerError("");
     setInteriorError("");
     setImageError("");
   }
  
   const handleSubmitData = async () => {
    const formData = new FormData();
  
    if (id !== tokenId) {
      console.log("Can't create listing");
      return "Can't create listing";
    } else {
      clearErrors();
      setLoading(true);
  
      try {
        if (!selectedBrand) {
          setBrandError("Brand is required");
        }
        if (!selectedModel) {
          setModelError("Model is required");
        }
        if (!milageValue) {
          setMileageError("Mileage is required");
        }
        if (!selectedYear) {
          setYearError("Year is required");
        }
        if (!Condition) {
          setConditionError("Condition is required");
        }
        if(!price) {
          setPriceError("Price missing");
        }
        if (!VIN) {
          setVINError("VIN is required");
        }
        if (!registration) {
          setRegistrationError("Registration is required");
        }
        if (isNotRegistered !== true) {
          if (!registration.month) {
            setRegistrationError("Registration is missing");
          }
          if (!firstRegistration.month) {
            setFirstRegistration("(F)Registration is missing");
          }
        }
        if (!category) {
          setCategoryError("Category is required");
        }
        if (!performance) {
          setPerformanceError("required");
        }
        if (!driveType) {
          setDriveTypeError("Drive type is required");
        }
        if (!fuel) {
          setFuelError("Fuel is required");
        }
        if (!seats) {
          setSeatsError("Seats are required");
        }
        if (!doors) {
          setDoorsError("Doors are required");
        }
        if (!pollutantClass) {
          setPollutantClassError("Pollutant is required");
        }
        if (!driveTrain) {
          setDriveTrainError("required");
        }
        if (!transmitionType) {
          setTransmitionTypeError("required");
        }
        if (!owners) {
          setOwnersError("Owners is required");
        }
        if (!color) {
          setColorError("Color is required");
        }
        if (!interior) {
          setInteriorError("Interior is required");
        }
        if (!colorManufacturer) {
          setColorManufacturerError("(Manufacturer) Color is required");
        }
        if (images.length <= 0) {
          setImageError("Image/s is required");
        }
  
        // Append data to formData
        if (selectedBrand) {
          formData.append('Brand', selectedBrand.title);
          formData.append('BrandModel', selectedBrand.value);
        }
        if (selectedModel) {
          formData.append("Model", selectedModel.model);
        }
        if (milageValue) {
          if (milageValue.length > 8) {
            setMileageError("Mileage too long (max 99999999)");
          } else {
            formData.append("Mileage", milageValue);
          }
        }
        if (selectedYear) {
          formData.append("Year", selectedYear);
        }
        if (Condition) {
          formData.append("VehicleCondition", Condition);
        }
        if (price) {
          if (price.length > 10) {
            setPriceError("Price value is too big");
          } else {
            formData.append("Price", price);
          }
        }
        if (VIN) {
          if (VIN.length < 17) {
            setVINError("Invalid VIN format");
          } else {
            formData.append("VIN", VIN);
          }
        }
        if(!isNotRegistered) {
          if (registration.month && registration.year) {
            formData.append("Registration", `${registration.month}/${registration.year}`);
          }
          if (firstRegistration.month && firstRegistration.year) {
            formData.append("FirstRegistration", `${firstRegistration.month}/${firstRegistration.year}`);
          }
        } else {
          formData.append("Registration", "Not registerd");
          formData.append("FirstRegistration", "Never registerd");
        }
        if(category) {
          formData.append("Category", category);
        }
        if(performance) {
          if(!numberRegex.test(performance)) {
            setPerformanceError("Incorrect");
          } else {
            formData.append("Performance", performance);
          }
        }
        if(driveType) {
          formData.append("DriveType", driveType);
        }
        if(fuel) {
          formData.append("Fuel", fuel);
        }
        if(seats) {
          formData.append("SeatNumber", seats);
        }
        if(doors) {
          formData.append("DoorNumber", doors);
        }
        if(pollutantClass) {
          formData.append("PollutantClass", pollutantClass);
        }
        if(driveTrain) {
          formData.append("Drivetrain", driveTrain);
        }
        if(transmitionType) {
          formData.append("TransmitionType", transmitionType);
        }
        if(owners) {
          formData.append("Owners", owners);
        }
        if(color) {
          formData.append("Color", color);
        }
        if(interior) {
          formData.append("Interior", interior);
        }
        if(colorManufacturer) {
          formData.append("ColorManufacturer", colorManufacturer);
        }
        if(aditionalBio) {
          formData.append("AditionalBio", aditionalBio);
        }
        if(userTittle) {
          formData.append("userTittle", userTittle)
        }
        if(images.length > 1) {
          for (let i = 0; i < images.length; i++) {
            formData.append(`CarImages`, images[i]);
          }
        }
        if(carOptions.length >= 1) {
          for (let i = 0; i < carOptions.length; i++) {
            formData.append(`CarOptions`, carOptions[i]);
          }
        }

        formData.append('Seller', id);

        const requiredFields = [
          'Brand', 'BrandModel', 'Model', 'Mileage', 'Year', 'VehicleCondition', 'Price',
          'VIN', 'Registration', 'FirstRegistration', 'Category', 'Performance',
          'DriveType', 'Fuel', 'SeatNumber', 'DoorNumber', 'PollutantClass',
          'Drivetrain', 'TransmitionType', 'Owners', 'Color', 'Interior',
          'ColorManufacturer', 'CarImages', 'Seller'
        ];

        const missingFields = requiredFields.filter(field => !formData.has(field));

        if (missingFields.length > 0) {
          console.log(`Missing fields: ${missingFields.join(', ')}`);
          return;
        }
        
        
        try {
          const response = await sendCarData(formData, token);

          if(response.status === 201) {
            navigate(`/users/${id}`);
          }
        } catch(e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

   const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

    const handleDrop = (event) => {
      event.preventDefault(); // Prevent default behavior
      setIsDragging(false);
      const files = event.dataTransfer.files;
      handleFileChange({ target: { files } });
    };
  
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      setImages(prevImages => [...prevImages, ...files]);
    };

   const handleDragOver = (event) => {
      event.preventDefault(); // Prevent default behavior
      setIsDragging(true);
    };

   const clearImages = (event) => {
      event.preventDefault();
      setImages([]);
   }

   const handleRegistrationChange = (field) => (event) => {
    const value = event.target.value;
    setRegistration({ ...registration, [field]: value });
  };

  const handleFirstRegistrationChange = (field) => (event) => {
    const value = event.target.value;
    setFirstRegistration({ ...firstRegistration, [field]: value });
  };

   return (
      <div className=" h-auto w-full flex justify-center bg-slate-100">
         <MenuBar />
         <div className="h-16"></div>
         <div id="createListingBox" className=" w-full h-auto pb-10 bg-slate-100 flex items-center flex-col overflow-hidden">
          <div ref={errorRef} className=" text-3xl mt-24 mb-4 ">Create a listing</div>
          <div id="listingBoxAll" className=" h-auto flex items-center flex-col bg-white rounded-3xl p-4 " style={{width: "90%"}}>
          <div className=" h-24 w-full ">
           <Autocomplete
            options={brandNames}
            getOptionLabel={(option) => option.title}
            filterOptions={filterOptions}
            onChange={handleBrandChange}
            sx={{ width: "100%" , fontFamily: "Poppins", fontWeight: 500 , mt: "10px"}}
            renderInput={(params) => <TextField {...params}  label="Brand" />}
           />
           <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{brandError}</FormHelperText>
          </div>
          <div className=" h-24 w-full">
          <Autocomplete
            options={filteredModels}
            groupBy={(option) => (selectedBrand && validBrandIds.has(selectedBrand.id)) ? option.series : null}
            disabled={!selectedBrand}
            value={selectedModel}
            onChange={handleModelChange}
            getOptionLabel={(option) => option.model}
            sx={{ width: "100%", fontFamily: "Poppins" }}
            renderInput={(params) => <TextField {...params} label="Model" />}
          />
          <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{modelError}</FormHelperText>
          </div>
          <div className=" h-24 w-full">
           <FormControl sx={{ width: "100%" }} variant="outlined">
           <OutlinedInput
             endAdornment={<InputAdornment position="end">Km</InputAdornment>}
             type='number'
             value={milageValue}
             onChange={(e) => setMileageValue(e.target.value)}
           />
           <FormHelperText sx={{ width: "100%" , fontFamily: "Poppins",}}>{mileageError ? (<div className=" text-red-500">{mileageError}</div>) : ("Mileage")}</FormHelperText>
           </FormControl> 
          </div>
          <div className=" w-full h-24 flex">
            <div className=" w-1/2 h-full p-1">
            <FormControl fullWidth sx={{ mt: 0 }}>
            <InputLabel>Year</InputLabel>
             <Select
              value={selectedYear}
              label="Year"
              onChange={handleYearChange}
             >
              {yearRange.map((year) => (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{yearError}</FormHelperText>
            </div>
            <div className=" w-1/2 h-full p-1">
            <FormControl fullWidth>
             <InputLabel >Condition</InputLabel>
              <Select
                value={Condition}
                onChange={(e) => setCondition(e.target.value)}
                label="Condition"
              >
               <MenuItem value={"New"}>New</MenuItem>
               <MenuItem value={"Used(pre-owned)"}>Used(pre-owned)</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{conditionError}</FormHelperText>
            </div>
          </div>
          <div className=" h-24 w-full">
          <FormControl sx={{ width: "100%" }} variant="outlined">
           <OutlinedInput
             endAdornment={<InputAdornment position="end">€</InputAdornment>}
             type='number'
             value={price}
             onChange={(e) => setPrice(e.target.value)}
           />
           <FormHelperText sx={{ width: "100%" , fontFamily: "Poppins",}}>{priceError ? (<div className=" text-red-500">{priceError}</div>) : ("Price")}</FormHelperText>
           </FormControl> 
          </div>
          <div className=" divsionLine"></div>
          <div className=" h-24 w-full mt-10">
           <TextField className=" w-full" value={VIN} onChange={(e) => setVIN(e.target.value)} label="VIN" variant="outlined"/>
           <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{VINError}</FormHelperText>
          </div>
          <div className=" h-24 w-full flex">
            <div className=" w-1/2 h-full p-1 pl-0 pr-2" style={{borderRight: "0.1px solid #1070FF"}}>
              <div className="registration-wrapper">
                <FormControl fullWidth>
                 <InputLabel>M</InputLabel>
                 <Select
                  onChange={handleRegistrationChange("month", "month")}
                  type="number"
                  className=" w-full"
                  value={registration.month}
                  label="M"
                  variant="outlined"
                  disabled={isNotRegistered ? true : false}
                 >
                  <MenuItem value={"01"}>01</MenuItem>
                  <MenuItem value={"02"}>02</MenuItem>
                  <MenuItem value={"03"}>03</MenuItem>
                  <MenuItem value={"04"}>04</MenuItem>
                  <MenuItem value={"05"}>05</MenuItem>
                  <MenuItem value={"06"}>06</MenuItem>
                  <MenuItem value={"07"}>07</MenuItem>
                  <MenuItem value={"08"}>08</MenuItem>
                  <MenuItem value={"09"}>09</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"11"}>11</MenuItem>
                  <MenuItem value={"12"}>12</MenuItem>
                 </Select>
                </FormControl>
                <span className="registration-divider">/</span>
                 <FormControl fullWidth sx={{ mt: 0 }}>
                 <InputLabel>Y</InputLabel>
                  <Select
                   onChange={handleRegistrationChange("year")}
                   className=" w-full"
                   value={registration.year}
                   label="Y"
                   variant="outlined"
                   disabled={isNotRegistered ? true : false}
                  >
                {yearRangeRegiNew.map((year) => (
                 <MenuItem key={year} value={year}>
                  {year}
                 </MenuItem>
                ))}
                  </Select>
                </FormControl>
              </div>
              <FormHelperText>{registrationError ? (<div className=" text-red-500">{registrationError}</div>) : ("Registration")}</FormHelperText>
            </div>
            <div className=" w-1/2 h-full p-1 pr-0 pl-2" style={{borderLeft: "0.1px solid #1070FF"}}>
              <div className="registration-wrapper">
                <FormControl fullWidth>
                 <InputLabel>M</InputLabel>
                 <Select
                  onChange={handleFirstRegistrationChange("month", "month")}
                  className=" w-full"
                  value={firstRegistration.month}
                  label="M"
                  variant="outlined"
                  disabled={isNotRegistered ? true : false}
                 >
                  <MenuItem value={"01"}>01</MenuItem>
                  <MenuItem value={"02"}>02</MenuItem>
                  <MenuItem value={"03"}>03</MenuItem>
                  <MenuItem value={"04"}>04</MenuItem>
                  <MenuItem value={"05"}>05</MenuItem>
                  <MenuItem value={"06"}>06</MenuItem>
                  <MenuItem value={"07"}>07</MenuItem>
                  <MenuItem value={"08"}>08</MenuItem>
                  <MenuItem value={"09"}>09</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"11"}>11</MenuItem>
                  <MenuItem value={"12"}>12</MenuItem>
                 </Select>
                </FormControl>
                <span className="registration-divider">/</span>
                <FormControl fullWidth sx={{ mt: 0 }}>
                 <InputLabel>Y</InputLabel>
                  <Select
                   value={firstRegistration.year}
                   className=" w-full"
                   label="Y"
                   onChange={handleFirstRegistrationChange("year")}
                   variant="outlined"
                   disabled={isNotRegistered ? true : false}
                  >
                  {yearRangeRegi.map((year) => (
                   <MenuItem key={year} value={year}>
                    {year}
                   </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </div>
              <FormHelperText>{firstRegistrationError ? (<div className=" text-red-500">{firstRegistrationError}</div>) : ("First registration")}</FormHelperText>
            </div>
          </div>
          <div className=" h-10 w-full flex items-center" style={{fontSize: "14px"}}>
            <Checkbox checked={isNotRegistered} onChange={handleCheckboxChange} /> Not registered
          </div>
          <div className=" divsionLine mt-11"></div>
          <div className=" h-24 w-full mt-11 flex">
            <div className=" w-1/2 h-full p-3">
            <FormControl fullWidth>
             <InputLabel >Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
               {CategoryList.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
             <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{categoryError}</FormHelperText></div>
            <div className=" w-1/2 h-full p-3">
             <TextField 
             endAdornment={<InputAdornment position="end">kW</InputAdornment>} 
             className=" w-full" 
             helperText={performanceError ? (<div className=" text-red-500">{performanceError}</div>) : ("Performance")} 
             value={performance}
             variant="outlined"
             type="number"
             onChange={(e) => setPerformance(e.target.value)}
             InputProps={{
               endAdornment: <InputAdornment position="end">kW</InputAdornment>,
             }}
             inputProps={{
               maxLength: 5,
               type: 'text',
             }}
             />
            </div>
          </div>
          <div className=" h-24 w-full flex">
            <div className=" h-full w-1/2 px-3">
            <FormControl fullWidth>
             <InputLabel >Drive Type</InputLabel>
              <Select
                value={driveType}
                label="Drive Type"
                onChange={(e) => setDriveType(e.target.value)}
              >
               <MenuItem value={"combustion"}>combustion</MenuItem>
               <MenuItem value={"electric"}>electric</MenuItem>
               <MenuItem value={"hybrid"}>hybrid</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{driveTypeError}</FormHelperText>
            </div>
            <div className=" h-full w-1/2 px-3">
            <FormControl fullWidth>
            <InputLabel>Fuel</InputLabel>
            <Select
              value={fuel}
              label="Fuel"
              onChange={(e) => setFuel(e.target.value)}
            >
            <MenuItem value={"petrol"} disabled={driveType !== "combustion"}>
              Petrol
            </MenuItem>
            <MenuItem value={"diesel"} disabled={driveType !== "combustion"}>
              Diesel
            </MenuItem>
            <MenuItem value={"electric"} disabled={driveType !== "electric"}>
              Electric
            </MenuItem>
            <MenuItem value={"combustion/electric(PHEV)"} disabled={driveType !== "hybrid"}>
              PHEV
            </MenuItem>
            <MenuItem value={"combustion/electric(HEV)"} disabled={driveType !== "hybrid"}>
              HEV
            </MenuItem>
            </Select>
            <FormHelperText sx={{ color: "#ef4444", width: "100%", fontFamily: "Poppins" }}>
              {fuelError}
            </FormHelperText>
            </FormControl>
            </div>
          </div>
          <div className=" h-24 w-full flex">
            <div className=" h-full w-1/2 px-3">
            <FormControl fullWidth>
             <InputLabel >Seats</InputLabel>
              <Select
                value={seats}
                label="Seats"
                onChange={(e) => setSeats(e.target.value)}
              >
               <MenuItem value={"1"}>1</MenuItem>
               <MenuItem value={"2"}>2</MenuItem>
               <MenuItem value={"3"}>3</MenuItem>
               <MenuItem value={"4"}>4</MenuItem>
               <MenuItem value={"5"}>5</MenuItem>
               <MenuItem value={"6"}>6</MenuItem>
               <MenuItem value={"7"}>7</MenuItem>
               <MenuItem value={"8"}>8</MenuItem>
               <MenuItem value={"9"}>9</MenuItem>
               <MenuItem value={"10"}>10</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{seatsError}</FormHelperText>
            </div>
            <div className=" h-full w-1/2 px-3">
            <FormControl fullWidth>
             <InputLabel >Doors</InputLabel>
              <Select
                value={doors}
                label="Doors"
                onChange={(e) => setDoors(e.target.value)}
              >
               <MenuItem value={"1"}>1</MenuItem>
               <MenuItem value={"2"}>2</MenuItem>
               <MenuItem value={"3"}>3</MenuItem>
               <MenuItem value={"4"}>4</MenuItem>
               <MenuItem value={"5"}>5</MenuItem>
               <MenuItem value={"6"}>6</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{doorsError}</FormHelperText>
            </div>
          </div>
          <div className=" h-24 w-full flex">
               <div className=" w-1/2 h-full px-3">
               <FormControl fullWidth>
                 <InputLabel >Pollutant</InputLabel>
                  <Select
                   value={pollutantClass}
                   label="Pollutant"
                   onChange={(e) => setPollutantClass(e.target.value)}
                  >
                  {pollutantClassList.map((item) => (
                   <MenuItem key={item} value={item}>
                      {item}
                   </MenuItem>
                  ))}
                  </Select>
                </FormControl>
               <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{pollutantClassError}</FormHelperText>
               </div>
               <div className=" w-1/2 h-full px-3">
               <FormControl fullWidth>
               <InputLabel >Drive Train</InputLabel>
                <Select
                 value={driveTrain}
                 label="Drive Train"
                 onChange={(e) => setDriveTrain(e.target.value)}
                >
               {driveTrainList.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
               ))}
               </Select>
               </FormControl>
               <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{driveTrainError}</FormHelperText>
               </div>
            </div>
            <div className=" h-24 w-full flex">
               <div className=" w-1/2 h-full px-3">
               <FormControl fullWidth>
                <InputLabel >Transmition</InputLabel>
                <Select
                 value={transmitionType}
                 label="Transmition"
                 onChange={(e) => setTransmitionType(e.target.value)}
                >
                 <MenuItem value={"manual"}>Manual</MenuItem>
                 <MenuItem value={"automatic"}>Automatic</MenuItem>
                </Select>
               </FormControl>
               <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{transmitionTypeError}</FormHelperText>
               </div>
               <div className=" w-1/2 h-full px-3">
               <FormControl fullWidth>
                <InputLabel >Owners</InputLabel>
                 <Select
                   value={owners}
                   label="Owners"
                   onChange={(e) => setOwners(e.target.value)}
                 >
                  <MenuItem value={"0"}>0</MenuItem>
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"6"}>6</MenuItem>
                  <MenuItem value={"7"}>7</MenuItem>
                  <MenuItem value={"8"}>8</MenuItem>
                  <MenuItem value={"9"}>9</MenuItem>
                  <MenuItem value={"10"}>10</MenuItem>
                 </Select>
                </FormControl>
                <FormHelperText sx={{color: "#ef4444", width: "100%" , fontFamily: "Poppins",}}>{ownersError}</FormHelperText>
                </div>
            </div>
            <div className=" h-24 w-full px-2">
            <TextField 
             className=" w-full" 
             helperText={colorError ? (<div className=" text-red-500">{colorError}</div>) : ("Color")}
             variant="outlined"
             value={color}
             onChange={(e) => setColor(e.target.value)}
             inputProps={{
               maxLength: 50,
               type: 'text',
             }}
             />
            </div>  
            <div className=" h-24 w-full px-2">
            <TextField 
             className=" w-full" 
             helperText={interiorError ? (<div className=" text-red-500">{interiorError}</div>) : ("Interior")}
             variant="outlined"
             value={interior}
             onChange={(e) => setInterior(e.target.value)}
             inputProps={{
               maxLength: 50,
               type: 'text',
             }}
             />
            </div>  
            <div className=" h-24 w-full px-2">
            <TextField 
             className=" w-full" 
             helperText={colorManufacturerError ? (<div className=" text-red-500">{colorManufacturerError}</div>) : ("Color (Manufacturer)")}
             variant="outlined"
             value={colorManufacturer}
             onChange={(e) => setColorManufacturer(e.target.value)}
             inputProps={{
               maxLength: 50,
               type: 'text',
             }}
             />
            </div>  
          <div className=" divsionLine mt-11"></div>
           <div className=" w-full h-auto mt-11" >
           <Autocomplete
             multiple
             options={vehicleOptions}
             disableCloseOnSelect
             getOptionLabel={(option) => option}
             onChange={(event, newValue) => {
               setCarOptions(newValue);
             }}
             renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
               return (
                <li key={key} {...optionProps}>
                 <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                 />
                 {option}
                 </li>
               );
             }}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Vehicle options" />
              )}
            />
           </div>
          <div className=" divsionLine mt-11"></div>
             <div className=" h-24 w-full mt-11">
             {selectedBrand && selectedModel ? (<p className=" mb-5">{selectedBrand.title} {selectedModel.model} {userTittle}</p>) : (<p className=" mb-5">Select Brand and Model</p>)}
             <TextField
              label=""
              sx={{ width: '100%' }}
              label="Aditional tittle"
              value={userTittle}
              onChange={(e) => setUserTittle(e.target.value)}
              inputProps={{
               maxLength: 30,
               type: 'text',
             }}
             />
             </div>
             <div className=" h-52 w-full mt-11 flex flex-col">
               <label htmlFor="details">Aditional details</label>
               <textarea id="details" maxLength={1000} onChange={(e) => setAditionalBio(e.target.value)} className=" h-36 bg-slate-100 h-full mt-2"></textarea>
               <label htmlFor="details">{aditionalBio ? (`${aditionalBio.length}/1000`) : (null)}</label>
             </div>
             <div className=" divsionLine mt-11"></div>
          <div id="pictureCreateBox" className=" w-full mt-11">
          <div className=" w-full rounded-3xl" style={{height: "150px"}}>
           <div
            className={` h-full w-full z-50`}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
           >
           <input
            type="file"
            id="uploadCarImage"
            multiple
            name="CarImages"
            placeholder="add images"
            onChange={handleFileChange}
            className="file-input"
           />
           <label htmlFor="uploadCarImage" className={`full-size-label rounded-3xl ${isDragging ? " dragging" : ""}`}>
            {isDragging ? (null) : ("Select or drop images")}
           </label>
           </div>
          </div>
          <button onClick={clearImages} className=" w-full text-white px-8 p-4 mt-5 bg-red-600 rounded-xl">Clear images</button>
          <div className=" mt-6 w-full h-full flex flex-col items-center">
            <span className=" text-3xl text-center w-full">
               Preview
            </span>
            <div id="imageBoxCreate" className=" relative mt-4 h-2/5 shadow-xl rounded-xl overflow-hidden">
            {images.length > 0 ? (
             <Slider {...settings}>
              {images.map((image, index) => (
                <div className=" h-60 w-full">
                  <div key={index} className="image-slide">
                  <img
                    className="slide-image rounded-t-3xl"
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                  />
                </div>
                </div>
              ))}
             </Slider>
             ) : (
               <div className="no-images text-center flex flex-col">
                {imageError ? (
                  <p className=" text-red-500">{imageError}</p>
                ) : (
                  <>
                   <p>No images uploaded</p>
                   <p>(First image is display)</p>
                  </>
                )}
               </div>
             )}
            </div>
          </div>
          </div>
          <div className=" divsionLine mt-3"></div>
           <div className=" mt-11">
            {loading ? (
               <CircularProgress />
            ) : (
               <button onClick={handleSubmitData} className=" px-20 p-5 bg-green-500 rounded-2xl text-white font-medium hover:bg-green-700">Confirm listing creation</button>
            )}
           </div>
          </div>
         </div>
      </div>
   );
};

export default User;
