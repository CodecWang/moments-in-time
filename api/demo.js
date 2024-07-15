const exiftool = require("exiftool-vendored").exiftool;

async function modifyExifDate() {
  try {
    await exiftool.write(
      "/Users/arthur/coding/photoview/docker-compose/photos/iShot_2023-08-01_23.11.1.png",
      {
        all: "",
        DateTimeOriginal: "2024:07:14 00:00:00",
      }
    );

    console.log("EXIF data updated successfully.");
  } catch (err) {
    console.error("Error updating EXIF data:", err);
  } finally {
    await exiftool.end();
  }
}

modifyExifDate();
