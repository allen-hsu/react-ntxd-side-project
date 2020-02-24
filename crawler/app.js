let { PythonShell } = require("python-shell");
const fs = require("fs");
const jsonfile = require("jsonfile");
let options = {
  mode: "text",
  // pythonPath: 'path/to/python',
  // pythonOptions: ['-u'], // get print results in real-time
  // scriptPath: 'path/to/my/scripts',
  args: [
    "Key your api key", // api key
    // "restaurant|cafe|night_club|movie_theater|shoe_store|book_store|clothing_store|shopping_mall|store", //types
    "",
    "25.047214, 121.504573", // lat/lng of point delimiting the search area; e.g. (48.132986, 11.566126)
    "25.042331, 121.508049", // lat/lng of point delimiting the search area; e.g. (48.142199, 11.580047)
    "20", // number of threads used; e.g. 20
    "180", //radius (opt) int; meters; up to 50,000 for radar search; e.g. 180; this has can be adapted for very dense areas
    false //all_places (opt) bool; include/exclude places without populartimes
  ]
};

function writeJSON(object) {
  fs.mkdir("json", function() {
    var filePath = "./json/data.json";
    fs.writeFileSync(filePath, object, "utf8");
  });
}

PythonShell.run("get_populartimes.py", options, function(err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  // console.log("results: %s", results);
  writeJSON(results);
});
