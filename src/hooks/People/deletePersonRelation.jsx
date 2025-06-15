import { getAuthToken } from "../../utils/authToken";
import config from "../../config";
import { toast } from "react-toastify";

const useDeleteFamilyTreeRelationWithPerson = () => {
    const deleteFamilyTreeRelationWithPerson = async (personId) => {
        const token = getAuthToken();

        const query = `
            mutation {
                deleteFamilyTreeRelationWithPerson(personId: ${personId})
            }
        `;

        console.log("GraphQL deleteFamilyTreeRelationWithPerson Mutation:\n", query);

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

            toast.success("Relation deleted successfully");
            return result.data.deleteFamilyTreeRelationWithPerson;
        } catch (err) {
            console.error("Delete Relation Error:", err);
            toast.error(err.message || "Something went wrong");
            throw err;
        }
    };

    return { deleteFamilyTreeRelationWithPerson };
};

export default useDeleteFamilyTreeRelationWithPerson;
