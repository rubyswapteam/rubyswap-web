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
      const newTheme = theme == 'light' ? 'dark' : 'light';
      localStorage.setItem('ruby-theme', newTheme);
      setTheme(newTheme);
    } else {
      const storedTheme =
        typeof window === 'undefined'
          ? 'undefined'
          : localStorage.getItem('ruby-theme') || 'light';
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
          <svg
            className="sun-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M8 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
            />
          </svg>
        </div>
        <div className="toggle-button"></div>
        <div className="moon-icon-wrapper">
          <svg
            className="moon-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142c3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"
            />
          </svg>
        </div>
      </div>
    </label>
  );
};

export default EthereumIcon;
