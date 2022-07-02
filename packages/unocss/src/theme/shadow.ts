export const blur = {
  'DEFAULT': '8px',
  '0': '0',
  'sm': '4px',
  'md': '12px',
  'lg': '16px',
  'xl': '24px',
  '2xl': '40px',
  '3xl': '64px',
};

export const dropShadow = {
  'DEFAULT': ['0 1px 2px rgba(0,0,0,0.1)', '0 1px 1px rgba(0,0,0,0.06)'],
  'sm': '0 1px 1px rgba(0,0,0,0.05)',
  'md': ['0 4px 3px rgba(0,0,0,0.07)', '0 2px 2px rgba(0,0,0,0.06)'],
  'lg': ['0 10px 8px rgba(0,0,0,0.04)', '0 4px 3px rgba(0,0,0,0.1)'],
  'xl': ['0 20px 13px rgba(0,0,0,0.03)', '0 8px 5px rgba(0,0,0,0.08)'],
  '2xl': '0 25px 25px rgba(0,0,0,0.15)',
  'none': '0 0 #0000',
};

export const boxShadow = {
  'DEFAULT': ['var(--vin-shadow-inset) 0 1px 3px 0 rgba(0,0,0,0.1)', 'var(--vin-shadow-inset) 0 1px 2px -1px rgba(0,0,0,0.1)'],
  'none': '0 0 #0000',
  'sm': 'var(--vin-shadow-inset) 0 1px 2px 0 rgba(0,0,0,0.05)',
  'md': ['var(--vin-shadow-inset) 0 4px 6px -1px rgba(0,0,0,0.1)', 'var(--vin-shadow-inset) 0 2px 4px -2px rgba(0,0,0,0.1)'],
  'lg': ['var(--vin-shadow-inset) 0 10px 15px -3px rgba(0,0,0,0.1)', 'var(--vin-shadow-inset) 0 4px 6px -4px rgba(0,0,0,0.1)'],
  'xl': ['var(--vin-shadow-inset) 0 20px 25px -5px rgba(0,0,0,0.1)', 'var(--vin-shadow-inset) 0 8px 10px -6px rgba(0,0,0,0.1)'],
  '2xl': 'var(--vin-shadow-inset) 0 25px 50px -12px rgba(0,0,0,0.25)',
  'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.05)',
};
