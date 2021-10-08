import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Payment Method
          </Typography>
          <div className="form-control py-5">
           {/* <label className="cursor-pointer label"> */}
           <div className="flex flex-row space-x-5">
            <span className="label-text">UPI</span> 
            <input type="radio" name="opt" className="radio radio-primary"/>
            <span className="label-text pl-10">Net Banking</span> 
            <input type="radio" name="opt" className="radio radio-primary"/>             
           </div>

           {/* </label> */}
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Terms & Condition
            <li className="pt-5">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </li> 
            <li>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </li>
            <li>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </li>
            <li>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </li>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
