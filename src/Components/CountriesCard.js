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
   box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
   transition: all 0.2s ease;
   cursor: pointer;
   color: black;
   color: #34421e;

   &:hover {
      transform: translateY(-5px);
      box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.3);
   }

   &:active {
      transform: translateY(-2px);
      box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
   }

   & img {
      width: 100%;
      height: 100%;
      min-height: 200px;
      object-position: top;
      object-fit: cover;
   }

   & .card__details {
      background-color: #f7f7f9;
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
               <div className="card-body p-0 d-flex flex-row-reverse d-md-block">
                  <div className="img col-8 col-md-12 p-0">
                     <img src={country.flag} alt="" className="img-fluid" />
                  </div>
                  <div className="card__details col-4 col-md-12 pt-md-2 p-4">
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
