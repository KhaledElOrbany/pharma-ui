type UserCreationDetails = {
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email?: string;
  gender: 'MALE' | 'FEMALE';
  role: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
};

type UserProps = {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  isDeleted: boolean;
  city: string;
  role: string;
};

type UserMetaData = {
  page: number;
  size: number;
  total: number;
  tableMetaData: {
    tableName: string;
    columnName: string;
    columnType: string;
    hasLink: boolean;
    isSearchable: boolean;
    isSortable: boolean;
    isVisible: boolean;
    link: string;
  }[];
};

export { UserProps, UserCreationDetails, UserMetaData };
