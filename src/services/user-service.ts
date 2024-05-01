import create from "./http-service";

export interface Users {
  id: number;
  name: string;
}

export default create("/users");
