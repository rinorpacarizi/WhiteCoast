import { BusLine } from './../models/busLine';
import axios, { AxiosResponse } from "axios";
import { Bus } from '../models/bus';


const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const BusLines = {
  list: () => requests.get<BusLine[]>("/busline"),
  details: (id:string)=> requests.get<BusLine>(`/busline/${id}`),
  create:(busline: BusLine)=> requests.post<void>('/busline',busline),
  update:(busline: BusLine)=>requests.put<void>(`/busline/${busline.id}`,busline),
  delete:(id:string)=> requests.del<void>(`/busline/${id}`)
};

const Buses = {
  list: () => requests.get<Bus[]>("/bus"),
  details: (id:string)=> requests.get<Bus>(`/bus/${id}`),
  create:(bus: Bus)=> requests.post<void>('/bus',bus),
  update:(bus: Bus)=>requests.put<void>(`/bus/${bus.id}`,bus),
  delete:(id:string)=> requests.del<void>(`/bus/${id}`)
};
const agent = {
  BusLines,
  Buses
};
export default agent;
