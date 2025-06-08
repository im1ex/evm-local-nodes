const id = Math.floor(Math.random() * 65535);

const requestData = JSON.stringify({
  jsonrpc: "2.0",
  method: "net_listening",
  params: [],
  id
});

const request = require("http").request(
  "http://localhost:8545",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestData),
    }
  },
  response => {
    if (response.statusCode !== 200 || !/^application\/json/.test(response.headers['content-type'])) {
      console.log(response);
      process.exit(1);
    }

    response.setEncoding('utf8');
    let rawData = '';
    response.on('data', chunk => rawData += chunk);
    response.on('end', () => {
      try {
        console.log(rawData);
        const responseData = JSON.parse(rawData);

        if (responseData?.jsonrpc !== "2.0") {
          process.exit(2);
        }
        if (responseData?.id !== id) {
          process.exit(3);
        }
        if (responseData?.result !== true) {
          process.exit(4);
        }

        process.exit(0);
      } catch (e) {
        console.log(e);
        process.exit(1);
      }
    });
  }
).on("error", e => {
  console.log(e);
  process.exit(1);
});
request.write(requestData);
request.end();
