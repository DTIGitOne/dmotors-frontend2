const StarIcon = ({ color, onClick }) => (
   <svg
     width="20"
     height="20"
     viewBox="0 0 20 20"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     onClick={onClick}
     style={{ cursor: 'pointer' }}
   >
     <path
       d="M10 0.0187378L9.34551 1.57186L7.09348 6.91905L0.0489502 7.68452L5.31848 12.6545L3.82083 19.9875L10 16.2267L16.1737 19.9875L14.6816 12.6545L19.9456 7.68452L12.9066 6.91905L10 0.0187378ZM10 3.67413L11.9248 8.23921L16.7395 8.76061L13.134 12.1664L14.1325 17.0809L10 14.5626L5.86208 17.0809L6.86606 12.1664L3.26614 8.76061L8.07528 8.23921L10 3.67413Z"
       fill={color}
     />
   </svg>
 );
 
 export default StarIcon;
 