type IconProps = {
  size?: number;
  className?: string;
  title?: string;
};

export function ShareIcon({ size = 20, className, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}

      <path d="M25,22a3,3,0,0,0-2.08.84L10,16.36a1.64,1.64,0,0,0,0-.72l13-6.48A3,3,0,1,0,22,7a2.2,2.2,0,0,0,0,.36l-13,6.48a3,3,0,1,0,0,4.32l13,6.48A2.2,2.2,0,0,0,22,25a3,3,0,1,0,3-3Z" />
    </svg>
  );
}