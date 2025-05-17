import { useEffect, useState } from "react";

import mapFamilyTreeResponse from "../utils/mapFamilyTreeResponse";

const useFamilyTreeData = (personId) => {
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFamilyTree = async () => {
            try {
                const token = localStorage.getItem("token"); // ⬅️ Adjust if you're storing the token elsewhere

                const response = await fetch("http://localhost:8000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmQwYjNlMThlYWNlNjU3ODhmYjhiYTVhYzZjY2Y0Yzk1NTRiYjgyZmExNGEwZjcxMDI5N2I4MzMyOGIzOGVlOGMxNDQyNGY5YzUwMWQwYjEiLCJpYXQiOjE3NDc0Njg3OTUuMzA5NTE5LCJuYmYiOjE3NDc0Njg3OTUuMzA5NTIsImV4cCI6MTc0NzcyNzk5NS4zMDU2MTYsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.QA1EQplyzAQBQmHi9VGQpDm5VqZxsIetASQDrmZ0SVTWjdBJVpvegzfRiNXeLeKBneJuBsvRY6LLJzkN6rIxjK-IdlTJpC1ebAeOnj-R8MqbL1Jy7wJDmu7BC9aBbQVTDopZXcJInIlVC8HryqesME2hsEwun_bxEcSbbGj-miywiwuF3QtbirFbdZ4b9TxthFAyjWrHuQYhRK62KTPZpa9l1EmriJOzGsdjbSA1en46jCzevaEt7JBwI3jP5hym31X2ZIKJzNGpfG-KH4FnhaAtK6pRFCcrlDPENjkkG9MDt7mvf74ak_wkCL-O-Okbrw3cBv6YlmXAYrokYZy6sA_6jNVlCzkTqZXbTf4oo5teG_5_Wr8IJvRTKMb3Uj_7ruQgYDmOmMSCjRy5JaS6MaE1KxQ09hbAUb7pNJawkZEo4nNE60ksUFNtKqmszrr62yOi85axgDf3wkRGWxMA6bAixpTb5txJPHxzgw7w1d5in1ftlA46riDCcbe9YU4HIcIHbfRRnQHeD7GeeduY4UYjDeOzOSoCE80zVoVLX97oK5Ym5f2bVPqGdyHsLAKcRYS9bH3RAdmKhobuRXR0LKiEeZ_nhPUvxUiZKt1etFujGSkhQErrRZY0chncqNF8gPMSSRk2ipyq_dqkalURvuOm5ATiVbtVeG6BZB4QL_Q"
                    },
                    body: JSON.stringify({
                        query: `
            query getPerson {
                getPerson(id: "103") {
                  PersonMarriages {
                    id
                    Man {
                      id
                      first_name
                      last_name
                      gender
                      PersonMarriages {
                        id
                        Man {
                          id
                          first_name
                          last_name
                          gender
                        }
                        Woman {
                          id
                          first_name
                          last_name
                          gender
                        }
                        Children {
                          id
                          first_name
                          last_name
                          gender
                          PersonMarriages {
                            id
                            Man {
                              id
                              first_name
                              last_name
                              gender
                            }
                            Woman {
                              id
                              first_name
                              last_name
                              gender
                            }
                            Children {
                              id
                              first_name
                              last_name
                              gender
                            }
                          }
                        }
                      }
                    }
                    Woman {
                      id
                      first_name
                      last_name
                      gender
                    }
                    Children {
                      id
                      first_name
                      last_name
                      gender
                      PersonMarriages {
                        id
                        Man {
                          id
                          first_name
                          last_name
                          gender
                        }
                        Woman {
                          id
                          first_name
                          last_name
                          gender
                        }
                        Children {
                          id
                          first_name
                          last_name
                          gender
                          PersonMarriages {
                            id
                            Man {
                              id
                              first_name
                              last_name
                              gender
                            }
                            Woman {
                              id
                              first_name
                              last_name
                              gender
                            }
                            Children {
                              id
                              first_name
                              last_name
                              gender
                              PersonMarriages {
                                id
                                Man {
                                  id
                                  first_name
                                  last_name
                                  gender
                                }
                                Woman {
                                  id
                                  first_name
                                  last_name
                                  gender
                                }
                                Children {
                                  id
                                  first_name
                                  last_name
                                  gender
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  gender
                  first_name
                  mobile
                }
                
              }
              
            `,
                        variables: { personId },
                    }),
                });

                const result = await response.json();
               { console.log("datat is:",result);}
                if (result?.data?.getPerson) {
                    const mapped = mapFamilyTreeResponse(result.data.getPerson);
               { console.log("mapped is:",mapped);}
                    
                    setTreeData(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch family tree:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFamilyTree();
    }, [personId]);

    return { treeData, loading };
};

export default useFamilyTreeData;
