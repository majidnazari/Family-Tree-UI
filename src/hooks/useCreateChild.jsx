import { useMutation, gql } from "@apollo/client";

const CREATE_CHILD = gql`
  mutation CreateChild($input: CreateChildInput!) {
    createChild(input: $input) {
      id
      status
    }
  }
`;

const useCreateChild = () => {
  const [createChild, { data, loading, error }] = useMutation(CREATE_CHILD);
  return { createChild, data, loading, error };
};

export default useCreateChild;
