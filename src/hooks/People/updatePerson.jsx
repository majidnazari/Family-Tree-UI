import { getAuthToken } from "../../utils/authToken";
import config from "../../config";
import { toast } from "react-toastify";

const useUpdatePerson = () => {
    const updatePerson = async (id, input) => {
        const token = getAuthToken();
        console.log("Updating person ID:", id, "with input:", input);

        const query = `
            mutation {
                updatePerson(
                    id: "${id}"
                    input: {
                        birth_date: "${input.birth_date}"
                        death_date: "${input.death_date}"
                        first_name: "${input.first_name}"
                        gender: ${input.gender}
                        is_owner: ${input.is_owner}
                        last_name: "${input.last_name}"
                        country_code: "${input.country_code}"
                        mobile: "${input.mobile}"
                    }
                ) {
                    id
                    birth_date
                    created_at
                    creator_id
                    death_date
                    deleted_at
                    editor_id
                    first_name
                    gender
                    is_owner
                    last_name
                    mobile
                    node_code
                    status
                    updated_at
                }
            }
        `;

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

            toast.success("Person updated successfully");
            return result.data.updatePerson;
        } catch (err) {
            console.error("Update Person Error:", err);
            toast.error(err.message || "Something went wrong");
            throw err;
        }
    };

    return { updatePerson };
};

export default useUpdatePerson;
