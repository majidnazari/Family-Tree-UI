import { gql, useApolloClient } from "@apollo/client";
import { getAuthToken } from "../utils/authToken";
import { toast } from "react-toastify";

const GET_PERSON_SPOUSES = gql`
  query getPersonSpouses($id:Int) {
    getPersonSpouses(first: 10, page: 1, id: $id) {
      data {
        id
        first_name
        last_name
      }
    }
  }
`;

const useGetSpouses = () => {
  const client = useApolloClient();

  const fetchSpouses = async (id) => {
    if (!id) return [];

    const token = getAuthToken();

    try {
      const { data } = await client.query({
        query: GET_PERSON_SPOUSES,
        variables: { id },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        fetchPolicy: "no-cache", // Always fetch fresh data
      });

      return data.getPersonSpouses || [];
    } catch (err) {
      console.error("Failed to fetch spouses:", err);
      toast.error("Failed to load spouse options");
      return [];
    }
  };

  return { fetchSpouses };
};

export default useGetSpouses;
