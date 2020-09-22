import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Pages
import Home from "./Pages/Home";
import SingleCountry from "./Pages/SingleCountry";

function App() {
   // Countries State
   const [countries, setCountries] = useState([]);

   useEffect(() => {
      axios
         .get("https://restcountries.eu/rest/v2/all")
         .then((res) => {
            setCountries(res.data);
         })
         .catch((error) => {
            console.log(`ERROR: ${error}`);
         });
      return () => {
         setCountries([]);
      };
   }, []);

   return (
      <Router>
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
      </Router>
   );
}

export default App;
