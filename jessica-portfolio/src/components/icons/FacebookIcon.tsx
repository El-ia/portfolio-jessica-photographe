type IconProps = {
	size?: number;
	className?: string;
  };
  
  export function FacebookIcon({ size = 35, className }: IconProps) {
	return (
	  <svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		className={className}
		fill="currentColor"
	  >
		<path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1z" />
	  </svg>
	);
  }