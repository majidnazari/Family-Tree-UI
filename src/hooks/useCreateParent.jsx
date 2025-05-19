import { useMutation, gql } from "@apollo/client";

const CREATE_PARENT = gql`
  mutation CreateParent($input: CreateParentInput!) {
    createParent(input: $input) {
      father {
        id
        first_name
        last_name
        node_code
        status
      }
      mother {
        id
        last_name
        first_name
        status
      }
    }
  }
`;

const useCreateParent = () => {
  const [createParent, { data, loading, error }] = useMutation(CREATE_PARENT);
  return { createParent, data, loading, error };
};

export default useCreateParent;
