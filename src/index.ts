import app from "./app";

const port = process.env.CHALLENGE_PORT || 3030;

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
