import React from "react";

function SadEmoji() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="182"
      height="182"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path fill="none" d="M0 0H256V256H0z"></path>
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="16"
      ></circle>
      <circle cx="92" cy="108" r="12"></circle>
      <circle cx="164" cy="108" r="12"></circle>
      <circle cx="92" cy="108" r="12"></circle>
      <circle cx="164" cy="108" r="12"></circle>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M169.6 176a48.1 48.1 0 00-83.2 0"
      ></path>
    </svg>
  );
}

export default SadEmoji;