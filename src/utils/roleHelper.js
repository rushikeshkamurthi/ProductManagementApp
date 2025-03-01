export const canManageAccounts = role => role === 'EXTERNAL_ADMIN';
export const canManageShops = role =>
  ['EXTERNAL_ADMIN', 'EXTERNAL_SUB_ADMIN'].includes(role);
export const canManageProducts = role =>
  ['EXTERNAL_ADMIN', 'EXTERNAL_SUB_ADMIN'].includes(role);
export const canViewProducts = role =>
  ['EXTERNAL_ADMIN', 'EXTERNAL_SUB_ADMIN', 'EXTERNAL_USER'].includes(role);
