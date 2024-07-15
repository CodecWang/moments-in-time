import { promises as fs } from "fs";
import { getFileHash } from "./hash";
import { generateThumbnail } from "./thumbnail";
import exif from "exif-reader";

async function readJsonFile(filePath: string) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("error", err);
  }
}

async function writeJsonFile(data: object, filePath: string) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString, "utf8");
    return true;
  } catch (err) {
    console.error("error:", err);
    return false;
  }
}

/**
 * Update the database based on the scanned files
 * This is a time-consuming operation, consider running it asynchronously
 * @param scannedFiles - The files that have been scanned
 */
export async function updateDB(scannedFiles: Photo[]) {
  const dbPhotoJson =
    "/Users/arthur/coding/moments-in-time/api/fake-data/photo.json";
  const dbFiles = await readJsonFile(dbPhotoJson);
  const dbFilesMap = new Map<string, Photo>(
    dbFiles.map((item: Photo) => [item.path, item])
  );
  const scannedFilesMap = new Map<string, Photo>(
    scannedFiles.map((item) => [item.path, item])
  );

  for (const [path, scannedFile] of scannedFilesMap) {
    const dbFile = dbFilesMap.get(path);

    // If the file is new or has been modified, update the database
    // TODO(arthur): compare the hash of the file to determine if it has been modified
    if (!dbFile || dbFile.modifiedTime !== scannedFile.modifiedTime) {
      const buffer = await fs.readFile(path);
      // item.exif = exif(await generateThumbnail(item.path, buffer));
      // item.exif = await exifTool.read(item.path);
      scannedFile.hash = await getFileHash(buffer);
      dbFilesMap.set(path, scannedFile);
    }
  }

  // Delete the files that are no longer in the local files
  dbFilesMap.forEach((_, key) => {
    if (!scannedFilesMap.has(key)) {
      dbFilesMap.delete(key);
    }
  });

  // Convert the updated Map back to an array
  const updatedDBTableArray = Array.from(dbFilesMap.values());

  // Write the updated database to the JSON file once
  return await writeJsonFile(updatedDBTableArray.sort(), dbPhotoJson);
}
