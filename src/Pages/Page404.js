import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
   return (
      <div className="container-fluid p-0">
         <div className="row">
            <div className="col-12 p-0 text-center">
               <img
                  className=""
                  src="https://miro.medium.com/max/534/1*wUOrpv-selJOytCkslSIhg.png"
                  alt="404"
               />
               <div className="col mt-4">
                  <p>Page not found</p>
                  <Link to="/">Go to Homepage</Link>
               </div>
            </div>
         </div>
      </div>
   );
}
