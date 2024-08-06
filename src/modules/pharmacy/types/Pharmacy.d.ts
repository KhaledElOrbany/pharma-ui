type pharmacyDetails = {
  id: number;
  name: string;
  owner: number;
  address: string;
  phone: string;
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

export { pharmacyDetails, metaData };
