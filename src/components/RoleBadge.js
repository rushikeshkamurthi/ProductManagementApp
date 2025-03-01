import React from 'react';
import {getRoleLabel} from '../utils/roleUtils';

export default function RoleBadge({role}) {
  return (
    <span className={`badge badge-${role.toLowerCase()}`}>
      {getRoleLabel(role)}
    </span>
  );
}
