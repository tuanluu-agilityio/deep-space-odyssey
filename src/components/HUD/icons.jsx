const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const IconView = () => (<svg {...base}><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.8" /></svg>);
export const IconWarp = () => (<svg {...base}><path d="M3 12h7M3 7h4M3 17h4" /><path d="M13 5l7 7-7 7" /></svg>);
export const IconNav = () => (<svg {...base}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></svg>);
export const IconAudio = () => (<svg {...base}><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z" /><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11" /></svg>);
export const IconMuted = () => (<svg {...base}><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z" /><path d="M16 9.5l5 5M21 9.5l-5 5" /></svg>);
export const IconSettings = () => (<svg {...base}><path d="M4 7h10M18 7h2M4 12h3M11 12h9M4 17h12M20 17h0" /><circle cx="16" cy="7" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="18" cy="17" r="2" /></svg>);
export const IconReset = () => (<svg {...base}><path d="M4 12a8 8 0 108-8H7" /><path d="M10 1L7 4l3 3" /><circle cx="12" cy="12" r="1.2" /></svg>);
export const IconMap = () => (<svg {...base}><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="9.5" ry="5" /><circle cx="20" cy="9.4" r="1.2" fill="currentColor" /><circle cx="6" cy="15.8" r="1" fill="currentColor" /></svg>);
export const IconHelp = () => (<svg {...base}><circle cx="12" cy="12" r="9" /><path d="M9.6 9.3a2.5 2.5 0 114 2c-.9.6-1.6 1.1-1.6 2.2M12 16.8v.2" /></svg>);
export const IconClose = () => (<svg {...base} width={16} height={16}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconChevron = () => (<svg {...base} width={14} height={14}><path d="M9 6l6 6-6 6" /></svg>);
export const IconExternal = () => (<svg {...base} width={12} height={12}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></svg>);
