import { Car } from "../types";
import { ChangeEvent } from "react";
import { DialogContent, TextField, Stack } from "@mui/material";

type DialogFormProps = {
  // DTO처럼 생각하면 된다고 했음
  car: Car;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  // props안 쓰려고 객체 구조 분해 해서 car로 씀
  return (
    <>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />{" "}
          <br />
          <TextField
            label="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />{" "}
          <br />
          <TextField
            label="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />{" "}
          <br />
          <TextField
            label="Reg.No"
            name="registrationNumber"
            value={car.registrationNumber}
            onChange={handleChange}
          />{" "}
          <br />
          <TextField
            label="Year"
            name="modelYear"
            value={car.modelYear}
            onChange={handleChange}
          />{" "}
          <br />
          <TextField
            label="Price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />{" "}
          <br />
        </Stack>
      </DialogContent>
    </>
  );
}

export default CarDialogContent;
