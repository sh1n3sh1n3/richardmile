// import { useEffect } from 'react';
// next
import Head from 'next/head';
// import { useRouter } from 'next/router';
// components
// layouts
import MainLayout from 'src/layouts/main';
// sections
import { BrandHero } from 'src/sections/brand';
import ScrollProgress from '../../components/scroll-progress';

// ----------------------------------------------------------------------

BrandPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function BrandPage() {
  return (
    <>
      <Head>
        <title>The Brand | Alpine Creations</title>
      </Head>

      <ScrollProgress />

      <BrandHero />
    </>
  );
}
