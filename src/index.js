import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from, 
  ApolloProvider,
  useQuery
} from "@apollo/client";
import {onError} from '@apollo/client/link/error'

onError(({graphqlErrors, networkError})=>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path})=>{
      alert(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`)
    })
    if (networkError) alert(`[Network error]: ${networkError}`);
  }
})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8080/query",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
