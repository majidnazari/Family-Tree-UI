import { useEffect, useState } from "react";
import { getAuthToken } from "../../utils/authToken";
import { toast } from "react-toastify";
import config from "../../config";

const useAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [loading, setLoading] = useState(true);
  const token = getAuthToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const query = `
          query getUsers {
            getUsers(
              first: 10,
              orderBy: {column: "id", order: ASC},
              page: 1,
              status: Active
            ) {
              data {
                id
                mobile
                role
                status
                updated_at
                created_at
                country_code
              }
              paginatorInfo {
                count
                currentPage
                firstItem
                hasMorePages
                lastItem
                lastPage
                perPage
                total
              }
            }
          }
        `;

        const response = await fetch(config.GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result?.data?.getUsers?.data) {
          setUsers(result.data.getUsers.data);
          setPaginator(result.data.getUsers.paginatorInfo);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, paginator, loading };
};

export default useAllUsers;
