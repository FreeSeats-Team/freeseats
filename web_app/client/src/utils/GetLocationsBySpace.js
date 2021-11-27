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
      let location;
      if (idx === -1) {
        location = "General"
      }
      else {
        location = seat.slice(0, idx);
      }
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
