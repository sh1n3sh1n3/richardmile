import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Divider,
} from '@mui/material';
import { Save, Refresh } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import CMSUpload from './CMSUpload';
import { useApiLoading } from '../../hooks/useApiLoading';
import { useLogo, LogoConfig } from '../../contexts/LogoContext';

// Logo Preview Component
const LogoPreview = ({ logoConfig }: { logoConfig: LogoConfig }) => {
  return (
    <Box
      sx={{
        p: 3,
        border: '2px dashed rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      }}
    >
      <Typography variant="h6" gutterBottom color="text.secondary">
        Logo Preview
      </Typography>

      {logoConfig.imageUrl ? (
        <Box
          component="img"
          src={logoConfig.imageUrl}
          alt="Logo Preview"
          sx={{
            width: { xs: 120, md: 160 },
            height: { xs: 30, md: 40 },
            objectFit: 'contain',
            mb: 2,
            filter: 'brightness(0) invert(1)',
          }}
        />
      ) : (
        <Box
          sx={{
            width: { xs: 120, md: 160 },
            height: { xs: 30, md: 40 },
            border: '2px dashed rgba(255, 255, 255, 0.3)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            No Image
          </Typography>
        </Box>
      )}

      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {logoConfig.text}
      </Typography>
    </Box>
  );
};

export default function LogoManager() {
  const { logoConfig, updateLogoConfig } = useLogo();
  const { enqueueSnackbar } = useSnackbar();

  // Local state for form - initialize with current logoConfig
  const [localConfig, setLocalConfig] = useState<LogoConfig>(() => logoConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { isLoading: isSaving, execute: saveLogoConfig } = useApiLoading({
    loadingMessage: 'Saving logo configuration...',
    successMessage: 'Logo configuration saved successfully',
    errorMessage: 'Failed to save logo configuration',
  });

  // Initialize local state only once when logoConfig is first loaded
  useEffect(() => {
    if (!isInitialized && logoConfig.text && logoConfig.imageUrl) {
      setLocalConfig(logoConfig);
      setIsInitialized(true);
    }
  }, [logoConfig, isInitialized]);

  // Check for changes
  useEffect(() => {
    const changed =
      localConfig.text !== logoConfig.text || localConfig.imageUrl !== logoConfig.imageUrl;
    setHasChanges(changed);
  }, [localConfig, logoConfig]);

  const handleTextChange = (text: string) => {
    setLocalConfig((prev) => ({ ...prev, text }));
  };

  const handleImageUpload = (uploadResult: any) => {
    if (uploadResult && uploadResult.url) {
      setLocalConfig((prev) => ({ ...prev, imageUrl: uploadResult.url }));
    }
  };

  // Manual backend save function
  const saveToBackend = async (config: LogoConfig) => {
    try {
      const response = await fetch('/api/cms/logo-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.details || errorData.error || 'Unknown error';
        console.error('Backend save failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorMessage,
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to save logo config to backend:', error);
      return false;
    }
  };

  const handleSave = async () => {
    const result = await saveLogoConfig(async () => {
      // Update the context with new configuration (this saves to localStorage)
      updateLogoConfig(localConfig);

      // Try to save to backend/database (optional)
      const backendSuccess = await saveToBackend(localConfig);
      if (!backendSuccess) {
        console.warn('Failed to save logo configuration to backend, but local changes are saved');
      }

      return localConfig;
    });

    if (result) {
      enqueueSnackbar('Logo configuration saved successfully', { variant: 'success' });
    }
  };

  const handleReset = () => {
    setLocalConfig(logoConfig);
    setHasChanges(false);
    setIsInitialized(true); // Ensure we stay initialized after reset
    enqueueSnackbar('Changes reset', { variant: 'info' });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Logo Management</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleReset}
            disabled={!hasChanges || isSaving}
            sx={{ mr: 2 }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>

      {hasChanges && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You have unsaved changes. Don't forget to save your changes.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Logo Preview */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preview
              </Typography>
              <LogoPreview logoConfig={localConfig} />
            </CardContent>
          </Card>
        </Grid>

        {/* Logo Configuration Form */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Configuration
              </Typography>

              <Grid container spacing={3}>
                {/* Logo Text */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Logo Text"
                    value={localConfig.text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    helperText="Enter the text to display as your logo"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Logo Image Upload
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Upload a new logo image. Supported formats: PNG, JPG, SVG (max 5MB)
                  </Typography>
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                  <CMSUpload
                    onUploadSuccess={handleImageUpload}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] }}
                    maxSize={5 * 1024 * 1024} // 5MB
                    existingMedia={
                      localConfig.imageUrl
                        ? {
                            src: localConfig.imageUrl,
                            isVideo: false,
                            fileName: 'Current Logo',
                          }
                        : undefined
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Instructions */}
      <Card
        sx={{
          mt: 3,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • <strong>Logo Text:</strong> Enter the text that will be displayed as your logo across
            the site.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • <strong>Logo Image:</strong> Upload an image file for your logo. This will be used
            alongside or instead of the text logo.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • <strong>Preview:</strong> Use the preview panel to see how your logo will appear
            before saving.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
