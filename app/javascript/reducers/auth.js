import { StarsTwoTone } from "@mui/icons-material";

const initialState = {
  auth_token: null,
  user: {
    id: null,
    username: null,
    email: null,
  },
};

const authRecducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return { ...state, user: action.payload };
    case "DECREMENT":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default authRecducer;
