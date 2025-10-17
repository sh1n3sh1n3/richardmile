import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import CMSUpload from './CMSUpload';

interface IntroductionData {
  _id?: string;
  title: string;
  description: string;
  images1: string;
  images2: string;
  images3: string;
  background: string;
  backgroundIsVideo?: boolean;
}

function createEmptyIntroduction(): IntroductionData {
  return {
    title: '',
    description: '',
    images1: '',
    images2: '',
    images3: '',
    background: '',
    backgroundIsVideo: false,
  };
}

export default function IntroductionManager() {
  const [introduction, setIntroduction] = useState<IntroductionData>(createEmptyIntroduction());
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchIntroduction();
  }, []);

  const fetchIntroduction = async () => {
    try {
      const response = await fetch('/api/cms/introduction');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setIntroduction(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch introduction:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const method = introduction._id ? 'PUT' : 'POST';
      const response = await fetch('/api/cms/introduction', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(introduction),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Save failed');
      }

      enqueueSnackbar('Introduction saved successfully', { variant: 'success' });
      fetchIntroduction();
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save introduction';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const updateIntroduction = (partial: Partial<IntroductionData>) => {
    setIntroduction({ ...introduction, ...partial });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Default Introduction</Typography>
        <Button variant="contained" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Box>

      <Card sx={{ p: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Intro Title"
                value={introduction.title}
                onChange={(e) => updateIntroduction({ title: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Intro Description"
                value={introduction.description}
                onChange={(e) => updateIntroduction({ description: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Intro Image 1
              </Typography>
              <CMSUpload
                onUploadSuccess={(r) => updateIntroduction({ images1: r.url })}
                accept={{ 'image/*': [] }}
                existingMedia={
                  introduction.images1
                    ? {
                        src: introduction.images1,
                        isVideo: false,
                        fileName: 'intro1',
                      }
                    : undefined
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Intro Image 2
              </Typography>
              <CMSUpload
                onUploadSuccess={(r) => updateIntroduction({ images2: r.url })}
                accept={{ 'image/*': [] }}
                existingMedia={
                  introduction.images2
                    ? {
                        src: introduction.images2,
                        isVideo: false,
                        fileName: 'intro2',
                      }
                    : undefined
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Intro Image 3
              </Typography>
              <CMSUpload
                onUploadSuccess={(r) => updateIntroduction({ images3: r.url })}
                accept={{ 'image/*': [] }}
                existingMedia={
                  introduction.images3
                    ? {
                        src: introduction.images3,
                        isVideo: false,
                        fileName: 'intro3',
                      }
                    : undefined
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Intro Background (image/video)
              </Typography>
              <CMSUpload
                onUploadSuccess={(r) =>
                  updateIntroduction({
                    background: r.url,
                    backgroundIsVideo: !!r.isVideo,
                  })
                }
                accept={{ 'video/*': [], 'image/*': [] }}
                existingMedia={
                  introduction.background
                    ? {
                        src: introduction.background,
                        isVideo: !!introduction.backgroundIsVideo,
                        fileName: 'introBackground',
                      }
                    : undefined
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
