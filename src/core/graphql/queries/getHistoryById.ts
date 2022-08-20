import { gql } from '@apollo/client';

export const GET_HISTORY_BY_ID = (id: string) => gql`
  query {
    getHistoryById(id: "${id}") {
      time
      priceUsd
    }
  }
`;
