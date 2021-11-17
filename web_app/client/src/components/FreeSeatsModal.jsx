import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FreeSeatsModal = (props) => {
  const { data, spaceName, open, onClose } = props;
  const dataForSpace = data.find((x) => x._id === spaceName);
  console.log(spaceName);
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
            Free seats by region in {spaceName}
          </Typography>
          {Object.keys(seatsByRegionForSpace).map((region) => {
            return (
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {region}: {seatsByRegionForSpace[region].length}
              </Typography>
            );
          })}
        </Box>
      </Modal>
    </div>
  );
};

export default FreeSeatsModal;
