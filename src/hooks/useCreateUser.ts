import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`);

const useCreateUser = () => {
  return useMutation(createUserDocument);
};

export {useCreateUser}