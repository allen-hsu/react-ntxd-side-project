var express = require("express");
var app = express();

// const googleMapsClient = require("@google/maps").createClient({
//   key: "",
//   Promise: Promise
// });

// app.get("/", function(req, res) {
//   res.send("Hello World!");
// });

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
  // casper.start("https://connect.data.com/login");
  // casper.userAgent(
  //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
  // );
  // casper.then(function() {
  //   // lots of code here, and a few more cassper.then()s
  // });

  // casper.run(function() {
  //   console.log("\n\nFinished");
  //   response.statusCode = 200;
  //   var body = JSON.stringify({
  //     phoneNumber: "1800-YOLO-SWAG"
  //   });

  //   response.write(body);
  //   response.close();
  // });
});

const fs = require("fs");
const request = require("superagent");
const jsonfile = require("jsonfile");
const image_downloader = require("image-downloader");
const uuid = require("uuid");
const key = require("./key.json").key;
const config = require("./config.json");

// const Promise = require("q").Promise;

const googleMaps = require("@google/maps").createClient({
  key: key,
  Promise: Promise
});

function getList(type) {
  googleMaps
    .placesNearby({
      language: config.language,
      location: config.location,
      radius: config.radius,
      type: type
    })
    .asPromise()
    .then(response => {
      console.log(response.json.results);
      var results = response.json.results;
      writeJSON("list.json", results);

      // results.forEach(function(result, index) {
      //   getDetail(result.place_id);
      // });
    })
    .catch(err => {
      console.log(err);
    });
}

function getDetail(placeid) {
  googleMaps
    .place({
      placeid: placeid,
      language: config.language
    })
    .asPromise()
    .then(response => {
      // console.log(response.json);
      console.log(response.json);
      const result = response.json.result;
      // console.log(response.json.results);
    })
    .catch(err => {
      console.log(err);
    });
}

function writeJSON(fileName, object) {
  fs.mkdir("json", function() {
    var filePath = "./json/" + fileName;
    jsonfile.writeFileSync(filePath, object);
  });
}

getDetail("ChIJMaiuJ4Y4aTQRrGpwd8o1Ta0");
// getList("bar");
// getList("cafe");
// getList("restaurant");
// getList("store");
// getList("shopping_mall");
// getList("shoe_store");
// getList("movie_theater");

// function writeImage(referenceId, uuid) {
//   console.log(referenceId);
//   const url = `https://maps.googleapis.com/maps/api/place/photo?key=${key}&photoreference=${referenceId}&maxheight=500&maxwidth=500`;
//   console.log(url);
//   const dest = `./image/${uuid}.jpg`;
//   console.log(dest);
//   const options = {
//     url,
//     dest, // Save to /path/to/dest/image.jpg
//     done: function(err, filename, image) {
//       if (err) {
//         throw err;
//       }
//       console.log("File saved to", filename);
//     }
//   };
//   fs.mkdir("image", function() {
//     image_downloader(options);
//   });
// }

// function getDetail(placeid) {
//   const url = "https://maps.googleapis.com/maps/api/place/details/json";
//   const parameter = {
//     placeid,
//     key,
//     language: config.language
//   };
//   function getDetailEnd(err, res) {
//     if (err) {
//       console.log("error", err);
//     } else {
//       var result = res.body.result;
//       console.log(result.name);
//       // if (result.photos) {
//       //   var photoid = uuid.v4();
//       //   var referenceId = result.photos[0].photo_reference;
//       //   result.photos[0].url = `${photoid}.jpg`;
//       //   writeImage(referenceId, photoid);
//       // }
//       writeJSON(`${placeid}.json`, result);
//     }
//   }
//   request
//     .get(url)
//     .query(parameter)
//     .end(getDetailEnd);
// }

// getList();
