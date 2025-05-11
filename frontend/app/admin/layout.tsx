import type { PropsWithChildren } from 'react';
import AuthWrapper from '../provider/admin-provider';

export default function Layout({ children }: PropsWithChildren) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
