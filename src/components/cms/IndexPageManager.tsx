import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import CMSUpload from './CMSUpload';
import { RichardMilleSpinner, CardSkeleton } from '../loading';
import { useApiLoading } from '../../hooks/useApiLoading';

interface IndexSection {
  _id?: string;
  hasVideo: boolean;
  label: string;
  title: string;
  description: string;
  src: string;
  router?: string;
}

// Media Preview Component
const MediaPreview = ({
  src,
  isVideo,
  title,
}: {
  src: string;
  isVideo: boolean;
  title: string;
}) => {
  const [mediaError, setMediaError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!src) return null;

  // Debug logging
  console.log('MediaPreview:', { src, isVideo, title });

  if (mediaError) {
    return (
      <Box
        sx={{
          mb: 2,
          p: 2,
          border: '1px dashed #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Failed to load media
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {src}
        </Typography>
      </Box>
    );
  }

  if (isVideo) {
    return (
      <Box sx={{ position: 'relative', mb: 2 }}>
        <video
          src={src}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          controls
          onError={(e) => {
            console.error('Video error:', e);
            setMediaError(true);
            setLoading(false);
          }}
          onLoadStart={() => {
            setLoading(true);
            setMediaError(false);
          }}
          onLoadedData={() => setLoading(false)}
        >
          <track kind="captions" src="" label="No captions available" />
        </video>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderRadius: '8px',
              p: 2,
            }}
          >
            <Typography variant="body2" color="white">
              Loading...
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2, position: 'relative' }}>
      <img
        src={src}
        alt={title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
        onError={(e) => {
          console.error('Image error:', e);
          setMediaError(true);
          setLoading(false);
        }}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '8px',
            p: 2,
          }}
        >
          <Typography variant="body2" color="white">
            Loading...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default function IndexPageManager() {
  const [sections, setSections] = useState<IndexSection[]>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<IndexSection | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading: isFetching, execute: fetchSections } = useApiLoading({
    loadingMessage: 'Loading sections...',
    successMessage: 'Sections loaded successfully',
    errorMessage: 'Failed to load sections',
    showGlobalLoading: false,
  });

  const { isLoading: isSaving, execute: saveSection } = useApiLoading({
    loadingMessage: 'Saving section...',
    successMessage: 'Section saved successfully',
    errorMessage: 'Failed to save section',
  });

  const { isLoading: isDeleting, execute: deleteSection } = useApiLoading({
    loadingMessage: 'Deleting section...',
    successMessage: 'Section deleted successfully',
    errorMessage: 'Failed to delete section',
  });

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    const result = await fetchSections(async () => {
      const response = await fetch('/api/cms/sections?page=index');
      if (!response.ok) throw new Error('Failed to fetch sections');
      const data = await response.json();
      setSections(data);
      return data;
    });

    if (!result) {
      enqueueSnackbar('Failed to load sections', { variant: 'error' });
    }
  };

  const handleSave = async (sectionData: IndexSection) => {
    const result = await saveSection(async () => {
      const method = sectionData._id ? 'PUT' : 'POST';
      const { _id, ...sectionDataWithoutId } = sectionData;
      const requestBody = sectionData._id
        ? { id: _id, ...sectionDataWithoutId, page: 'index' }
        : { ...sectionDataWithoutId, page: 'index' };

      console.log('Saving section:', { method, sectionData, requestBody });

      const response = await fetch('/api/cms/sections', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Save failed:', response.status, errorData);
        throw new Error('Failed to save section');
      }

      return response.json();
    });

    if (result) {
      enqueueSnackbar('Section saved successfully', { variant: 'success' });
      loadSections();
      setEditDialog(false);
      setEditingSection(null);
    } else {
      enqueueSnackbar('Failed to save section', { variant: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    // Find the section to get its title for confirmation
    const section = sections.find((s) => s._id === id);
    if (section) {
      setDeleteConfirm({ id, title: section.title });
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    const result = await deleteSection(async () => {
      const response = await fetch('/api/cms/sections', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteConfirm.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete section');
      }

      return response.json();
    });

    if (result) {
      enqueueSnackbar('Section deleted successfully', { variant: 'success' });
      loadSections();
    } else {
      enqueueSnackbar('Failed to delete section', { variant: 'error' });
    }

    setDeleteConfirm(null);
  };

  const handleUploadSuccess = (uploadResult: any) => {
    if (editingSection && uploadResult && uploadResult.url) {
      setEditingSection({
        ...editingSection,
        src: uploadResult.url,
      });
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Index Page Sections</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingSection({
              hasVideo: false,
              label: '',
              title: '',
              description: '',
              src: '',
              router: '',
            });
            setEditDialog(true);
          }}
        >
          Add Section
        </Button>
      </Box>

      <Grid container spacing={3}>
        {isFetching
          ? // Show skeleton loading while fetching
            Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <CardSkeleton />
              </Grid>
            ))
          : sections?.map((section) => (
              <Grid item xs={12} md={6} lg={4} key={section._id}>
                <Card
                  sx={{
                    border: '1px solid white',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {section.label}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {section.description}
                    </Typography>

                    {/* Media Preview */}
                    {section.src && (
                      <MediaPreview
                        src={section.src}
                        isVideo={section.hasVideo}
                        title={section.title}
                      />
                    )}

                    <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                      Media Type: {section.hasVideo ? 'Video' : 'Image'}
                    </Typography>
                    {section.router && (
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mb: 2, color: 'primary.main' }}
                      >
                        Router: {section.router}
                      </Typography>
                    )}

                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <IconButton
                        onClick={() => {
                          setEditingSection(section);
                          setEditDialog(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(section._id!)} color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingSection?._id ? 'Edit Section' : 'Add Section'}</DialogTitle>
        <DialogContent>
          {editingSection && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Label"
                    value={editingSection.label}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, label: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={editingSection.title}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, title: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={editingSection.description}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, description: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Router URL"
                    placeholder="/something/something"
                    value={editingSection.router || ''}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, router: e.target.value })
                    }
                    helperText="Enter the URL path for navigation (e.g., /collections/watches)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editingSection.hasVideo}
                        onChange={(e) =>
                          setEditingSection({ ...editingSection, hasVideo: e.target.checked })
                        }
                      />
                    }
                    label="Has Video"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CMSUpload
                    onUploadSuccess={handleUploadSuccess}
                    accept={editingSection.hasVideo ? { 'video/*': [] } : { 'image/*': [] }}
                    existingMedia={
                      editingSection.src
                        ? {
                            src: editingSection.src,
                            isVideo: editingSection.hasVideo,
                            fileName: editingSection.title || 'Current Media',
                          }
                        : undefined
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setEditDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => editingSection && handleSave(editingSection)}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {deleteConfirm && (
        <Dialog
          open={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography id="delete-dialog-description">
              Are you sure you want to delete &quot;{deleteConfirm.title}&quot;? This action cannot
              be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setDeleteConfirm(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained" disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
