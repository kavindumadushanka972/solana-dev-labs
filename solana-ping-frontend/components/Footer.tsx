import React from 'react';

const Footer = () => {
  return (
    <div className="pt-5 pb-5 bg-black">
      <div className="text-center text-sm">
        Copyright © {new Date().getFullYear()} Kavindu Madushanka.
      </div>
    </div>
  );
};

export default Footer;
