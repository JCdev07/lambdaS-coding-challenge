import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";

const CardContainer = styled.div`
   & a {
      &:hover,
      &:active {
         text-decoration: none;
      }
   }
`;

const Card = styled.div`
   border-radius: 6px;
   overflow: hidden;

   transition: all 0.2s ease;
   cursor: pointer;
   color: black;

   & img {
      width: 100%;
      height: 200px;
      object-position: top;
      object-fit: cover;
   }
`;

const CountriesCard = ({ country }) => {
   const [countryCurrent, setCountryCurrent] = useState(country);

   return (
      <CardContainer className="col-12 col-md-6 col-lg-4 px-3 py-3">
         <Link
            to={{
               pathname: `/countries/${country.name}`,
               state: {
                  country,
               },
            }}
         >
            <Card className="card">
               <div className="card-body p-0">
                  <div className="img">
                     <img src={country.flag} alt="" className="img-fluid" />
                  </div>
                  <div className="card__details col mt-2">
                     <p>
                        <strong>Country Code: </strong>
                        {country.numericCode}
                     </p>
                     <p>
                        <strong>Name: </strong>
                        {country.name}
                     </p>
                     <p>
                        <strong>Timezones: </strong>
                        {country.timezones.join(", ")}
                     </p>
                     <p>
                        <strong>Calling Code: </strong>
                        {country.callingCodes.join(", ")}
                     </p>
                  </div>
               </div>
            </Card>
         </Link>
      </CardContainer>
   );
};

export default CountriesCard;
