import { graphql } from "../gql";

export const UserFragment = graphql(`
    fragment UserFragment on User {
        _id
        username
        email
        imageUrl
    }
`);