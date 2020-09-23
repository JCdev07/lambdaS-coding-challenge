import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import styled from "styled-components";

const override = css`
   display: block;
   margin: 0 auto;
   border-color: blue;
`;

const LoaderContainer = styled.div`
   height: 100vh;
   position: relative;
`;

const SweetLoading = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
`;

export const Loader = ({ loading }) => {
   return (
      <div className="container">
         <div className="row">
            <div className="col-12 mx-auto text-center">
               <LoaderContainer>
                  <SweetLoading className="sweet-loading">
                     <SyncLoader
                        css={override}
                        size={20}
                        color={"#34421e"}
                        loading={loading}
                     />
                  </SweetLoading>
               </LoaderContainer>
            </div>
         </div>
      </div>
   );
};

export default Loader;
