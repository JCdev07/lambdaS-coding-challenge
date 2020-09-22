import React from "react";

const Home = ({ countries }) => {
   const allCountry = countries.map((country) => {
      return <h2>{country.name}</h2>;
   });

   return <div>{allCountry}</div>;
};

export default Home;
