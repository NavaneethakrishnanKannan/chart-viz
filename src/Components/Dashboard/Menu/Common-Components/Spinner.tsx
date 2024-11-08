import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;


const Loader = styled.div`
border: 10px solid #f3f3f3;
border-radius: 50%;
border-top: 10px solid #3498db;
width: 60px;
height: 60px;
animation: ${spin} 2s linear infinite;
position: absolute;
z-index: 9;
`;

export default function Spinner (){

    return(

        <Loader/>

    )

}