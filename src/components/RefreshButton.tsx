export default function RefreshButton() {
  return (
    <>
      <div className="hidden md:flex flex-shrink-0 items-center gap-3">
        <div className="border-2 h-10 border-gray-300 dark:border-gray-600 w-10 rounded-xl flex justify-center items-center cursor-pointer hover:border-gray-500">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6063 0.398305C14.8686 1.11871 14.1496 1.85874 13.415 2.5822C13.3793 2.62397 13.3382 2.57676 13.31 2.55333C12.4775 1.73888 11.4563 1.11731 10.3477 0.758692C9.07066 0.345695 7.68328 0.280825 6.37297 0.568836C4.04069 1.06708 1.99809 2.74451 1.05971 4.93686C1.06076 4.93733 1.06182 4.93771 1.06287 4.93818C0.984752 5.09227 0.94043 5.26647 0.94043 5.45103C0.94043 6.07851 1.4491 6.58715 2.07654 6.58715C2.61422 6.58715 3.06434 6.21348 3.18223 5.7118C3.85325 4.28605 5.18037 3.18339 6.71332 2.807C8.48622 2.3597 10.4958 2.85217 11.7875 4.16694C11.0393 4.90836 10.2798 5.63892 9.53467 6.3834C11.5562 6.37253 13.5784 6.37861 15.6002 6.38034C15.6172 4.38668 15.6049 2.39234 15.6063 0.398305Z"
              fill="#777E91"
            />
            <path
              d="M13.9638 9.40955C13.4673 9.40955 13.0454 9.72823 12.8909 10.1721C12.8906 10.172 12.8902 10.1719 12.89 10.1717C12.2409 11.6182 10.9347 12.7604 9.39715 13.1666C7.60391 13.6527 5.54399 13.1768 4.22861 11.8403C4.97309 11.1013 5.73554 10.3795 6.47663 9.63714C4.449 9.6388 2.42104 9.63812 0.393411 9.63748C0.388656 11.6277 0.38801 13.6176 0.393784 15.6079C1.13827 14.8638 1.87969 14.1166 2.62825 13.3765C3.10744 13.8448 3.639 14.262 4.22182 14.5948C6.08095 15.6806 8.41289 15.9058 10.4473 15.2024C12.3994 14.547 14.0499 13.0567 14.9037 11.1839C15.0275 11.002 15.0999 10.7823 15.0999 10.5456C15.0999 9.91822 14.5913 9.40955 13.9638 9.40955Z"
              fill="#777E91"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0">
          <div className="font-medium md:whitespace-nowrap text-left text-sm text-gray-500">
            24 seconds ago
          </div>
        </div>
      </div>
    </>
  );
}
