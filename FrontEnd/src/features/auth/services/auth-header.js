function authHeader() {
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  if (currentUser && currentUser.user.token) {
    return {
      headers: {
        Authorization: `Bearer ${currentUser.user.token}`,
      },
    };
  } else {
    return {};
  }
}

export default authHeader;
