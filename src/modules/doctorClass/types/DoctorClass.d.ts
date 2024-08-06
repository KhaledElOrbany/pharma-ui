type doctorClassCreationDetails = {
  name: string;
  visitCount: number;
  notes: string;
  isActive: boolean;
  isDeleted: boolean;
};

type doctorClassDetails = {
  id: number;
  name: string;
  visitCount: number;
  notes: string;
  isActive: boolean;
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

export { doctorClassDetails, doctorClassCreationDetails, metaData };
