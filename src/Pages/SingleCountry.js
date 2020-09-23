import React, { useState, useEffect, Fragment, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { CountriesContext } from "./../Context/CountriesContext";
import { Loader } from "./../Components/Loader";

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
               console.log(`ERROR: ${error}`);
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
      history.push(`/`);
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
      <div className="container mt-5">
         {isLoading ? (
            <Loader loading={isLoading} />
         ) : (
            <>
               <div className="row">
                  <div className="col-12">
                     <button onClick={handleClick}>Back To Countries</button>
                     <button onClick={handleLinkToMap}>Link to Map</button>
                  </div>
               </div>
               <div className="row mt-5">
                  <div className="col-12 col-lg-6">
                     <img
                        className="img-fluid"
                        src={country.flag}
                        alt={`${country.name}-flag`}
                     />
                  </div>
                  <div className="col-12 col-lg-6">
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
                              {populationFormat.format(country.population)}
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
                                    ? country.timezones.map((timezone) => {
                                         return (
                                            <li
                                               key={timezone}
                                               className="list-item ml-3"
                                            >
                                               <small>{timezone}</small>
                                            </li>
                                         );
                                      })
                                    : ""}
                              </ul>
                           </div>
                           <div className="col p-0">
                              <p className="m-0">
                                 <strong>Currencies: </strong>
                              </p>
                              <ul className="list-unstyled">
                                 {country.currencies
                                    ? country.currencies.map((currency) => {
                                         return (
                                            <Fragment key={currency.code}>
                                               <li className="list-item ml-3">
                                                  <small>
                                                     <strong>Symbol:</strong>
                                                     {"  "}
                                                     {currency.symbol}
                                                  </small>
                                               </li>
                                               <li className="list-item ml-3">
                                                  <small>
                                                     <strong>Name:</strong>
                                                     {"  "}
                                                     {currency.name}
                                                  </small>
                                               </li>
                                            </Fragment>
                                         );
                                      })
                                    : ""}
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     <h3>
                        {borderCountriesState.length
                           ? "Border Countries:"
                           : "No Border Countries"}
                     </h3>
                     <div className="col-8 d-flex">
                        {borderCountriesState.map((border) => {
                           return (
                              <button
                                 key={`${border}${borderCountriesState.indexOf(
                                    border
                                 )}`}
                                 onClick={() => {
                                    handleRedirect(border.name);
                                 }}
                              >
                                 {border.name}
                              </button>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default SingleCoutry;
