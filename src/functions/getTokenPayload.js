import { jwtDecode } from 'jwt-decode';

export const getIdToken = () => {
const token = localStorage.getItem('authorization');

let decoded;

if (token) {
  let item = jwtDecode(token);
  decoded = item._id;
} else {
   decoded = null;
}
return decoded;
}

export const getRoleToken = () => {
  const token = localStorage.getItem('authorization');
  
  let decoded;
  
  if (token) {
    let item = jwtDecode(token);
    decoded = item.role;
    return decoded;
  } else {
     decoded = null;
  }
  return decoded;
  }

const currentYear = new Date().getFullYear();


export const generateYearRange = (startYear) => {
  const endYear = currentYear;
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};

export const generateYearRangeNew = (startYear) => {
  const endYear = currentYear + 5;
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};