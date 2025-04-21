const http = require('http');

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server gliding at http://localhost:${PORT}`);

const data = {
  movies: [
    {
      title: "Blade Runner 2049",
      genre: "Sci-Fi",
      cast: ["Ryan Gosling", "Harrison Ford"],
      ratings: {
        IMDB: 8.0,
        RottenTomatoes: "87%"
      }
    },
    {
      title: "Spirited Away",
      genre: "Fantasy",
      cast: ["Rumi Hiiragi", "Miyu Irino"],
      ratings: {
        IMDB: 8.6,
        RottenTomatoes: "97%"
      }
    }
  ],
  series: [
    {
      title: "Stranger Things",
      seasons: [
        { season: 1, year: 2016 },
        { season: 2, year: 2017 }
      ],
      mainCharacters: ["Eleven", "Mike"]
    },
    {
      title: "Arcane",
      seasons: [{ season: 1, year: 2021 }],
      mainCharacters: ["Vi", "Jinx"]
    }
  ],
  songs: [
    {
      title: "After Dark",
      artist: "Mr. Kitty",
      genre: "Synthwave"
    },
    {
      title: "Doomed",
      artist: "Bring Me The Horizon",
      genre: "Alt Rock"
    }
  ]
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  switch (req.url) {
    case "/movies":
      res.writeHead(200);
      res.end(JSON.stringify(data.movies, null, 2));
      break;
    case "/series":
      res.writeHead(200);
      res.end(JSON.stringify(data.series, null, 2));
      break;
    case "/songs":
      res.writeHead(200);
      res.end(JSON.stringify(data.songs, null, 2));
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Not Found, fam 😔");
  }
});


});
