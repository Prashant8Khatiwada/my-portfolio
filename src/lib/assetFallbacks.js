import runmycrewImg from "../assets/portfolio/runmycrew.png";
import taskmeshImg from "../assets/portfolio/taskmesh.png";
import fotosfolioImg from "../assets/portfolio/fotosfolio.png";
import sawariImg from "../assets/portfolio/sawari.png";
import kumariImg from "../assets/portfolio/kumari.png";
import abroadImg from "../assets/portfolio/abroadInstitute.png";
import creatopediaImg from "../assets/portfolio/creatopedia.png";
import zipitImg from "../assets/portfolio/zipit.png";
import pacificImg from "../assets/portfolio/pacific.png";
import wealthPanditImg from "../assets/portfolio/wealthPandit.png";
import enimtoImg from "../assets/portfolio/enimto.png";
import youtubeCloneImg from "../assets/portfolio/youtube_clone.png";
import agricultureBankImg from "../assets/portfolio/agricultureBank.png";
import tickticketingImg from "../assets/portfolio/tickticketing.png";
import nmbImg from "../assets/portfolio/nmb.png";
import movieImg from "../assets/portfolio/movie.png";

import nirgunImg from "../assets/testimonials/nirgun.png";
import bibekImg from "../assets/testimonials/bibek.jpg";
import ayushImg from "../assets/testimonials/ayush.png";
import shuklaImg from "../assets/testimonials/shukla.png";

const PROJECT_IMAGE_MAP = {
  runmycrew: runmycrewImg,
  taskmesh: taskmeshImg,
  fotosfolio: fotosfolioImg,
  "sawari expert": sawariImg,
  sawari: sawariImg,
  "kumari bank": kumariImg,
  kumari: kumariImg,
  "abroad institute": abroadImg,
  abroad: abroadImg,
  creatopedia: creatopediaImg,
  zipit: zipitImg,
  "pacific regional bank": pacificImg,
  pacific: pacificImg,
  "wealth pandit": wealthPanditImg,
  wealthpandit: wealthPanditImg,
  "e-nimto": enimtoImg,
  enimto: enimtoImg,
  "youtube clone": youtubeCloneImg,
  youtube: youtubeCloneImg,
  "agriculture development bank": agricultureBankImg,
  adbl: agricultureBankImg,
  tickticketing: tickticketingImg,
  "nmb bank": nmbImg,
  movie: movieImg,
  "movie ticket booking": movieImg,
};

const TESTIMONIAL_AVATAR_MAP = {
  "nirgun subedi": nirgunImg,
  nirgun: nirgunImg,
  "bibek timilsina": bibekImg,
  bibek: bibekImg,
  "aayush shrestha": ayushImg,
  ayush: ayushImg,
  "mritunjay sukla": shuklaImg,
  shukla: shuklaImg,
};

/**
 * Resolves a project's image URL:
 * Returns the remote URL if valid, or falls back to the bundled asset matched by title.
 */
export function getProjectImage(title, remoteUrl) {
  if (remoteUrl && typeof remoteUrl === "string" && remoteUrl.trim().length > 0) {
    return remoteUrl;
  }
  if (!title) return null;
  const key = title.trim().toLowerCase();
  if (PROJECT_IMAGE_MAP[key]) return PROJECT_IMAGE_MAP[key];

  // Partial match search
  for (const [mapKey, img] of Object.entries(PROJECT_IMAGE_MAP)) {
    if (key.includes(mapKey) || mapKey.includes(key)) {
      return img;
    }
  }
  return null;
}

/**
 * Resolves a testimonial's avatar URL:
 * Returns remote avatar URL or falls back to the bundled avatar matched by name.
 */
export function getTestimonialAvatar(name, remoteUrl) {
  if (remoteUrl && typeof remoteUrl === "string" && remoteUrl.trim().length > 0) {
    return remoteUrl;
  }
  if (!name) return null;
  const key = name.trim().toLowerCase();
  if (TESTIMONIAL_AVATAR_MAP[key]) return TESTIMONIAL_AVATAR_MAP[key];

  // Partial match search
  for (const [mapKey, img] of Object.entries(TESTIMONIAL_AVATAR_MAP)) {
    if (key.includes(mapKey) || mapKey.includes(key)) {
      return img;
    }
  }
  return null;
}
