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
  isDelete: boolean;
};

export { doctorDetails, doctorCreationDetails };
