const generateYearRange = (startYear, endYear) => {
   let years = [];
   for (let year = endYear; year >= startYear; year--) {
     years.push(year);
   }
   return years;
 };

 export const scrollToSection = (ref) => {
  const yOffset = -52; 
  const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
 }

  export const ScrollToTopComponent = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
 const currentYear = new Date().getFullYear();
 export const yearRange = generateYearRange(1950, currentYear);