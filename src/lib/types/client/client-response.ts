export type CLoginResult = {
  user: {
    id: string;
    name: string;
    email: string;
    roles: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
