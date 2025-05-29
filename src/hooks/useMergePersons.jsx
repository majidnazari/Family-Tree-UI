// src/hooks/useMergePersons.js
import { getAuthToken } from "../utils/authToken";
import { toast } from "react-toastify";
import config from "../config";


const useMergePersons = () => {
  const mergePersons = async (sender_ids, receiver_ids) => {
    if (sender_ids.length !== receiver_ids.length) {
      toast.error("Sender and Receiver lists must be of equal length.");
      return;
    }

    const confirm = window.confirm("Are you sure you want to merge all selected person pairs?");
    if (!confirm) return;

    const token = getAuthToken();

    for (let i = 0; i < sender_ids.length; i++) {
      const senderId = sender_ids[i];
      const receiverId = receiver_ids[i];

      const query = `
        mutation {
          mergePersons(primaryPersonId: ${senderId}, secondaryPersonId: ${receiverId}) {
            id
            first_name
            last_name
            gender
            birth_date
            created_at
            creator_id
            death_date
            deleted_at
            editor_id
            is_owner
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
          toast.error(error.end_user_message || error.message || "Merge failed");
          throw new Error("Merge failed for pair " + senderId + " → " + receiverId);
        }
      } catch (err) {
        console.error("Merge Error:", err);
        toast.error(`Merging failed at pair: ${senderId} → ${receiverId}`);
        throw err;
      }
    }

    toast.success("All pairs merged successfully!"); 
  };

  return { mergePersons };
};

export default useMergePersons;
