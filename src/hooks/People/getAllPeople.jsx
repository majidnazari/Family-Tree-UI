import { useEffect, useState } from "react";
import { getAuthToken } from "../../utils/authToken";
import { toast } from "react-toastify";
import config from "../../config";
import paginationConfig from "../../config/paginationConfig";

const useAllPeople = (filters = {}) => {
    const [people, setPeople] = useState([]);
    const [paginator, setPaginator] = useState({});
    const [loading, setLoading] = useState(true);
    const token = getAuthToken();

    useEffect(() => {
        const fetchPeople = async () => {
            setLoading(true);

            // Destructure all filters with defaults
            const {
                page = paginationConfig.DEFAULT_FIRST,
                first = paginationConfig.DEFAULT_PAGE,
                orderBy = { column: "id", order: "ASC" },
                birth_date,
                country_code,
                mobile,
                death_date,
                creator_id,
                editor_id,
                first_name,
                gender,
                is_owner,
                last_name,
                status
            } = filters;

            // Helper function to check if value is not null, undefined or empty
            const hasValue = (val) => val !== undefined && val !== null && val !== '';

            const filterLines = [
                `first: ${first}`,
                `page: ${page}`,
                `orderBy: { column: "${orderBy.column}", order: ${orderBy.order} }`,
                hasValue(status) ? `status: ${status}` : '',
                hasValue(country_code) ? `country_code: "${country_code}"` : '',
                hasValue(mobile) ? `mobile: "${mobile}"` : '',
                hasValue(birth_date) ? `birth_date: "${birth_date}"` : '',
                hasValue(death_date) ? `death_date: "${death_date}"` : '',
                hasValue(creator_id) ? `creator_id: ${creator_id}` : '',
                hasValue(editor_id) ? `editor_id: ${editor_id}` : '',
                hasValue(first_name) ? `first_name: "${first_name}"` : '',
                hasValue(last_name) ? `last_name: "${last_name}"` : '',
                hasValue(gender) ? `gender: ${gender}` : '',
                hasValue(is_owner) ? `is_owner: ${is_owner}` : '',
            ].filter(Boolean).join(",\n");

            const query = `
                query getPersons {
                  getPersons(
                    ${filterLines}
                  ) {
                    data {
                      id
                      first_name
                      last_name
                      birth_date
                      death_date
                      gender
                      creator_id
                      is_owner
                      mobile
                      node_code
                      status
                      updated_at
                      Creator {
                        id
                        mobile
                        role
                      }
                      Editor {
                        id
                        mobile
                        role
                      }
                      Addresses {
                        id
                        person_id
                        location_title
                        unit_no
                        street_name
                        floor_no
                        builder_no
                        lat
                        lon
                        status
                        city_id
                        editor_id
                        Creator {
                          id
                          mobile
                          status
                        }
                        Editor {
                          id
                          mobile
                          status
                        }
                        City {
                          id
                          code
                          title
                          province_id
                          province {
                            title
                            country_id
                            country {
                              title
                            }
                          }
                        }
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

                if (result?.data?.getPersons?.data) {
                    setPeople(result.data.getPersons.data);
                    setPaginator(result.data.getPersons.paginatorInfo);
                } else {
                    toast.error("Failed to fetch people.");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("An error occurred while fetching people.");
            } finally {
                setLoading(false);
            }
        };

        fetchPeople();
    }, [JSON.stringify(filters)]); // refetch when filters change

    return { people, paginator, loading };
};

export default useAllPeople;
