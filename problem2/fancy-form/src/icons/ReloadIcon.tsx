import { MouseEventHandler } from 'react';

interface SVGProps {
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
  color?: string;
}
const ReloadIcon = ({ className, onClick, color }: SVGProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9921 12.032C19.9841 14.069 19.2111 16.103 17.6571 17.657C14.5331 20.781 9.46705 20.781 6.34305 17.657C5.78705 17.101 5.33505 16.482 4.97705 15.826"
        stroke={color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.00391 11.87C4.03591 9.866 4.81391 7.872 6.34291 6.343C9.46691 3.219 14.5329 3.219 17.6569 6.343C18.2129 6.899 18.6649 7.518 19.0229 8.174"
        stroke={color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9531 8.17492H19.4881V4.63892"
        stroke={color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.04672 15.825H4.51172V19.361"
        stroke={color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReloadIcon;
