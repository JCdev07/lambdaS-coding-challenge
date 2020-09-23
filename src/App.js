import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Pages & Components
import Home from "./Pages/Home";
import SingleCountry from "./Pages/SingleCountry";
import Loader from "./Components/Loader";

function App() {
   // Countries State
   const [countries, setCountries] = useState([]);

   // Loading State
   const [isLoading, setIsLoading] = useState(false);

   useMemo(() => {
      setIsLoading(true);

      setTimeout(() => {
         axios
            .get("https://restcountries.eu/rest/v2/all")
            .then((res) => {
               setCountries(res.data);
               setIsLoading(false);
            })
            .catch((error) => {
               console.log(`ERROR: ${error}`);
               setIsLoading(false);
            });
      }, 1200);
   }, []);

   return (
      <Router>
         {isLoading ? (
            <Loader />
         ) : (
            <div className="App">
               <Switch>
                  <Route exact path="/">
                     <Home countries={countries} />
                  </Route>
                  <Route
                     path="/countries/:countryName"
                     component={SingleCountry}
                  />
               </Switch>
            </div>
         )}
      </Router>
   );
}

export default App;
