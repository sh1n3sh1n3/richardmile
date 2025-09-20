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
import { Edit, Delete, Add, PlayArrow } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import CMSUpload from './CMSUpload';
import { RichardMilleSpinner, CardSkeleton } from '../loading';
import { useApiLoading } from '../../hooks/useApiLoading';
import { FriendsHeroContent } from '../../@types/friend';
import { useFriendsHero } from '../../hooks/useFriendsHero';

// Video Preview Component
const VideoPreview = ({ src, title }: { src: string; title: string }) => {
  const [videoError, setVideoError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!src) return null;

  if (videoError) {
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
          Failed to load video
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {src}
        </Typography>
      </Box>
    );
  }

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
          setVideoError(true);
          setLoading(false);
        }}
        onLoadStart={() => {
          setLoading(true);
          setVideoError(false);
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
};

export default function FriendsHeroManager() {
  const [heroContent, setHeroContent] = useState<FriendsHeroContent | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editingContent, setEditingContent] = useState<FriendsHeroContent | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Get refresh function from context if available (for CMS usage)
  let refreshHeroContent: (() => Promise<void>) | undefined;
  try {
    const heroContext = useFriendsHero();
    refreshHeroContent = heroContext.refreshHeroContent;
  } catch {
    // Context not available, that's fine for CMS usage
  }

  const { isLoading: isFetching, execute: fetchHeroContent } = useApiLoading({
    loadingMessage: 'Loading hero content...',
    successMessage: 'Hero content loaded successfully',
    errorMessage: 'Failed to load hero content',
    showGlobalLoading: false,
  });

  const { isLoading: isSaving, execute: saveHeroContent } = useApiLoading({
    loadingMessage: 'Saving hero content...',
    successMessage: 'Hero content saved successfully',
    errorMessage: 'Failed to save hero content',
  });

  const { isLoading: isDeleting, execute: deleteHeroContent } = useApiLoading({
    loadingMessage: 'Deleting hero content...',
    successMessage: 'Hero content deleted successfully',
    errorMessage: 'Failed to delete hero content',
  });

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async () => {
    const result = await fetchHeroContent(async () => {
      const response = await fetch('/api/cms/friends-hero');
      if (!response.ok) throw new Error('Failed to fetch hero content');
      const data = await response.json();
      setHeroContent(data);
      return data;
    });

    if (!result) {
      enqueueSnackbar('Failed to load hero content', { variant: 'error' });
    }
  };

  const handleSave = async (contentData: FriendsHeroContent) => {
    const result = await saveHeroContent(async () => {
      const method = contentData._id ? 'PUT' : 'POST';
      const { _id, ...contentDataWithoutId } = contentData;
      const requestBody = contentData._id
        ? { id: _id, ...contentDataWithoutId }
        : { ...contentDataWithoutId };

      console.log('Saving hero content:', { method, contentData, requestBody });

      const response = await fetch('/api/cms/friends-hero', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Save failed:', response.status, errorData);
        throw new Error('Failed to save hero content');
      }

      return response.json();
    });

    if (result) {
      enqueueSnackbar('Hero content saved successfully', { variant: 'success' });
      loadHeroContent();
      // Refresh the hero content in the context if available
      if (refreshHeroContent) {
        refreshHeroContent();
      }
      setEditDialog(false);
      setEditingContent(null);
    } else {
      enqueueSnackbar('Failed to save hero content', { variant: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!heroContent?._id) return;

    const result = await deleteHeroContent(async () => {
      const response = await fetch('/api/cms/friends-hero', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: heroContent._id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete hero content');
      }

      return response.json();
    });

    if (result) {
      enqueueSnackbar('Hero content deleted successfully', { variant: 'success' });
      setHeroContent(null);
      // Refresh the hero content in the context if available
      if (refreshHeroContent) {
        refreshHeroContent();
      }
    } else {
      enqueueSnackbar('Failed to delete hero content', { variant: 'error' });
    }

    setDeleteConfirm(false);
  };

  const handleUploadSuccess = (uploadResult: any) => {
    if (editingContent && uploadResult && uploadResult.url) {
      setEditingContent({
        ...editingContent,
        video: uploadResult.url,
      });
    }
  };

  const openEditDialog = () => {
    if (heroContent) {
      setEditingContent(heroContent);
    } else {
      setEditingContent({
        video: '',
        title: '',
        description: '',
        isActive: true,
      });
    }
    setEditDialog(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Friends Hero Content</Typography>
        <Box>
          {heroContent && (
            <Button
              variant="outlined"
              onClick={() => setDeleteConfirm(true)}
              color="error"
              sx={{ mr: 2 }}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={heroContent ? <Edit /> : <Add />}
            onClick={openEditDialog}
          >
            {heroContent ? 'Edit Hero Content' : 'Add Hero Content'}
          </Button>
        </Box>
      </Box>

      {isFetching ? (
        <CardSkeleton />
      ) : heroContent ? (
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
            <Box display="flex" alignItems="center" mb={2}>
              <PlayArrow sx={{ mr: 1 }} />
              <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
                {heroContent.title}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" paragraph>
              {heroContent.description}
            </Typography>

            {/* Video Preview */}
            {heroContent.video && (
              <VideoPreview src={heroContent.video} title={heroContent.title} />
            )}
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            border: '1px dashed rgba(255, 255, 255, 0.3)',
            textAlign: 'center',
            py: 4,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Hero Content Found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Create the hero content for the Friends page to get started.
            </Typography>
            <Button variant="contained" startIcon={<Add />} onClick={openEditDialog}>
              Add Hero Content
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingContent?._id ? 'Edit Hero Content' : 'Add Hero Content'}</DialogTitle>
        <DialogContent>
          {editingContent && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={editingContent.title}
                    onChange={(e) =>
                      setEditingContent({ ...editingContent, title: e.target.value })
                    }
                    required
                    placeholder="e.g., Friends & partners"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={editingContent.description}
                    onChange={(e) =>
                      setEditingContent({ ...editingContent, description: e.target.value })
                    }
                    required
                    placeholder="e.g., Discover the brand through its partners. "
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editingContent.isActive ?? true}
                        onChange={(e) =>
                          setEditingContent({ ...editingContent, isActive: e.target.checked })
                        }
                      />
                    }
                    label="Active"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Upload Video:
                  </Typography>
                  <CMSUpload
                    onUploadSuccess={handleUploadSuccess}
                    accept={{ 'video/*': [] }}
                    existingMedia={
                      editingContent.video
                        ? {
                            src: editingContent.video,
                            isVideo: true,
                            fileName: editingContent.title || 'Current Video',
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
            onClick={() => editingContent && handleSave(editingContent)}
            disabled={isSaving || !editingContent?.title || !editingContent?.description}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {deleteConfirm && (
        <Dialog
          open={deleteConfirm}
          onClose={() => setDeleteConfirm(false)}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography id="delete-dialog-description">
              Are you sure you want to delete the Friends Hero content? This action cannot be
              undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setDeleteConfirm(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained" disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
