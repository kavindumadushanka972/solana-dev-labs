'use client';
import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

interface MenuItem {
  label: string;
  link: string;
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      label: 'Home',
      link: '/',
    },
  ];

  return (
    <Navbar
      maxWidth="full"
      className="lg:pl-12 lg:pr-12 shadow-lg"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand>SOLANA DEV</NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItems.map((item: MenuItem, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              className={`w-full ${
                pathname !== item.link
                  ? 'text-white opacity-40 text-sm'
                  : 'text-white text-sm'
              }`}
              href={item.link}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <div className="hidden md:flex">
          <WalletMultiButton />
        </div>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`w-full ${
                pathname !== item.link ? 'text-white opacity-40' : 'text-white'
              }`}
              href={item.link}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        <div>
          <WalletMultiButton />
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
