import * as Yup from 'yup';
import { m } from 'framer-motion';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Typography, Stack, Container, MenuItem } from '@mui/material';
// components
import { countries } from 'src/assets/data';
import Iconify from 'src/components/iconify';
import LinkButton from 'src/components/link-button';
import { MotionViewport, varFade } from '../../components/animate';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
//
import { ContectInfo } from './types';

// ----------------------------------------------------------------------

const defaultValues = {
  firstname: '',
  lastname: '',
  email: '',
  country: '',
  subject: '',
  message: '',
};

const TITLE = ['Mr', 'Mrs', 'Miss', 'Mx', "I'd rather not to say"];
const SUBJECT = ['After sales service', 'Client experience'];

export default function ContactForm() {
  const ContectSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    title: Yup.string().required('Title name is required'),
    country: Yup.string().required('Country is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const methods = useForm<ContectInfo>({
    resolver: yupResolver(ContectSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: ContectInfo) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" component={MotionViewport}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h3">CONTACT US</Typography>
        </m.div>

        <Stack spacing={3} sx={{ my: 8 }}>
          <m.div variants={varFade().inUp}>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
              <RHFTextField
                required
                name="firstname"
                variant="standard"
                fullWidth
                label="First name"
              />

              <RHFSelect name="title" variant="standard" fullWidth label="Title" select>
                {TITLE.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
              <RHFTextField
                required
                name="lastname"
                variant="standard"
                fullWidth
                label="Last name"
              />

              <RHFSelect
                select
                required
                fullWidth
                name="country"
                variant="standard"
                label="Country or Region"
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
              <RHFTextField required name="email" variant="standard" fullWidth label="Email" />

              <RHFSelect
                required
                name="subject"
                variant="standard"
                fullWidth
                label="Subject"
                select
              >
                {SUBJECT.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField
              required
              fullWidth
              multiline
              name="message"
              label="Message"
              variant="standard"
            />
          </m.div>

          <m.div variants={varFade().inUp}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 5 }}
            >
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                *REQUIRED FIELDS
              </Typography>

              <LinkButton
                type="submit"
                size="large"
                variant="outlined"
                endIcon={<Iconify icon="tabler:arrow-up-right" />}
                startIcon={<Iconify icon="tabler:arrow-up-right" />}
                sx={{ color: 'text.primary' }}
              >
                Submit now
              </LinkButton>
            </Stack>
          </m.div>
        </Stack>
      </FormProvider>
    </Container>
  );
}
