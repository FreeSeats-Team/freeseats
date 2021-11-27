import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import maps from '../utils/Maps.js'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FreeSeatsModal = (props) => {
  const { data, spaceName, open, onClose } = props;
  const dataForSpace = data.find((x) => x._id === spaceName);
  console.log(spaceName);
  let map = maps.find((x) => x.id === spaceName);
  if (map)
    console.log(map.src)
  if (!dataForSpace) {
    return <div></div>;
  }
  const seatsByRegionForSpace = dataForSpace["seatsByRegion"];
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Free Seats By Region In {spaceName}
          </Typography>
          {Object.keys(seatsByRegionForSpace).map((region) => {
            return (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {region}: {seatsByRegionForSpace[region].length}
              </Typography>
            );
          })}
          {map && (
            <img src={map.src} style={{maxWidth:'100%'}} alt="Floor Plan" />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FreeSeatsModal;
