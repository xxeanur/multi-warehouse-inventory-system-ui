export enum WarehouseOperationalStatus {
  Active = 1,
  Passive = 2,
  UnderMaintenance = 3,
}

export interface WarehouseDto {
  id: string;
  name: string;
  country: string;
  city: string;
  district: string;
  fullAddress: string;
  latitude?: number | null;
  longitude?: number | null;
  phone: string;
  managerId?: string | null;
  managerName?: string;
  maxCapacity: number;
  usedCapacity: number;
  createdDate: string;
  operationalStatus: WarehouseOperationalStatus;
}

export interface WarehouseCreateDto {
  name: string;
  country: string;
  city: string;
  district: string;
  fullAddress: string;
  latitude?: number | null;
  longitude?: number | null;
  phone: string;
  managerId?: string | null;
  maxCapacity: number;
  operationalStatus: WarehouseOperationalStatus;
}

export interface WarehouseUpdateDto {
  id: string;
  name: string;
  country: string;
  city: string;
  district: string;
  fullAddress: string;
  latitude?: number | null;
  longitude?: number | null;
  phone: string;
  managerId?: string | null;
  maxCapacity: number;
  operationalStatus: WarehouseOperationalStatus;
}
