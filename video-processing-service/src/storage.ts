import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

const storage = new Storage();

const rawVideoBucketName = "benzel-yt-raw-videos";
const processedVideoBucketName = "benzel-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * Creates the local directories for raw and processed videos.
 */

export function setupDirectories() {}

/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */

export function convertVideo(rawVideoName: string, processedVideoName: string) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
      .outputOptions(
        "-vf",
        "scale='if(gte(iw/ih,1),floor(360*iw/ih/2)*2,360)':'if(gte(iw/ih,1),360,floor(360*ih/iw/2)*2)'"
      ) // Adjust width to be divisible by 2 and then convert to 360p
      .on("end", () => {
        console.log("Video processing finished successfully.");
        resolve();
      })
      .on("error", (err) => {
        console.log(`An error occurred: ${err.message}`);
        reject(err);
      })
      .save(`${localProcessedVideoPath}/${processedVideoName}`);
  });
}
