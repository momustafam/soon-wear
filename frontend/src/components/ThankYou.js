function ThankYou() {
  return (
    <div className="flex items-center justify-center mb-4">
      <div>
        <div className="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold">شكرًا لك !</h1>
          <p>شكرا لك على اهتمامك وطلبك من موقعنا.</p>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
