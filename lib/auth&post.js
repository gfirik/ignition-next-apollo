import React, { useState, useContext, createContext } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const isLoggedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: "https://api.vrmarketing.guru",
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signup = async ({ name, email, password }) => {
    const client = createApolloClient();
    const response = await client.mutate({
      mutation: gql`
        mutation Mutation($email: String!, $password: String!, $name: String!) {
          signup(email: $email, password: $password, name: $name) {
            token
          }
        }
      `,
      variables: {
        email,
        password,
        name,
      },
    });
    console.log(response);
    if (response?.data?.signup?.token) {
      setAuthToken(response.data.signup.token);
    }
  };

  const login = async ({ email, password }) => {
    const client = createApolloClient();
    const result = await client.mutate({
      mutation: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        email,
        password,
      },
    });
    console.log(result);
    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
    }
  };

  const post = async ({ url, description }) => {
    const client = createApolloClient();
    const result = await client.mutate({
      mutation: gql`
        mutation Mutation($url: String!, $description: String!) {
          post(url: $url, description: $description) {
            url
            description
          }
        }
      `,
      variables: {
        url,
        description,
      },
    });
    console.log(result);
  };

  const logOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isLoggedIn,
    signup,
    login,
    logOut,
    createApolloClient,
    post,
  };
}
