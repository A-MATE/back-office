export type Logo = {
  large: string;
  small: string;
  medium: string;
};

export type Organizations = {
  id: string;
  name: string;
  type: string;
  logo: Logo | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  deletedAt: string | null;
};
