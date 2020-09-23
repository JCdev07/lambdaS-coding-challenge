import React, { useState } from "react";
import CountriesCard from "./../Components/CountriesCard";

const Home = ({ countries }) => {
   // search filter state
   const [search, setSearch] = useState("");

   const handleSearchChange = (e) => {
      setSearch(e.target.value);
   };

   // Search Filter Function
   let filteredCountries = countries.filter((country) => {
      // if indexOf search state is !== 1 return the country
      return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
   });

   // Country card
   const countryCardCont = filteredCountries.map((country) => {
      return <CountriesCard country={country} key={country.name} />;
   });

   return (
      <div className="container">
         <div className="col-12">
            <div className="row">
               <div className="col-12 col-md-10 col-lg-8 mx-auto">
                  <label htmlFor="search">Search:</label>
                  <input
                     type="text"
                     name="search"
                     id="search"
                     className="form-control"
                     onChange={handleSearchChange}
                  />
               </div>
            </div>
         </div>
         <div className="row">{countryCardCont}</div>
      </div>
   );
};

export default Home;
