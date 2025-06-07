import { useEffect, useState } from "react";
import { getAuthToken } from "../../utils/authToken";
import { toast } from "react-toastify";
import config from "../../config";
import paginationConfig from '../../config/paginationConfig';

const useAllUsers = (filters = {}) => {
  const [users, setUsers] = useState([]);
  const [paginator, setPaginator] = useState({});
  const [loading, setLoading] = useState(true);
  const token = getAuthToken();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      // Build query params
      const {
        page = paginationConfig.DEFAULT_FIRST,
        first = paginationConfig.DEFAULT_PAGE,
        orderBy = { column: "id", order: "ASC" },
        mobile,
        country_code,
        role,
        status
      } = filters;

      // Prepare filter lines
      const filterLines = [
        `first: ${first}`,
        `page: ${page}`,
        `orderBy: { column: "${orderBy.column}", order: ${orderBy.order} }`,
        status ? `status: ${status}` : '',
        country_code ? `country_code: "${country_code}"` : '',
        mobile ? `mobile: "${mobile}"` : '',
        role ? `role: ${role}` : ''
      ].filter(Boolean).join(",\n");

      const query = `
        query getUsers {
          getUsers(
            ${filterLines}
          ) {
            data {
              id
              mobile
              role
              status
              updated_at
              created_at
              country_code
              OwnerPerson{
                id
                first_name
                last_name
                birth_date
                
              }
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

        if (result?.data?.getUsers?.data) {
          setUsers(result.data.getUsers.data);
          setPaginator(result.data.getUsers.paginatorInfo);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [JSON.stringify(filters)]); // rerun only when filters change

  return { users, paginator, loading };
};

export default useAllUsers;
