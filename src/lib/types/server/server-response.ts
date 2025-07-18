import { User } from "@/lib/schemas/master-data/user.schema";

export type SLoginResult = {
  user: User;
  access_token: string;
  refresh_token: string;
};
