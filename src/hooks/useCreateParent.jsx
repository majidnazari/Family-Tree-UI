// src/hooks/useCreateParent.js
import { getAuthToken } from "../utils/authToken";
import { toast } from "react-toastify";

const useCreateParent = () => {
  const createParent = async (input) => {
    const token = getAuthToken();

    const query = `
      mutation {
        createParent(
          input: {
            person_id: "${input.person_id}",
            marriage_date: "${input.marriage_date}",
            divorce_date: "${input.divorce_date || ""}",
            father: {
              first_name: "${input.father.first_name}",
              last_name: "${input.father.last_name}",
              birth_date: "${input.father.birth_date}",
              death_date: "${input.father.death_date || ""}"
            },
            mother: {
              first_name: "${input.mother.first_name}",
              last_name: "${input.motherlast_name}",
              birth_date: "${input.mother.birth_date}",
              death_date: "${input.mother.death_date || ""}"
            },
            status: ${input.status}
          }
        ) {
          father {
            id
            first_name
            last_name
            node_code
            status
          }
          mother {
            id
            first_name
            last_name
            status
          }
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

      toast.success("Parents created successfully");
      return result.data.createParent;
    } catch (err) {
      console.error("Create Parent Error:", err);
      toast.error(err.message || "Something went wrong");
      throw err;
    }
  };

  return { createParent };
};

export default useCreateParent;
