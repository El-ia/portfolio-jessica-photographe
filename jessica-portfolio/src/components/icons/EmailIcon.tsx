type IconProps = {
	size?: number;
	className?: string;
  };
  
  export function EmailIcon({ size = 24, className }: IconProps) {
	return (
	  <svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	  >
		<path
		  d="M4 7.5L12 13L20 7.5"
		  fill="none"
		  stroke="currentColor"
		  strokeWidth="1.5"
		  strokeLinecap="round"
		  strokeLinejoin="round"
		/>
		<rect
		  x="4"
		  y="6"
		  width="16"
		  height="12"
		  rx="1.5"
		  fill="none"
		  stroke="currentColor"
		  strokeWidth="1.5"
		  strokeLinejoin="round"
		/>
	  </svg>
	);
  }