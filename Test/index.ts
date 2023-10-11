import express from "express";
import path from "path";
import { Storage } from "@google-cloud/storage";
import Multer from "multer";

const app = express();
const port = 8080;
const src = "C:\\Users\\Natalia Monroy\\Downloads\\DLC\\Projects\\AnUNciate\\dist\\Test\\views";
app.use(express.static(src));

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 2000 * 2000
  },
});

let projectId = "spatial-cargo-324302"; // Get this from Google Cloud
let keyFilename = "spatial-cargo-324302-da9a3756641e.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("img-anunciate"); // Get this from Google Cloud -> Storage

// Gets all files in the defined bucket
app.get("/upload", async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    res.send([files]);
    console.log("Success");
  } catch (error) {
    res.send("Error:" + error);
  }
});

// Streams file upload to Google Storage
app.post("/upload", multer.single("imgfile"), (req, res) => {
  console.log("Made it /upload");
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send("Success");
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get the main index html file
app.get("/", (req, res) => {
  res.sendFile(src + "/index.html");
});

// Start the server on port 8080 or as defined
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(src)
});