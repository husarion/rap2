import React from 'react';
import LogoSvg from '../assets/logo_static.svg';

export default () => {
  return (
    <div className="logo-cnt">
      <img src={LogoSvg} alt="Husarion" />
      <header>Husarion</header>
      <div className="slogan">Route Admin Panel v2</div>
    </div>
  );
}