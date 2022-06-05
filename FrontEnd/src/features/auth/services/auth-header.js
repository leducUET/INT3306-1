function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return {
      headers: {
        Authorization: `Bearer ${user.user.token}`,
      },
    };
  } else {
    return {};
  }
}

export default authHeader;
