import React, { useState, useEffect, Fragment, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { CountriesContext } from "./../Context/CountriesContext";
import { Loader } from "./../Components/Loader";
import styled from "styled-components";

const BorderButton = styled.button`
   border-radius: 120px;
   border: 1px solid #34421e;
   transition: all 0.2s ease-in-out;

   &:hover {
      border-color: transparent;
      color: #f1f1ef;
      background-color: #34421e;
   }

   &:active {
      outline: none;
   }
`;

const TopButton = styled.button`
   border-radius: 8px;
   border: 1px solid #34421e;
   transition: all 0.2s ease-in-out;

   &:hover {
      border-color: transparent;
      color: #f1f1ef;
      background-color: #34421e;
   }

   &:active {
      outline: none;
   }
`;

const CountryContainer = styled.div`
   background-color: #f8f8f7;
`;

const SingleCoutry = () => {
   const history = useHistory();

   const { countryName } = useParams();

   const [country, setCountry] = useState({});

   const [countries, setCountries] = useContext(CountriesContext);

   const [borderCountriesState, setBorderCountriesState] = useState([]);

   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      let borderCountries = [];

      // fetch country
      setTimeout(() => {
         axios
            .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
            .then((res) => {
               setCountry(res.data[0]);
               console.log(res.data[0]);
               setIsLoading(false);
               return res.data[0].borders;
            })
            .then((borders) => {
               borders.forEach((border) => {
                  countries.forEach((country) => {
                     if (country.alpha3Code === border) {
                        borderCountries.push(country);
                     }
                  });
               });
               return borderCountries;
            })
            .then((borderCountries) => {
               setBorderCountriesState(borderCountries);
            })
            .catch((error) => {
               history.push(`/404`);
               console.log(error);
               setIsLoading(false);
            });
      }, 300);

      // Cleanup
      return () => {
         setCountry({});
         setBorderCountriesState([]);
      };
   }, [countryName]);

   // Redirect to Border Countries
   const handleRedirect = (e) => {
      console.log(e);
      history.push(`/countries/${e}`);
      window.location.reload();
   };

   // Go to Home Page Button
   const handleClick = () => {
      history.push(`/countries`);
      // history.goBack();
   };

   // Redirect to Google Map in new tab
   const handleLinkToMap = () => {
      window.open(
         `https://www.google.com/maps/search/?api=1&query=${country.name}`
      );
   };

   // Number format for population
   const populationFormat = new Intl.NumberFormat("en-US", {});

   return (
      <div className="container my-5">
         {isLoading ? (
            <Loader loading={isLoading} />
         ) : (
            <>
               <div className="row mt-5">
                  <CountryContainer className="col-12 card mx-2 py-4">
                     <div className="d-flex flex-wrap">
                        <div className="col-12 col-lg-6">
                           <img
                              className="img-fluid"
                              src={country.flag}
                              alt={`${country.name}-flag`}
                           />
                        </div>
                        <div className="col-12 col-lg-6 mt-3 pl-4">
                           <h1>{country ? country.name : ""}</h1>
                           <div className="col-12 p-0">
                              <div className="col-6 p-0">
                                 <p className="m-0">
                                    <strong>Capital: </strong>
                                    {country.capital}
                                 </p>
                                 <p className="m-0">
                                    <strong>Region: </strong>
                                    {country.region}
                                 </p>
                                 <p className="m-0">
                                    <strong>Sub Region: </strong>
                                    {country.subregion}
                                 </p>
                                 <p className="m-0">
                                    <strong>Population: </strong>
                                    {populationFormat.format(
                                       country.population
                                    )}
                                 </p>
                                 <p className="m-0">
                                    <strong>Country Code: </strong>
                                    {country.numericCode}
                                 </p>
                                 <p className="m-0">
                                    <strong>Calling Code: </strong>
                                    {/* {country.callingCodes.join(", ")} */}
                                 </p>
                                 <div className="col p-0">
                                    <p className="m-0">
                                       <strong>Timezones: </strong>
                                    </p>
                                    <ul className="list-unstyled">
                                       {country.timezones
                                          ? country.timezones.map(
                                               (timezone) => {
                                                  return (
                                                     <li
                                                        key={timezone}
                                                        className="list-item ml-3"
                                                     >
                                                        <small>
                                                           {timezone}
                                                        </small>
                                                     </li>
                                                  );
                                               }
                                            )
                                          : ""}
                                    </ul>
                                 </div>
                                 <div className="col p-0">
                                    <p className="m-0">
                                       <strong>Currencies: </strong>
                                    </p>
                                    <ul className="list-unstyled">
                                       {country.currencies
                                          ? country.currencies.map(
                                               (currency) => {
                                                  return (
                                                     <Fragment
                                                        key={currency.code}
                                                     >
                                                        <li className="list-item ml-3">
                                                           <small>
                                                              <strong>
                                                                 Symbol:
                                                              </strong>
                                                              {"  "}
                                                              {currency.symbol}
                                                           </small>
                                                        </li>
                                                        <li className="list-item ml-3">
                                                           <small>
                                                              <strong>
                                                                 Name:
                                                              </strong>
                                                              {"  "}
                                                              {currency.name}
                                                           </small>
                                                        </li>
                                                     </Fragment>
                                                  );
                                               }
                                            )
                                          : ""}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-12">
                        <h4>
                           {borderCountriesState.length
                              ? "Border Countries:"
                              : "No Border Countries"}
                        </h4>
                        <div className="col-12 d-flex flex-wrap">
                           {borderCountriesState.map((border) => {
                              return (
                                 <BorderButton
                                    className="m-1 px-3 py-1"
                                    key={`${border}${borderCountriesState.indexOf(
                                       border
                                    )}`}
                                    onClick={() => {
                                       handleRedirect(border.name);
                                    }}
                                 >
                                    {border.name}
                                 </BorderButton>
                              );
                           })}
                        </div>
                     </div>
                  </CountryContainer>
               </div>

               <div className="row mt-4">
                  <div className="col-12 d-flex justify-content-between">
                     <TopButton className="px-3 py-1" onClick={handleClick}>
                        <span>
                           <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              className="bi bi-arrow-left"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 fillRule="evenodd"
                                 d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                              />
                           </svg>
                        </span>
                        <span className="ml-1">Back</span>
                     </TopButton>
                     <TopButton className="px-3 py-1" onClick={handleLinkToMap}>
                        Show on the Map
                     </TopButton>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default SingleCoutry;
