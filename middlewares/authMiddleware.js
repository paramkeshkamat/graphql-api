const IS_AUTHENTICATED = true;

// could check if jwt token is genuine or not
export const authMiddleware = () => (req, res, next) => {
  if (IS_AUTHENTICATED) {
    req.user = { name: "test" };
  } else {
    req.user = null;
  }
  next();
};
