import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="pt-2 pb-2 md:pt-5 md:pb-5 bg-black">
      <div className="md:flex gap-3 items-center justify-center text-sm">
        Copyright © {new Date().getFullYear()} Kavindu Madushanka.
      </div>
    </div>
  );
};

export default Footer;
