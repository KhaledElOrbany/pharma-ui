type userCreationDetails = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
};

type userDetails = {
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

type metaData = {
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

export { userDetails, userCreationDetails, metaData };
