import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

const updateUserDocument = graphql(`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      ...UserFragment
    }
  }
`);

const useUpdateUser = () => {
    return useMutation(updateUserDocument, {
        refetchQueries: ['GetMe'],
    });
};

export { useUpdateUser };
