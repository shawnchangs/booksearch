import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
  createHttpLink,
 } from '@apollo/client';

import { setContext } from "@apollo/client/link/context";
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// graphql api endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// middleware for jwt token - authorization
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
