import { useMutation } from '@apollo/client';
import { graphql } from '../gql';

const updateChatDocument = graphql(`
  mutation UpdateChat($updateChatInput: UpdateChatInput!) {
    updateChat(updateChatInput: $updateChatInput) {
      _id
      name
      description
    }
  }
`);

const useUpdateChat = () => {
    return useMutation(updateChatDocument);
};

export { useUpdateChat };
