import React, { useEffect, useCallback } from 'react';
import { UseGetToken } from './useGetToken';
import axios from 'axios';

function usePostStory(content, caption) {
    const { headers } = UseGetToken();

    // Memoize the function to prevent unnecessary re-creations
    const add_Story = useCallback(async () => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/user/add-story`,
                { content, Story_discription: caption },
                {
                    headers: {
                        ...headers,
                    },
                    withCredentials: true,
                }
            );

            if (res) {
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [content, caption, headers]);

    useEffect(() => {
        if (content && caption) {
            add_Story();
        }
    }, [content, caption, add_Story]);

    return { add_Story };
}

export default usePostStory;
