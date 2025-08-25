// next
import Head from 'next/head';
// @mui
import { Container, Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// sections
import { ContactHero, ContactForm } from '../sections/contact';

// ----------------------------------------------------------------------

ContactPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Head>
        <title> Contact us | Rechard Mille</title>
      </Head>

      <ContactHero />

      <Container sx={{ py: 15, position: 'relative' }}>
        <Box
          sx={{
            overflow: 'visible',
            position: 'relative',
          }}
        >
          <ContactForm />
        </Box>
      </Container>
    </>
  );
}
