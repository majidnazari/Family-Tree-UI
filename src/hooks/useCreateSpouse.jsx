// src/hooks/useCreateSpouse.js
import { getAuthToken } from "../auth/authToken";
import { toast } from "react-toastify";

const useCreateSpouse = () => {
  const createSpouse = async (input) => {
    const token = getAuthToken();

    const query = `
      mutation {
        createSpouse(
          input: {
            person_id: "${input.person_id}",
            marriage_date: "${input.marriage_date}",
            marriage_status: ${input.marriage_status},
            spouse: {
              first_name: "${input.spouse.first_name}",
              last_name: "${input.spouse.last_name}",
              birth_date: "${input.spouse.birth_date}",
              mobile: "${input.spouse.mobile}"
            },
            status: ${input.status}
          }
        ) {
          Man {
            id
            last_name
            first_name
          }
          Woman {
            id
            first_name
            last_name
          }
          id
        }
      }
    `;

    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      // Handle validation errors from GraphQL
      if (result.errors) {
        const error = result.errors[0];
        const validation = error?.extensions?.validation;

        if (validation) {
          Object.entries(validation).forEach(([field, messages]) => {
            messages.forEach((msg) => toast.error(msg));
          });
        } else {
          toast.error(error.end_user_message || error.message || "An error occurred");
        }

        throw new Error("Validation failed");
      }

      toast.success("Spouse created successfully");
      return result.data.createSpouse;
    } catch (err) {
      console.error("Create Spouse Error:", err);
      toast.error(err.message || "Something went wrong");
      throw err;
    }
  };

  return { createSpouse };
};

export default useCreateSpouse;
