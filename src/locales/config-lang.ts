// @mui
import { 
  enUS, 
  frFR, 
  zhCN, 
  arSA,
  esES,
  ruRU,
  jaJP
} from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Spanish',
    value: 'es',
    systemValue: esES,
    icon: '/assets/icons/flags/ic_flag_es.svg',
  },
  {
    label: 'Russian',
    value: 'ru',
    systemValue: ruRU,
    icon: '/assets/icons/flags/ic_flag_ru.svg',
  },
  {
    label: 'Arabic',
    value: 'ar',
    systemValue: arSA,
    icon: '/assets/icons/flags/ic_flag_ar.svg',
  },
  {
    label: 'Japanese',
    value: 'ja',
    systemValue: jaJP,
    icon: '/assets/icons/flags/ic_flag_ja.svg',
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: '/assets/icons/flags/ic_flag_cn.svg',
  },
];

export const defaultLang = allLangs[0]; // English
