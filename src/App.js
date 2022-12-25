import './App.css';

import styled from 'styled-components';
import { InstantSearch ,SearchBox } from 'react-instantsearch-dom';
import { searchClient } from './typesenseAdapter';
import LinksHits from './components/linksHits';
import { RefinementList } from 'react-instantsearch-dom';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
`;

function App() {
  return (
    <AppContainer>
        <h1>Typesense Search: Links website</h1>
        <InstantSearch indexName='savedLinks' searchClient={searchClient}>
        <h3>Search Links</h3>
          <SearchBox />
          <RefinementList attribute="links" />
          <LinksHits />

        </InstantSearch>
        
    </AppContainer>
  );
}

export default App;
