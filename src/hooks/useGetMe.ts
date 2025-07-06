import { gql, useQuery } from '@apollo/client';
import type { User } from '../models/User';

const GET_ME = gql`
  query GetMe {
    me {
      _id
      email
    }
  }
`;

const useGetMe = () => {
  return useQuery<{me: User}>(GET_ME);
};

export { useGetMe };
