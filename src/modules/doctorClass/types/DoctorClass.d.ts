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

export { doctorClassDetails, doctorClassCreationDetails };
