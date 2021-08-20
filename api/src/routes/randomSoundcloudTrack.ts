import router from "./router";
import { Request, Response } from "express-async-router";
import {
  getRandomRaEventArtists,
  getRandomSoundcloudTrack,
  generateSoundcloudEmbed,
} from "../utils/raScraper";
import { RETRY_LIMIT } from "../constants";
import { Crawler } from "../utils/Crawler";
import { logSuccess, logError, logWarning } from "../utils/logger";

const crawler = new Crawler();
crawler.init();

let retryCount = 0;
// This is the endpoint for the client to interact with the server
router.get(
  "/api/random-soundcloud-track",
  async (req: Request, res: Response) => {
    console.time("raFunction");
    const { location, week, autoPlay } = req.query;

    const page = await crawler.getPage();

    retryCount = 0;

    try {
      const randomRaEventDetails = await getRandomRaEventArtists(
        location as string,
        week as string,
        page
      );

      logSuccess(`SOUNDCLOUD LINK: ${randomRaEventDetails.randomEventScLink}`);

      const randomSoundcloudTrack = await getRandomSoundcloudTrack(
        randomRaEventDetails.randomEventScLink
      );
      logSuccess(`SOUNDCLOUD TRACK: ${randomSoundcloudTrack}`);

      const soundcloudOembed = await generateSoundcloudEmbed(
        randomSoundcloudTrack,
        // Should extendx Red.query type definitions
        (autoPlay as unknown) as boolean
      );

      res.json({
        ...soundcloudOembed,
        ...randomRaEventDetails,
      });
    } catch (error) {
      if (retryCount < RETRY_LIMIT) {
        logError("GENERAL ERROR. RETRYING PREVIOUS REQUEST!");
        retryCount++;
        res.redirect(req.originalUrl);
      } else {
        res.status(408).json("Request Timeout");
      }
    }

    console.timeEnd("raFunction");
  }
);

export default router;
