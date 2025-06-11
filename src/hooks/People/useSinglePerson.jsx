import { useEffect, useState } from "react";
import { getAuthToken } from "../../utils/authToken";
import { toast } from "react-toastify";
import config from "../../config";

const useSinglePerson = (id) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getAuthToken();

  useEffect(() => {
    if (!id) return;

    const fetchPerson = async () => {
      setLoading(true);

      const query = `
        query getPerson {
          getPerson(id: "${id}") {
            id
            gender
            first_name
            death_date
            birth_date
            is_owner
            last_name
            mobile
            node_code
            status
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

        if (result?.data?.getPerson) {
          setPerson(result.data.getPerson);
        } else {
          toast.error("Failed to fetch person.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("An error occurred while fetching the person.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  return { person, loading };
};

export default useSinglePerson;
