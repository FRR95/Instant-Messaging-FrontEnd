const root = "http://localhost:8000/api/"

export const GetProfile = async (token) => {
    const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };

    try {
        const response = await fetch(`${root}user/me`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};