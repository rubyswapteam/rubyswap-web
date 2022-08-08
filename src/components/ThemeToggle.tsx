import React from 'react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const EthereumIcon: React.FC = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme !== 'light');

  useEffect(() => {
    setIsChecked(theme !== 'light');
  }, [theme]);

  function handleTheme(click: boolean) {
    if (click) {
      console.log('onchange');
      const newTheme = theme == 'light' ? 'dark' : 'light';
      localStorage.setItem('ruby-theme', newTheme);
      setTheme(newTheme);
    } else {
      console.log('onchange');
      const storedTheme =
        typeof window !== 'undefined'
          ? localStorage.getItem('ruby-theme') || 'light'
          : 'undefined';
      console.log(storedTheme);
      setTheme(storedTheme);
    }
  }

  return (
    <label className="p-2">
      <input
        className="toggle-checkbox"
        type="checkbox"
        onChange={() => handleTheme(true)}
        checked={isChecked}
      ></input>
      <div className="toggle-slot">
        <div className="sun-icon-wrapper">
          <div
            className="iconify sun-icon"
            data-icon="feather-sun"
            data-inline="false"
          ></div>
        </div>
        <div className="toggle-button"></div>
        <div className="moon-icon-wrapper">
          <div
            className="iconify moon-icon"
            data-icon="feather-moon"
            data-inline="false"
          ></div>
        </div>
      </div>
    </label>
  );
};

export default EthereumIcon;
