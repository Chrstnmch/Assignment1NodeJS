const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader("Content-Type", "text/html");

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My Base URL</title></head>");
    res.write("<body>");
    res.write("<h1> Good day! </h1>");
    res.write("<p> Please enter your username: </p>");
    res.write("<form action='/create-user' method='POST'>");
    res.write("<input type='text' name='username'/>");
    res.write("&nbsp;<button type='submit'> submit </button>");
    res.write("</form>");
    res.write("<br/> <br/>");
    res.write("<a href='/user'> Click this to see list of users </a>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/user") {
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write("<body>");
    res.write("<h1> List of Users </h1>");
    res.write("<ul>");
    res.write("<li> cbing </li>");
    res.write("<li> zmercadejas </li>");
    res.write("<li> zleviste </li>");
    res.write("<li> mgeller </li>");
    res.write("<li> rgeller </li>");
    res.write("<li> pbuffay </li>");
    res.write("<li> jtribbiani </li>");
    res.write("</ul>");
    res.write("<a href='/'> Click this to go back to form </a>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();

      const userName = parseBody.split("=")[1];
      console.log("Logged username: ", userName);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.write("<html>");
  res.write("<head><title>Default Page</title></head>");
  res.write("<body>");
  res.write("<h1> Welcome to my Default Node Page! </h1>");
  res.write("</body>");
  res.write("</html>");
};

module.exports = requestHandler;
