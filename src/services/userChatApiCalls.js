const root = "http://localhost:8000/api/"


export const getUsersFromChatService = async (chatId,token) => {
    const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };

    try {
        const response = await fetch(`${root}userchats/${chatId}`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};
export const removeUserToChatService = async (userId,chatId,token) => {
    const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };

    try {
        const response = await fetch(`${root}userchats/user/${userId}/chat/${chatId}`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};
export const addUserToChatService = async (userId,chatId,token) => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };

    try {
        const response = await fetch(`${root}userchats/user/${userId}/chat/${chatId}`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};
export const leaveChatService = async (chatId,token) => {
    const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };

    try {
        const response = await fetch(`${root}userchats/user/${chatId}`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};