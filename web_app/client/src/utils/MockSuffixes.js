import { getAllFreeSeats } from "../api";

const generateLocation = () => {
  const locations = ["tables", "lounge", "books"];
  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];
  return randomLocation;
};

const mockSuffixes = async () => {
  const res = await getAllFreeSeats();
  const data = await res.data.data;

  // Mapping data retrieved to add suffixes to the end randomly
  // because currently data in the database does not have these suffixes
  const locationData = data.map((x) =>
    Object.fromEntries(
      Object.entries(x).map(([k, v]) => {
        if (k === "seats") {
          return [
            k,
            Object.fromEntries(
              Object.entries(v).map(([k1, v1]) => {
                return [k1.concat("_", generateLocation()), v];
              })
            ),
          ];
        } else {
          return [k, v];
        }
      })
    )
  );
  return locationData;
};

export default mockSuffixes;
