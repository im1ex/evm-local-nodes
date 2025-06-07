require("http").get(
  {
    host: "localhost",
    port: 2368,
    path: "/ghost/api/admin/site/",
    headers: {
      "X-Forwarded-Proto": "https"
    }
  },
  res => process.exit(res.statusCode === 200 ? 0 : 1)
).on("error", () =>
  process.exit(1)
);