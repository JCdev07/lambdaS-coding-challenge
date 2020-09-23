import React, { useState } from "react";
import CountriesCard from "./../Components/CountriesCard";
import styled from "styled-components";

const SearchInput = styled.input`
   border-radius: 180px;
   transition: all 0.2s ease-in;

   &:focus {
      transform: scaleX(1.02);
      border-color: #34421e;
      box-shadow: 0 0 0 0.2rem rgba(53, 67, 30, 0.25);
   }
`;

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
         <div className="col-12 my-4">
            <div className="row">
               <div className="col-12 col-md-10 col-lg-8 mx-auto">
                  <SearchInput
                     type="text"
                     name="search"
                     id="search"
                     className="form-control"
                     onChange={handleSearchChange}
                     placeholder="Search Country"
                  />
               </div>
            </div>
         </div>
         <div className="row">{countryCardCont}</div>
      </div>
   );
};

export default Home;
