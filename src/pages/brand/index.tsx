import { useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// components
import ScrollProgress from '../../components/scroll-progress';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { BrandHero } from 'src/sections/brand';

// ----------------------------------------------------------------------

BrandPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function BrandPage() {
  return (
    <>
      <Head>
        <title>The Brand | Richard Mille</title>
      </Head>

      <ScrollProgress />

      <BrandHero />
    </>
  );
}
