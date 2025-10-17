import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import CMSUpload from './CMSUpload';

interface ProductionData {
  _id?: string;
  title: string;
  images: string[];
}

function createEmptyProduction(): ProductionData {
  return {
    title: '',
    images: [],
  };
}

export default function ProductionItemsManager() {
  const [production, setProduction] = useState<ProductionData>(createEmptyProduction());
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchProduction();
  }, []);

  const fetchProduction = async () => {
    try {
      const response = await fetch('/api/cms/production');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setProduction(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch production:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const method = production._id ? 'PUT' : 'POST';
      const response = await fetch('/api/cms/production', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(production),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Save failed');
      }

      enqueueSnackbar('Production items saved successfully', { variant: 'success' });
      fetchProduction();
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to save production items';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const updateProduction = (partial: Partial<ProductionData>) => {
    setProduction({ ...production, ...partial });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Default Production Items</Typography>
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
                label="Production Title"
                value={production.title}
                onChange={(e) => updateProduction({ title: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Production Images
              </Typography>
              <Grid container spacing={2}>
                {/* Upload component always first */}
                <Grid item xs={12} sm={3} md={4}>
                  <CMSUpload
                    onUploadSuccess={(r) => {
                      const next = [...(production.images || []), r.url];
                      updateProduction({ images: next });
                    }}
                    accept={{ 'image/*': [] }}
                    existingMedia={undefined}
                    keepContentAfterUpload={true}
                  />
                </Grid>

                {/* Existing images */}
                {(production.images || []).map((image, idx) => (
                  <Grid key={idx} item xs={12} sm={6} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100%',
                            height: 200,
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: 1,
                            mb: 1,
                          }}
                        />
                        <Box display="flex" justifyContent="flex-end">
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => {
                              const next = (production.images || []).filter((_, i) => i !== idx);
                              updateProduction({ images: next });
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
