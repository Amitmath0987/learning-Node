const fs = require("fs");

const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.setHeader("content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>node js App</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' placeholder='enter your message' name='message'></input><button type='submit'>Submit</button></form></body>"
    );
    res.write("</html>");

    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    console.log("when req is send as Reqest.2");
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", `hello amit mathur ${message}`);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>node js App</title></head>");
  res.write("<body><h1>My Node Js Learning</h1></body>");
  res.write("</html>");
  res.end();
};
module.exports = requestHandler;
