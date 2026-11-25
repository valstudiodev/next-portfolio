export type NavigationItem = {
  href: string;
  labelKey: string;
  // icon?: string;
  // requiredPermission?: string;
  // children?: NavigationItem[]
}

export const navigationItems: NavigationItem[] = [
  { href: '/', labelKey: 'home' },
  { href: '/about', labelKey: 'about' },
  { href: '/projects', labelKey: 'projects' },
  { href: '/contacts', labelKey: 'contacts' }
]