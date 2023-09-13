import { gql } from '@apollo/client';

export const GET_ALL_CURRENCIES = gql`
  query {
    getAllCurrencies {
      id
      rank
      symbol
      name
      supply
      maxSupply
      marketCapUsd
      volumeUsd24Hr
      priceUsd
      changePercent24Hr
      vwap24Hr
    }
  }
`;
