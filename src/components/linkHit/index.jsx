import React from 'react'
import styled from "styled-components";

import LinkHighlight from '../linkHighlight';

const HitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 2em 1em;
`;
const Title = styled.div`
  color: #000;
  font-weight: black;
  font-size: 24px;
  margin-top: 10px;
  text-align: center;
`;


export default function LinkHit(props) {
    const {hit} = props;
  return (
    <HitContainer>
        <Title>
          <LinkHighlight hit={hit} attribute="links" />
        </Title>
    </HitContainer>
  )
}
