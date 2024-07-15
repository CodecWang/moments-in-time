import path from "path";

/**
 * Removes subdirectories from the list of directories and returns only the top-level directories
 * @param directories - List of directories
 * @returns List of top-level directories
 */
export function filterTopLevelDirectories(directories: string[]) {
  // Step 1: Remove duplicates
  const uniqueDirectories = Array.from(new Set(directories));

  // Step 2: Filter top-level directories
  return uniqueDirectories.filter((dir, _, arr) => {
    // Check if the current directory is not a subdirectory of any other directory
    return !arr.some(
      (otherDir) => dir !== otherDir && dir.startsWith(otherDir + path.sep)
    );
  });
}
