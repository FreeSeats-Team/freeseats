const getLocationsBySpace = (data) => {
  if (!data) {
    console.error("data not yet loaded");
    return {};
  }
  const locationsBySpace = data.map((x) => {
    const y = { ...x };
    y.seatsByRegion = {};
    Object.keys(x.seats).forEach(seat => {
      const idx = seat.lastIndexOf("_");
      const location = seat.slice(idx + 1);
      const currSeats = y.seatsByRegion[location];
      if (currSeats) {
        y.seatsByRegion[location].push(x.seats[seat]);
      } else {
        y.seatsByRegion[location] = [x.seats[seat]];
      }
    });
    return y;
  });
  return locationsBySpace;
};

export default getLocationsBySpace;
