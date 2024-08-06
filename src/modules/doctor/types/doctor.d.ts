type doctorCreationDetails = {
  firstName: string;
  lastName: string;
  specialization: string;
  address: string;
  phone: string;
  clinicPhone: string;
  doctorClass: string;
};

type doctorDetails = {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  address: string;
  phone: string;
  clinicPhone: string;
  doctorClass: string;
  isDeleted: boolean;
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

export { doctorDetails, doctorCreationDetails, metaData };
