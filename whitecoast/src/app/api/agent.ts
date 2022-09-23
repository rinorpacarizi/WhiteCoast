import { FoodStaff } from './../models/foodStaff';
import { Food } from './../models/food';
import { Match } from './../models/match';
import { Sport } from './../models/sport';
import { BusLine } from './../models/busLine';
import axios, { AxiosResponse } from "axios";
import { Bus } from '../models/bus';
import { Team } from '../models/team';
import { Mission } from '../models/mission';



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
const Sports = {
  list: () => requests.get<Sport[]>("/sport"),
  details: (id:string)=> requests.get<Sport>(`/sport/${id}`),
  create:(sport: Sport)=> requests.post<void>('/sport',sport),
  update:(sport: Sport)=>requests.put<void>(`/sport/${sport.id}`,sport),
  delete:(id:string)=> requests.del<void>(`/sport/${id}`)
};
const Teams = {
  list: () => requests.get<Team[]>("/team"),
  details: (id:string)=> requests.get<Team>(`/team/${id}`),
  create:(team: Team)=> requests.post<void>('/team',team),
  update:(team: Team)=>requests.put<void>(`/team/${team.id}`,team),
  delete:(id:string)=> requests.del<void>(`/team/${id}`)
};
const Matches = {
  list: () => requests.get<Match[]>("/match"),
  details: (id:string)=> requests.get<Match>(`/match/${id}`),
  create:(match: Match)=> requests.post<void>('/match',match),
  update:(match: Match)=>requests.put<void>(`/match/${match.id}`,match),
  delete:(id:string)=> requests.del<void>(`/match/${id}`)
};
const FoodStaffs = {
  list: () => requests.get<FoodStaff[]>("/foodstaff"),
  details: (id:string)=> requests.get<FoodStaff>(`/foodstaff/${id}`),
  create:(foodstaff: FoodStaff)=> requests.post<void>('/foodstaff',foodstaff),
  update:(foodstaff: FoodStaff)=>requests.put<void>(`/foodstaff/${foodstaff.id}`,foodstaff),
  delete:(id:string)=> requests.del<void>(`/foodstaff/${id}`)
};
const Foods = {
  list: () => requests.get<Food[]>("/food"),
  details: (id:string)=> requests.get<Food>(`/food/${id}`),
  create:(food: Food)=> requests.post<void>('/food',food),
  update:(food: Food)=>requests.put<void>(`/food/${food.id}`,food),
  delete:(id:string)=> requests.del<void>(`/food/${id}`)
};
const Missions = {
  list: () => requests.get<Mission[]>("/mission"),
  details: (id:string)=> requests.get<Mission>(`/mission/${id}`),
  create:(mission: Mission)=> requests.post<void>('/mission',mission),
  update:(mission: Mission)=>requests.put<void>(`/mission/${mission.id}`,mission),
  delete:(id:string)=> requests.del<void>(`/mission/${id}`)
};
const agent = {
  BusLines,
  Buses,
  Sports,
  Teams,
  Matches,
  Foods,
  FoodStaffs,
  Missions,
};
export default agent;
