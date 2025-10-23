import axios, { AxiosRequestConfig } from "axios";
import { CarResponse, Car } from "../types";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt")?.replace("Bearer ", "");

  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const getCars = async (): Promise<CarResponse[]> => {
  // 세션 스토리지 상에 'Bearer ' 가 포함되어 있습니다 . 근데 저희가 Postman에서 요청 날릴 때 'Bearer '부분을 빼놓고 붙여넣기  했었던 것을 떠올려서
  // 프론트엔드 상에서 'Bearer '를 제거하고, 그걸 기준으로 요청을 날렸습니다.

  // export를 써놓으면 다른 파일에서 함수를 쓰는 것이 가능함
  // axios의 장점은 비동기를 동기적으로 선언할 수 있는 거
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    getAxiosConfig()
  );

  return response.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<CarResponse> => {
  const token = sessionStorage.getItem("jwt")?.replace("Bearer ", "");

  const response = await axios.delete(link, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    getAxiosConfig()
  );

  return response.data;
};

export type CarEntity = {
  car: Car;
  url: string;
};

export const updateCar = async (carEntity: CarEntity): Promise<CarResponse> => {
  // addcar를 확인하시라

  const response = await axios.put(
    carEntity.url,
    carEntity.car,
    getAxiosConfig()
  );
  return response.data;
};
