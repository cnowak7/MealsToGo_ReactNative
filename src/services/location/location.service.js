import { FIREBASE_PROJECT_ID } from "@env";
import camelize from "camelize";

export const locationRequest = (searchTerm) => {
  console.log("my search term is " + searchTerm);
  return fetch(
    `http://127.0.0.1:5001/${FIREBASE_PROJECT_ID}/us-central1/geocode?city=${searchTerm}`
  ).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result) => {
  console.log(result);
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
