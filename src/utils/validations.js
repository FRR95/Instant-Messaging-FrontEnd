export const validation = (type, value) => {
    switch (type) {
        case "name":


            if (value.length < 4 || value.length > 10) {
                return "Por favor, el nombre debe de tener mínimo 4 caracteres y un maximo de 10.";
            }

            return "";

        case "nickname":
            const nicknameRegex = /@/i;

            if (!nicknameRegex.test(value)) {
                return "Por favor, el nickname debe de tener un @ al principio.";
            }

            if (value.length < 4 || value.length > 10) {
                return "El nickname debe de tener un minimo de 4 caracteres y un maximo de 10";
            }

            return "";

        case "email":

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!emailRegex.test(value)) {
                return "Por favor, el formato del email debe de ser correcto.";
            }

            return "";

        case "password":

            if (value.length < 6 || value.length > 10) {
                return "La contraseña debe de tener un minimo de 6 caracteres y un maximo de 10";
            }

            return "";
        default:
            console.log("Something went wrong!");
    }
};