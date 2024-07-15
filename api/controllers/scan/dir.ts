import path from "path";

/**
 * Removes subdirectories from the list of directories and returns only the top-level directories
 * @param directories - List of directories
 * @returns List of top-level directories
 */
export function filterTopLevelDirectories(directories: string[]) {
  const topLevelDirectories = directories.filter((dir, _, arr) => {
    // Check if any other directory in the array is a parent of the current directory
    const isSubdirectory = arr.some((otherDir) => {
      return dir !== otherDir && dir.startsWith(otherDir + path.sep);
    });

    // Keep the directory if it's not a subdirectory of any other
    return !isSubdirectory;
  });

  return topLevelDirectories;
}
