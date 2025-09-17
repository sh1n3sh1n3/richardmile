import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
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

interface FriendSection {
  _id?: string;
  name: string;
  image: string;
  description?: string;
  profession?: string;
  sport?: string;
  achievements?: string[];
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  isActive?: boolean;
  order?: number;
}

export default function FriendsPageManager() {
  const [sections, setSections] = useState<FriendSection[]>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<FriendSection | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/friends');
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
  };

  const handleSave = async (sectionData: FriendSection) => {
    setLoading(true);
    try {
      const method = sectionData._id ? 'PUT' : 'POST';
      const { _id, ...sectionDataWithoutId } = sectionData;
      const requestBody = sectionData._id
        ? { id: _id, ...sectionDataWithoutId }
        : { ...sectionDataWithoutId };

      const response = await fetch('/api/friends', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        enqueueSnackbar('Friend saved successfully', { variant: 'success' });
        fetchSections();
        setEditDialog(false);
        setEditingSection(null);
      } else {
        throw new Error('Failed to save friend');
      }
    } catch (error) {
      enqueueSnackbar('Failed to save friend', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // Find the section to get its name for confirmation
    const section = sections.find((s) => s._id === id);
    if (section) {
      setDeleteConfirm({ id, name: section.name });
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      const response = await fetch('/api/friends', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteConfirm.id }),
      });

      if (response.ok) {
        enqueueSnackbar('Friend deleted successfully', { variant: 'success' });
        fetchSections();
      } else {
        throw new Error('Failed to delete friend');
      }
    } catch (error) {
      enqueueSnackbar('Failed to delete friend', { variant: 'error' });
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleUploadSuccess = (uploadResult: any) => {
    if (editingSection && uploadResult && uploadResult.url) {
      setEditingSection({
        ...editingSection,
        image: uploadResult.url,
      });
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Friends & Partners</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingSection({
              name: '',
              image: '',
              description: '',
              profession: '',
              sport: '',
              achievements: [],
              socialMedia: {},
              isActive: true,
              order: sections.length,
            });
            setEditDialog(true);
          }}
        >
          Add Friend
        </Button>
      </Box>

      <Grid container spacing={3}>
        {sections?.map((section) => (
          <Grid item xs={12} sm={6} md={3} key={section._id}>
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
              <CardMedia
                component="img"
                height="200"
                image={section.image}
                alt={section.name}
                loading="lazy"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {section.name}
                </Typography>
                {section.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {section.description.length > 100
                      ? `${section.description.substring(0, 100)}...`
                      : section.description}
                  </Typography>
                )}
                {section.profession && (
                  <Typography variant="caption" color="primary" display="block">
                    {section.profession}
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
        <DialogTitle>{editingSection?._id ? 'Edit Friend' : 'Add Friend'}</DialogTitle>
        <DialogContent>
          {editingSection && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={editingSection.name}
                    onChange={(e) => setEditingSection({ ...editingSection, name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={editingSection.description || ''}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, description: e.target.value })
                    }
                    multiline
                    rows={3}
                    placeholder="Brief description of the friend/partner"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Profession"
                    value={editingSection.profession || ''}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, profession: e.target.value })
                    }
                    placeholder="e.g., Professional Golfer"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Sport"
                    value={editingSection.sport || ''}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, sport: e.target.value })
                    }
                    placeholder="e.g., Golf"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Upload Image:
                  </Typography>
                  <CMSUpload
                    onUploadSuccess={handleUploadSuccess}
                    accept={{ 'image/*': [] }}
                    existingMedia={
                      editingSection.image
                        ? {
                            src: editingSection.image,
                            isVideo: false,
                            fileName: editingSection.name || 'Current Image',
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
              Are you sure you want to delete &quot;{deleteConfirm?.name}&quot;? This action cannot
              be undone.
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
