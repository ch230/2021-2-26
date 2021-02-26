var domain = "";
if (process.env.NODE_ENV == "development") {
  domain = "/devserver";
} else if (process.env.NODE_ENV == "production") {
  domain = "/devserver";
} else if (process.env.NODE_ENV == "test") {
  domain = "/devserver";
}

export default domain;
