import HeaderItemRewards from '@/components/header/HeaderItemRewards/HeaderItemRewards';

interface HeaderItem {
  href?: string;
  label: string;
  labelIcon?: React.ReactNode;
  component?: React.ReactNode;
}

export const HEADER_ITEMS: HeaderItem[] = [
  { label: 'REWARDS', component: <HeaderItemRewards /> },
  { href: '/reloads', label: 'RELOADS' },
  { href: '/leaderboards', label: 'LEADERBOARDS' },
  { href: '/videos', label: 'VIDEOS' },
  { href: '/store', label: 'STORE' }
];
