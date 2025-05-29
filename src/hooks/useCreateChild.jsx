import { getAuthToken } from "../utils/authToken";


import { toast } from "react-toastify";


const useCreateChild = () => {
  const createChild = async (input) => {
    const token = getAuthToken();
    console.log("inside useCreateChild:\n", input);

    const child = input.child || {};
    const spouseId = input.spouse_id ? `"${input.spouse_id}"` : null;

    const query = `
      mutation {
        createChild(
          input: {
            man_id: "${input.man_id}"
            woman_id: "${input.woman_id}"
            child: {
              first_name: "${child.first_name || ""}"
              last_name: "${child.last_name || ""}"
              birth_date: "${child.birth_date || ""}"
              death_date: "${child.death_date || ""}"
              mobile: "${child.mobile || ""}"
              gender: ${child.gender || 0}
              is_owner: ${child.is_owner ? true : false}
            }
            child_kind: ${input.child_kind || "BiologicalChild"}
            child_status: ${input.child_status || "Alive"}
            status: ${input.status || "Active"}
            ${spouseId ? `spouse_id: ${spouseId}` : ""}
          }
        ) {
          id
          status
        }
      }
    `;

    console.log("GraphQL CreateChild Mutation:\n", query);

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

      toast.success("Child created successfully");
      return result.data.createChild;
    } catch (err) {
      console.error("Create Child Error:", err);
      toast.error(err.message || "Something went wrong");
      throw err;
    }
  };

  return { createChild };
};

export default useCreateChild;