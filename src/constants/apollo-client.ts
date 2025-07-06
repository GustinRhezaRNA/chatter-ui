import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `/graphql`, 
    credentials: 'include', // Include cookies in requests
})

export default client;