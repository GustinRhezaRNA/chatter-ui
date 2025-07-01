import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `/graphql`, 
})

export default client;