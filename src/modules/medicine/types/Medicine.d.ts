type medicineDetails = {
  id: number;
  name: string;
  activeIngredient: string;
  description: string;
  price: number;
  type: number;
  notes: string;
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

export { medicineDetails, metaData };
