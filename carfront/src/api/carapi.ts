import axios from "axios";
import { CarResponse, Car } from "../types";

export const getCars = async (): Promise<CarResponse[]> => {
  // export를 써놓으면 다른 파일에서 함수를 쓰는 것이 가능함
  // axios의 장점은 비동기를 동기적으로 선언할 수 있는 거
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);

  return response.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<CarResponse> => {
  const response = await axios.delete(link);
  return response.data;
};

export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export type CarEntity = {
  car: Car;
  url: string;
};

export const updateCar = async (carEntity: CarEntity): Promise<CarResponse> => {
  const response = await axios.put(carEntity.url, carEntity.car, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
