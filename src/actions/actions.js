

export const actionCreatorUpdateAuth = (payload) => {
    return {
      type: "UPDATEAUTH",
      payload,
    };
  };
  
  export const actionCreatorLogout = () => {
    return {
      type: "LOGOUT",
    };
  };