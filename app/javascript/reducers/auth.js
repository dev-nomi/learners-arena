const initialState = {
  auth_token: null,
  isLoggedIn: false,
  user: {
    id: null,
    username: null,
    email: null,
  },
};

const authRecducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        user: action.payload.data.user,
        auth_token: action.payload.headers.authorization,
      };
    case "SIGNIN_USER":
      return {
        ...state,
        user: action.payload.data.user,
        auth_token: action.payload.headers.authorization,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default authRecducer;
