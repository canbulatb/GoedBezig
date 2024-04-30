import React from 'react';
import './css/Boeken.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';


const Boeken = ({ boeken, onBoekClick}) => {
    
    return (        
   <>

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', overflow: 'auto' }}> {/* overflow: auto; eklendi */}

    {boeken.map((boek, index) => (
    <MDBCard style={{ width: '200px' }} key={index}> {/* Kartın sabit bir genişliği belirlendi */}

        <MDBCardImage src={`./pictohareket/${boek.path}`} position='top' alt='...' />
        <MDBCardBody>
          <MDBCardTitle>{boek.boek}</MDBCardTitle>
          <MDBCardText>
          <MDBBtn href='#'  onClick={() => onBoekClick(2,index)}>Spreken</MDBBtn>
          </MDBCardText>
          <MDBBtn href='#'  onClick={() => onBoekClick(1,index)}>Luisteren</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    ))}
</div>
   </>
    );
}
export default Boeken;











