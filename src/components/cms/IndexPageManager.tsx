
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

interface IndexSection {
  _id?: string;
  hasVideo: boolean;
  label: string;
  title: string;
  description: string;
  src: string;
}

// Media Preview Component
const MediaPreview = ({ src, isVideo, title }: { src: string; isVideo: boolean; title: string }) => {
  const [mediaError, setMediaError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!src) return null;

  // Debug logging
  console.log('MediaPreview:', { src, isVideo, title });

  if (mediaError) {
    return (
      <Box sx={{ 
        mb: 2, 
        p: 2, 
        border: '1px dashed #ccc', 
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: '#f5f5f5'
      }}>
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
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/cms/sections?page=index');
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Failed to fetch sections:', error);
    }
  };

  const handleSave = async (sectionData: IndexSection) => {
    setLoading(true);
    try {
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

      if (response.ok) {
        enqueueSnackbar('Section saved successfully', { variant: 'success' });
        fetchSections();
        setEditDialog(false);
        setEditingSection(null);
      } else {
        const errorData = await response.text();
        console.error('Save failed:', response.status, errorData);
        throw new Error('Failed to save section');
      }
    } catch (error) {
      console.error('Save error:', error);
      enqueueSnackbar('Failed to save section', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // Find the section to get its title for confirmation
    const section = sections.find(s => s._id === id);
    if (section) {
      setDeleteConfirm({ id, title: section.title });
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    
    try {
      const response = await fetch('/api/cms/sections', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteConfirm.id }),
      });

      if (response.ok) {
        enqueueSnackbar('Section deleted successfully', { variant: 'success' });
        fetchSections();
      } else {
        throw new Error('Failed to delete section');
      }
    } catch (error) {
      enqueueSnackbar('Failed to delete section', { variant: 'error' });
    } finally {
      setDeleteConfirm(null);
    }
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
            });
            setEditDialog(true);
          }}
        >
          Add Section
        </Button>
      </Box>

      <Grid container spacing={3}>
        {sections?.map((section) => (
          <Grid item xs={12} md={6} lg={4} key={section._id}>
            <Card sx={{ 
              border: '1px solid white',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
              }
            }}>
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
                
                <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                  Media Type: {section.hasVideo ? 'Video' : 'Image'}
                </Typography>
                
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <IconButton
                    onClick={() => {
                      setEditingSection(section);
                      setEditDialog(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(section._id!)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSection?._id ? 'Edit Section' : 'Add Section'}
        </DialogTitle>
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
                    existingMedia={editingSection.src ? {
                      src: editingSection.src,
                      isVideo: editingSection.hasVideo,
                      fileName: editingSection.title || 'Current Media'
                    } : undefined}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => editingSection && handleSave(editingSection)}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
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
              Are you sure you want to delete &quot;{deleteConfirm.title}&quot;? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setDeleteConfirm(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
