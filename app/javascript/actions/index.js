import axios from "axios";

export const registerUser = (user) => {
  axios
    .post("/users", user)
    .then((response) => {
      return {
        type: "REGISTER_USER",
        payload: response.data,
      };
    })
    .catch((error) => {
      return {
        type: "REGISTER_USER",
        payload: "error",
      };
    });
};
