/**
 * Sistemde gerçekleşen log hareket tipleri.
 * Backend'deki MultiWarehouse.Entity.Enums.Common.AuditActionType ile birebir aynı olmalıdır.
 */
export enum AuditActionType {
  Create = 0,
  Update = 1,
  Delete = 2,
  
  // Security Eylemleri
  Login = 3,
  Logout = 4,
  PasswordChanged = 5,
  EmailChangeRequested = 6,
  EmailChanged = 7,
  SessionRevoked = 8,
  AllOtherSessionsRevoked = 9,

  // Document (Belge) Eylemleri - YENİ EKLENDİ
  DocumentCreated = 10,
  DocumentApproved = 11,
  DocumentCancelled = 12,
  DocumentCompleted = 13
}

export interface AuditLogDto {
  id: string;
  userId: string;
  actionType: AuditActionType;
  tableName: string;
  oldValues?: string | null;
  newValues?: string | null;
  ipAddress?: string | null;
  createdDate: string;

}