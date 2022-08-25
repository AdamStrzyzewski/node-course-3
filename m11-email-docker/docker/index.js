const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json("Hello from docker - after update");
});

app.listen(3000, () => {
  console.log(`running on 3000`);
});

// docker ps

// docker build . -t adam/node-course-3
// docker images
// docker rmi IMAGE_ID - usunięcie image

// docker run -P -d adam/node-course-3
// -P opublikowanie portów
// -d detached

// docker logs container_id
// docker stop container_id
// docker run -p 9002:3000 -d adam/node-course-3

// docker-compose up -d --build
// docker-compose ps
