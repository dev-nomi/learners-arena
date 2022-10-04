export const registerUser = (payload) => {
  return {
    type: "REGISTER_USER",
    payload: payload,
  };
};

export const signInUser = (payload) => {
  return {
    type: "SIGNIN_USER",
    payload: payload,
  };
};
