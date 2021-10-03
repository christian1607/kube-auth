import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'RBAC'
  },
  {
    name: 'Permissions',
    url: '/permissions',
    icon: 'cil-shield-alt',
    children: [
      {
        name: 'Cluster Roles',
        url: '/rbac/cluster-roles',
        icon: 'icon-shield'
      },
      {
        name: 'Roles',
        url: '/rbac/roles',
        icon: 'icon-shield'
      }
    ]
  },
  {
    name: 'Assign Permissions',
    url: '/binding',
    icon: 'cil-https',
    children: [
      {
        name: 'Cluster Roles',
        url: '/rbac/binding/cluster-role',
        icon: 'icon-key'
      },
      {
        name: 'Role',
        url: '/rbac/binding/role',
        icon: 'icon-key'
      }
    ]
  },
  {
    title: true,
    name: 'Authentication'
  },
  {
    
    name: 'X.509',
    url: '/buttons',
    icon: 'icon-badge',
    children: [
      {
        name: 'Request access',
        url: '/authentication/x509/request-access',
        icon: 'icon-key'
      },
      {
        name: 'Evaluate Request',
        url: '/authentication/x509/evaluate-access',
        icon: 'icon-check'
      }
    ]
      
  }
];
