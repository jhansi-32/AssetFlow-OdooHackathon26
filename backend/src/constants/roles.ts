export const ROLES = {
  ADMIN: 'ADMIN',
  ASSET_MANAGER: 'ASSET_MANAGER',
  DEPARTMENT_HEAD: 'DEPARTMENT_HEAD',
  EMPLOYEE: 'EMPLOYEE',
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];

// Roles an Admin is allowed to promote an Employee into.
export const PROMOTABLE_ROLES: RoleName[] = [ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD];
