//This is my orginal code for the mock media server 

const http = require('http');

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

  // Handle GET requests
  if (req.method === 'GET') {
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
        res.end("404 - Not Found, fam 😔eish ");
    }
  }
  
  // Handle POST requests
  else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const newItem = JSON.parse(body);
      switch (req.url) {
        case "/movies":
          data.movies.push(newItem);
          res.writeHead(201);
          res.end(JSON.stringify(data.movies, null, 2));
          break;
        case "/series":
          data.series.push(newItem);
          res.writeHead(201);
          res.end(JSON.stringify(data.series, null, 2));
          break;
        case "/songs":
          data.songs.push(newItem);
          res.writeHead(201);
          res.end(JSON.stringify(data.songs, null, 2));
          break;
        default:
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 - Not Found, fam 😔");
      }
    });
  }

  // Handle DELETE requests
  else if (req.method === 'DELETE') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const { title } = JSON.parse(body);

      switch (req.url) {
        case "/movies":
          data.movies = data.movies.filter(movie => movie.title !== title);
          res.writeHead(200);
          res.end(JSON.stringify(data.movies, null, 2));
          break;
        case "/series":
          data.series = data.series.filter(series => series.title !== title);
          res.writeHead(200);
          res.end(JSON.stringify(data.series, null, 2));
          break;
        case "/songs":
          data.songs = data.songs.filter(song => song.title !== title);
          res.writeHead(200);
          res.end(JSON.stringify(data.songs, null, 2));
          break;
        default:
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 - Not Found, fam 😔eish");
      }
    });
  }

  // Handle PUT requests
  else if (req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const updatedItem = JSON.parse(body);
      let updatedArray;

      switch (req.url) {
        case "/movies":
          updatedArray = data.movies.map(movie => 
            movie.title === updatedItem.title ? updatedItem : movie
          );
          data.movies = updatedArray;
          res.writeHead(200);
          res.end(JSON.stringify(data.movies, null, 2));
          break;
        case "/series":
          updatedArray = data.series.map(series => 
            series.title === updatedItem.title ? updatedItem : series
          );
          data.series = updatedArray;
          res.writeHead(200);
          res.end(JSON.stringify(data.series, null, 2));
          break;
        case "/songs":
          updatedArray = data.songs.map(song => 
            song.title === updatedItem.title ? updatedItem : song
          );
          data.songs = updatedArray;
          res.writeHead(200);
          res.end(JSON.stringify(data.songs, null, 2));
          break;
        default:
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 - Not Found, fam 😔eiishh");
      }
    });
  }
  
  //Handle unsupported methods
  else {
    res.writeHead(405, { "Content-Type": "text/plain" });
res.end("405 - Method Not Allowed");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
