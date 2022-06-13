import installer from './defaults';
export * from '@vinicunca/components';
export * from '@vinicunca/constants';
export * from './make-installer';

export const install = installer.install;
export default installer;

export { default as dayjs } from 'dayjs';
