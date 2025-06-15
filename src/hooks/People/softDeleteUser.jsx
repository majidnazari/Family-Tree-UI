import { getAuthToken } from "../../utils/authToken";
import config from "../../config";
import { toast } from "react-toastify";

const useSoftDeleteUser = () => {
    const softDeleteUser = async (person_id) => {
        const token = getAuthToken();

        const query = `
      mutation {
        deletePersonWithFamilyTreeRelationImmediately(input: { person_id: "${person_id}" }) {
          id
          first_name
          last_name
        }
      }
    `;

        console.log("GraphQL softDeleteUser Mutation:\n", query);

        try {
            const response = await fetch(config.GRAPHQL_ENDPOINT, {
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

            toast.success("User soft-deleted successfully");
            return result.data.deletePersonWithFamilyTreeRelationImmediately;
        } catch (err) {
            console.error("Soft Delete User Error:", err);
            toast.error(err.message || "Something went wrong");
            throw err;
        }
    };

    return { softDeleteUser };
};

export default useSoftDeleteUser;
