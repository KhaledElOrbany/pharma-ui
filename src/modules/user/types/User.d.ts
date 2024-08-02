type userCreationDetails = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
};

type userDetails = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  isDelete: boolean;
  city: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
  role: {
    id: number;
    name: string;
    description: string;
  };
};

export { userDetails, userCreationDetails };
