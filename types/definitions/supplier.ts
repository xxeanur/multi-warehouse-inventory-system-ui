export interface SupplierDto {
  id: string; // Backend Guid karşılığı
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  
  // YENİ ADRES ALANLARI
  country: string;
  city: string;
  district: string;
  fullAddress: string;
  latitude?: number | null;
  longitude?: number | null;

  taxNumber: string;
  taxOffice: string;
  createdDate: string;
  isActive: boolean;
}

export interface SupplierCreateDto {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  
  country: string;
  city: string;
  district: string;
  fullAddress: string;
  latitude?: number | null;
  longitude?: number | null;

  taxNumber: string;
  taxOffice: string;
}

export interface SupplierUpdateDto {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  
  country: string;
  city: string;
  district: string;
  fullAddress: string;
  latitude?: number | null;
  longitude?: number | null;

  taxNumber: string;
  taxOffice: string;
}