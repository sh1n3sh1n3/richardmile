// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';

// ----------------------------------------------------------------------

export const PATH_PAGE = {
  contact: '/contact-us',
  collections: '/collections',
  brand: {
    root: '/brand',
    history: 'brand/history',
    concept: 'brand/concept',
  },
  friends: '/friends',
  servicing: '/servicing',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};