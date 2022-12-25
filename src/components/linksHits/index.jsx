import React from 'react'
import { connectHits } from 'react-instantsearch-dom'
import styled from "styled-components";
import LinkHit from '../linkHit';

const HitsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;



function LinksHits({ hits }) {
  const hit0 = hits[0].links;
  const hit1 = hits[1].links;
  console.log(hits[0].links);
  return (
    <HitsContainer>
      {/* {console.log(hits[0].links)}  */}
      {/* <p>
        {hits[0].links}
      </p> */}
      {/* {hit0.map((hit) => {
        <LinkHit key={hit.ObjectID} hit={hit} />
      })} */}
    </HitsContainer>
  )
};

export default connectHits(LinksHits);
