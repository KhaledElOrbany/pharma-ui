type doctorClassCreationDetails = {
  name: string;
  visitCount: number;
  notes: string;
  isActive: boolean;
  isDelete: boolean;
};

type doctorClassDetails = {
  id: number;
  name: string;
  visitCount: number;
  notes: string;
  isActive: boolean;
  isDelete: boolean;
};

export { doctorClassDetails, doctorClassCreationDetails };
