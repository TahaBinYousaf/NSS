import config from "@/config/config";

export default function getImagePath(path) {
  return `${config.SERVER_ASSETS}/${path}`;
}
