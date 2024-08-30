'use client';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const NextUiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider locale="en-GB">
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default NextUiProvider;
