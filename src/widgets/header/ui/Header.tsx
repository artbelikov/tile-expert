import { CartButton } from '@/shared/ui/CartButton';
import { Logo } from '@/shared/ui/Logo';
import { Menu } from '@/shared/ui/Menu';
import { ProfileButton } from '@/shared/ui/ProfileButton';

export function Header() {
  return (
    <header className="bg-surface-header bordered-b px-4 gap-7 flex items-center justify-between max-w-container mx-auto w-full relative">
      <Logo />

      <Menu />

      <CartButton />
      <ProfileButton />
    </header>
  );
}
