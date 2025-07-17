export type SLoginResult = {
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  access_token: string;
  refresh_token: string;
};
