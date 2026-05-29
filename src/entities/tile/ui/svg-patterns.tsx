import React from 'react';

export function WavePattern() {
  return (
    <svg
      className="w-full h-full opacity-40 absolute inset-0 pointer-events-none"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" />
      <path d="M0,70 Q25,55 50,70 T100,70 L100,100 L0,100 Z" fill="currentColor" className="opacity-60" />
    </svg>
  );
}

export function FernPattern() {
  return (
    <svg
      className="w-full h-full opacity-35 absolute inset-0 p-3 pointer-events-none"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22C12 22 20 18 20 12C20 9 17 9 15 11C13 13 12 15 12 15C12 15 11 13 9 11C7 9 4 9 4 12C4 18 12 22 12 22Z" />
      <path d="M12 2V22" />
      <path d="M12 7C14 6 17 7 18 9" />
      <path d="M12 11C10 10 7 11 6 13" />
      <path d="M12 12C14 11 17 12 18 14" />
      <path d="M12 16C10 15 7 16 6 18" />
    </svg>
  );
}

export function DotPattern() {
  return (
    <svg
      className="w-full h-full opacity-30 absolute inset-0 p-3 pointer-events-none"
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="6" />
      <circle cx="50" cy="20" r="6" />
      <circle cx="80" cy="20" r="6" />
      <circle cx="20" cy="50" r="6" />
      <circle cx="50" cy="50" r="10" />
      <circle cx="80" cy="50" r="6" />
      <circle cx="20" cy="80" r="6" />
      <circle cx="50" cy="80" r="6" />
      <circle cx="80" cy="80" r="6" />
    </svg>
  );
}

export function StarPattern() {
  return (
    <svg
      className="w-full h-full opacity-45 absolute inset-0 p-4 pointer-events-none text-star-pattern"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1.5l3.09 6.26L22 8.74l-5 4.87 1.18 6.89L12 17.25l-6.18 3.25L7 13.61 2 8.74l6.91-.98L12 1.5z" />
    </svg>
  );
}
