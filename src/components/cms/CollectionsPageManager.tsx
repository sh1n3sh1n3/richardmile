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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Stack,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Edit, Delete, Add, AddPhotoAlternate, Star } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import CMSUpload from './CMSUpload';

const StyledImage = styled('div')<{ imageUp: string; imageDown: string }>(
  ({ theme, imageUp, imageDown }) => ({
    width: 180,
    height: 226,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      opacity: 1,
      position: 'absolute',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${imageUp})`,
      transition: 'opacity 0.3s ease-in-out',
    },
    '&::after': {
      content: '""',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
      opacity: 0,
      position: 'absolute',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${imageDown})`,
      transition: 'opacity 0.3s ease-in-out',
    },
    '&:hover::before': {
      opacity: 0,
    },
    '&:hover::after': {
      opacity: 1,
    },
  })
);

interface ProductionItem {
  title: string;
  description: string;
  imageSource: string;
}

interface CollectionIntroduction {
  title: string;
  description: string;
  images1: string;
  images2: string;
  images3: string;
  background: string; // image or video URL
  backgroundIsVideo?: boolean;
}

interface FeatureGroup {
  title: string;
  data: Array<{
    title: string;
    description: string;
  }>;
}

interface CollectionItem {
  _id?: string;
  name: string;
  label: string;
  category: string;
  slug: string;
  imageUp: string;
  imageDown: string;
  background: string; // image or video URL
  backgroundIsVideo?: boolean;
  title: string;
  description: string;
  introduction: CollectionIntroduction;
  production: ProductionItem[];
  features: FeatureGroup[];
  topImage: string;
  buttomImage: string;
  leftImage: string;
  rightImage: string;
  useDefaultData?: boolean; // New field to indicate if this collection should use default introduction and production data
  isDefault?: boolean; // New field to mark this collection as the default collection
  order?: number; // Order field for sorting collections
}

function createEmptyCollection(): CollectionItem {
  return {
    name: '',
    label: '',
    category: '',
    slug: '',
    imageUp: '',
    imageDown: '',
    background: '',
    backgroundIsVideo: false,
    title: '',
    description: '',
    introduction: {
      title: '',
      description: '',
      images1: '',
      images2: '',
      images3: '',
      background: '',
      backgroundIsVideo: false,
    },
    production: [],
    features: [
      {
        title: '',
        data: [
          { title: '', description: '' },
          { title: '', description: '' },
          { title: '', description: '' },
        ],
      },
    ],
    topImage: '',
    buttomImage: '',
    leftImage: '',
    rightImage: '',
    useDefaultData: false,
    isDefault: false,
  };
}

export default function CollectionsPageManager() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editing, setEditing] = useState<CollectionItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [dialogTab, setDialogTab] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  // Get the first collection's data for default values
  const getFirstCollectionData = () => {
    if (collections.length === 0) return null;
    const firstCollection = collections.find((c) => c.order === 1) || collections[0];
    return firstCollection;
  };

  // Check if this is the first collection (should not allow useDefaultData)
  const isFirstCollection = () => {
    if (!editing) return false;
    const firstCollection = getFirstCollectionData();
    return firstCollection && editing._id === firstCollection._id;
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/cms/sections?page=collections');
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error('Failed to fetch collections:', error);
    }
  };

  const handleSave = async (item: CollectionItem) => {
    // Client-side validation
    if (!item.slug || !/^[a-z0-9-]+$/.test(item.slug)) {
      enqueueSnackbar('Please enter a valid slug (lowercase letters, numbers, and hyphens only)', {
        variant: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const method = item._id ? 'PUT' : 'POST';
      const { _id, ...withoutId } = item as any;

      // If using default data, clear introduction and production data
      let requestBody: any;
      if (item.useDefaultData) {
        const { introduction, production, ...itemWithoutDefaults } = withoutId;
        requestBody = item._id
          ? { id: _id, ...itemWithoutDefaults, page: 'collections' }
          : { ...itemWithoutDefaults, page: 'collections' };
      } else {
        requestBody = item._id
          ? { id: _id, ...withoutId, page: 'collections' }
          : { ...withoutId, page: 'collections' };
      }

      // Ensure isDefault field is included in the request
      requestBody.isDefault = item.isDefault || false;

      console.log(
        'Saving collection with isDefault:',
        item.isDefault,
        'Request body:',
        requestBody
      );

      const response = await fetch('/api/cms/sections', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Save failed');
      }

      const successMessage = item.isDefault
        ? 'Collection saved and set as default successfully'
        : 'Collection saved successfully';
      enqueueSnackbar(successMessage, { variant: 'success' });
      setEditDialog(false);
      setEditing(null);

      // If this collection was set as default, update local state to unset others
      if (item.isDefault) {
        const updatedCollections = collections.map((c) => ({
          ...c,
          isDefault: c._id === item._id ? true : false,
        }));
        setCollections(updatedCollections);
      }

      fetchCollections();
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save collection';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    const col = collections.find((c) => c._id === id);
    if (col) setDeleteConfirm({ id, name: col.name });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const response = await fetch('/api/cms/sections', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteConfirm.id }),
      });
      if (!response.ok) throw new Error('Delete failed');
      enqueueSnackbar('Collection deleted successfully', { variant: 'success' });
      fetchCollections();
    } catch (error) {
      enqueueSnackbar('Failed to delete collection', { variant: 'error' });
    } finally {
      setDeleteConfirm(null);
    }
  };

  const updateEditing = (partial: Partial<CollectionItem>) => {
    if (!editing) return;
    setEditing({ ...editing, ...partial });
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleNameChange = (name: string) => {
    if (!editing) return;

    // Auto-generate slug if it's empty or if user hasn't manually edited it
    const shouldUpdateSlug = !editing.slug || editing.slug === generateSlug(editing.name);
    const newSlug = shouldUpdateSlug ? generateSlug(name) : editing.slug;

    // Update both name and slug in a single state update to prevent input focus issues
    setEditing({ ...editing, name, slug: newSlug });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Collections</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditing(createEmptyCollection());
            setDialogTab(0);
            setEditDialog(true);
          }}
        >
          Add Collection
        </Button>
      </Box>

      <Grid container spacing={3}>
        {collections.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item._id}>
            <Card
              sx={{
                paddingTop: '10px',
                border: '1px solid white',
                transition: 'all 0.2s ease-in-out',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <StyledImage imageUp={item.imageUp} imageDown={item.imageDown} />

              <Stack sx={{ textAlign: 'center' }}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  {item.isDefault && <Star color="primary" fontSize="small" />}
                </Box>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  {item.label}
                </Typography>
              </Stack>
              <CardContent sx={{ textAlign: 'center', pt: 2 }}>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <IconButton
                    onClick={() => {
                      setEditing(item);
                      setDialogTab(0);
                      setEditDialog(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id!)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editing?._id ? 'Edit Collection' : 'Add Collection'}</DialogTitle>
        <DialogContent>
          {editing && (
            <Box sx={{ pt: 1 }}>
              <Tabs
                value={dialogTab}
                onChange={(_, v) => setDialogTab(v)}
                sx={{ mb: 2 }}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Basic" />
                <Tab label="Media" />
                <Tab label="Introduction" />
                <Tab label="Production" />
                <Tab label="Gallery" />
                <Tab label="Features" />
              </Tabs>

              {dialogTab === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={editing.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Label"
                      value={editing.label}
                      onChange={(e) => updateEditing({ label: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Category"
                      value={editing.category}
                      onChange={(e) => updateEditing({ category: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Slug"
                      value={editing.slug}
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                        updateEditing({ slug: value });
                      }}
                      required
                      error={!editing.slug || !/^[a-z0-9-]+$/.test(editing.slug)}
                      helperText={
                        !editing.slug
                          ? 'Required: Unique identifier for the collection'
                          : !/^[a-z0-9-]+$/.test(editing.slug)
                          ? 'Slug must contain only lowercase letters, numbers, and hyphens'
                          : "Unique identifier for the collection (e.g., 'rm-88-smiley')"
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Headline Title"
                      value={editing.title}
                      onChange={(e) => updateEditing({ title: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Headline Description"
                      value={editing.description}
                      onChange={(e) => updateEditing({ description: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editing.isDefault || false}
                          onChange={(e) => {
                            const newIsDefault = e.target.checked;

                            // If setting this collection as default, unset all other collections as default
                            if (newIsDefault) {
                              const updatedCollections = collections.map((c) => ({
                                ...c,
                                isDefault: false,
                              }));
                              setCollections(updatedCollections);

                              // Show confirmation message
                              enqueueSnackbar(
                                'This collection will be set as default. Remember to save to apply changes.',
                                {
                                  variant: 'info',
                                }
                              );
                            }

                            updateEditing({ isDefault: newIsDefault });
                          }}
                        />
                      }
                      label="Mark this collection as default collection"
                    />
                  </Grid>
                </Grid>
              )}

              {dialogTab === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Image Up
                    </Typography>
                    <CMSUpload
                      onUploadSuccess={(r) => setEditing({ ...editing, imageUp: r.url })}
                      accept={{ 'image/*': [] }}
                      existingMedia={
                        editing.imageUp
                          ? { src: editing.imageUp, isVideo: false, fileName: 'imageUp' }
                          : undefined
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Image Down
                    </Typography>
                    <CMSUpload
                      onUploadSuccess={(r) => setEditing({ ...editing, imageDown: r.url })}
                      accept={{ 'image/*': [] }}
                      existingMedia={
                        editing.imageDown
                          ? { src: editing.imageDown, isVideo: false, fileName: 'imageDown' }
                          : undefined
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle2">Background (image/video)</Typography>
                      <AddPhotoAlternate fontSize="small" color="disabled" />
                    </Stack>
                    <CMSUpload
                      onUploadSuccess={(r) =>
                        setEditing({
                          ...editing,
                          background: r.url,
                          backgroundIsVideo: !!r.isVideo,
                        })
                      }
                      accept={{ 'video/*': [], 'image/*': [] }}
                      existingMedia={
                        editing.background
                          ? {
                              src: editing.background,
                              isVideo: !!editing.backgroundIsVideo,
                              fileName: 'background',
                            }
                          : undefined
                      }
                    />
                  </Grid>
                </Grid>
              )}

              {dialogTab === 2 && (
                <Grid container spacing={2}>
                  {/* Use Default Data Toggle - only show for non-first collections */}
                  {!isFirstCollection() && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editing.useDefaultData || false}
                            onChange={(e) => {
                              const newUseDefaultData = e.target.checked;
                              setEditing({
                                ...editing,
                                useDefaultData: newUseDefaultData,
                                // Ensure introduction object is properly initialized
                                introduction: editing.introduction || {
                                  title: '',
                                  description: '',
                                  images1: '',
                                  images2: '',
                                  images3: '',
                                  background: '',
                                  backgroundIsVideo: false,
                                },
                                // Ensure production array is properly initialized
                                production: editing.production || [],
                              });
                            }}
                          />
                        }
                        label="Use Default Data (Introduction and Production from first collection)"
                      />
                    </Grid>
                  )}

                  {/* Introduction fields - hide if using default data */}
                  {!editing.useDefaultData && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Intro Title"
                          value={editing.introduction?.title || ''}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              introduction: {
                                ...(editing.introduction || {}),
                                title: e.target.value,
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Intro Description"
                          value={editing.introduction?.description || ''}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              introduction: {
                                ...(editing.introduction || {}),
                                description: e.target.value,
                              },
                            })
                          }
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom>
                          Intro Image 1
                        </Typography>
                        <CMSUpload
                          onUploadSuccess={(r) =>
                            setEditing({
                              ...editing,
                              introduction: { ...(editing.introduction || {}), images1: r.url },
                            })
                          }
                          accept={{ 'image/*': [] }}
                          existingMedia={
                            editing.introduction?.images1
                              ? {
                                  src: editing.introduction.images1,
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
                          onUploadSuccess={(r) =>
                            setEditing({
                              ...editing,
                              introduction: { ...(editing.introduction || {}), images2: r.url },
                            })
                          }
                          accept={{ 'image/*': [] }}
                          existingMedia={
                            editing.introduction?.images2
                              ? {
                                  src: editing.introduction.images2,
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
                          onUploadSuccess={(r) =>
                            setEditing({
                              ...editing,
                              introduction: { ...(editing.introduction || {}), images3: r.url },
                            })
                          }
                          accept={{ 'image/*': [] }}
                          existingMedia={
                            editing.introduction?.images3
                              ? {
                                  src: editing.introduction.images3,
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
                            setEditing({
                              ...editing,
                              introduction: {
                                ...(editing.introduction || {}),
                                background: r.url,
                                backgroundIsVideo: !!r.isVideo,
                              },
                            })
                          }
                          accept={{ 'video/*': [], 'image/*': [] }}
                          existingMedia={
                            editing.introduction?.background
                              ? {
                                  src: editing.introduction.background,
                                  isVideo: !!editing.introduction.backgroundIsVideo,
                                  fileName: 'introBackground',
                                }
                              : undefined
                          }
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              )}

              {dialogTab === 3 && (
                <Box>
                  {/* Use Default Data Toggle - only show for non-first collections */}
                  {!isFirstCollection() && (
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={editing.useDefaultData || false}
                              onChange={(e) => {
                                const newUseDefaultData = e.target.checked;
                                setEditing({
                                  ...editing,
                                  useDefaultData: newUseDefaultData,
                                  // Ensure introduction object is properly initialized
                                  introduction: editing.introduction || {
                                    title: '',
                                    description: '',
                                    images1: '',
                                    images2: '',
                                    images3: '',
                                    background: '',
                                    backgroundIsVideo: false,
                                  },
                                  // Ensure production array is properly initialized
                                  production: editing.production || [],
                                });
                              }}
                            />
                          }
                          label="Use Default Data (Introduction and Production from first collection)"
                        />
                      </Grid>
                    </Grid>
                  )}

                  {/* Production fields - hide if using default data */}
                  {!editing.useDefaultData && (
                    <>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="subtitle1">Production Items</Typography>
                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          onClick={() =>
                            setEditing({
                              ...editing,
                              production: [
                                ...(editing.production || []),
                                { title: '', description: '', imageSource: '' },
                              ],
                            })
                          }
                        >
                          Add Item
                        </Button>
                      </Box>
                      <Grid container spacing={2}>
                        {(editing.production || []).map((p, idx) => (
                          <Grid key={idx} item xs={12}>
                            <Card variant="outlined">
                              <CardContent>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      label="Title"
                                      value={p.title}
                                      onChange={(e) => {
                                        const next = [...(editing.production || [])];
                                        next[idx] = { ...next[idx], title: e.target.value };
                                        setEditing({ ...editing, production: next });
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      multiline
                                      rows={4}
                                      label="Description"
                                      value={p.description}
                                      onChange={(e) => {
                                        const next = [...(editing.production || [])];
                                        next[idx] = { ...next[idx], description: e.target.value };
                                        setEditing({ ...editing, production: next });
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle2" gutterBottom>
                                      Image
                                    </Typography>
                                    <CMSUpload
                                      onUploadSuccess={(r) => {
                                        const next = [...(editing.production || [])];
                                        next[idx] = { ...next[idx], imageSource: r.url };
                                        setEditing({ ...editing, production: next });
                                      }}
                                      accept={{ 'image/*': [] }}
                                      existingMedia={
                                        p.imageSource
                                          ? {
                                              src: p.imageSource,
                                              isVideo: false,
                                              fileName: `production-${idx}`,
                                            }
                                          : undefined
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-end">
                                      <Button
                                        color="error"
                                        onClick={() => {
                                          const next = (editing.production || []).filter(
                                            (_, i) => i !== idx
                                          );
                                          setEditing({ ...editing, production: next });
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Box>
              )}

              {dialogTab === 5 && (
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1">Feature Groups</Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() =>
                        setEditing({
                          ...editing,
                          features: [
                            ...(editing?.features || []),
                            {
                              title: '',
                              data: [
                                { title: '', description: '' },
                                { title: '', description: '' },
                                { title: '', description: '' },
                              ],
                            },
                          ],
                        })
                      }
                    >
                      Add Feature Group
                    </Button>
                  </Box>

                  {editing.features?.map((featureGroup, groupIndex) => (
                    <Card key={groupIndex} sx={{ mb: 3, p: 2, border: '1px solid gray' }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <TextField
                          fullWidth
                          label="Feature Group Title"
                          value={featureGroup.title}
                          onChange={(e) => {
                            const newFeatures = [...editing.features];
                            newFeatures[groupIndex].title = e.target.value;
                            setEditing({ ...editing, features: newFeatures });
                          }}
                        />
                        <IconButton
                          onClick={() => {
                            const newFeatures = editing.features.filter((_, i) => i !== groupIndex);
                            setEditing({ ...editing, features: newFeatures });
                          }}
                          color="error"
                          sx={{ ml: 2 }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>

                      <Box mb={2}>
                        <Box mb={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Feature Items (3 required)
                          </Typography>
                        </Box>

                        {featureGroup.data.map((feature, featureIndex) => (
                          <Box key={featureIndex} mb={3}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={4}>
                                <TextField
                                  fullWidth
                                  label={`Feature ${featureIndex + 1} Title`}
                                  value={feature.title}
                                  onChange={(e) => {
                                    const newFeatures = [...editing.features];
                                    newFeatures[groupIndex].data[featureIndex].title =
                                      e.target.value;
                                    setEditing({ ...editing, features: newFeatures });
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} md={8}>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={3}
                                  label={`Feature ${featureIndex + 1} Description`}
                                  value={feature.description}
                                  onChange={(e) => {
                                    const newFeatures = [...editing.features];
                                    newFeatures[groupIndex].data[featureIndex].description =
                                      e.target.value;
                                    setEditing({ ...editing, features: newFeatures });
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                      </Box>
                    </Card>
                  ))}
                </Box>
              )}

              {dialogTab === 4 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      1st View Image
                    </Typography>
                    <CMSUpload
                      onUploadSuccess={(r) => setEditing({ ...editing, topImage: r.url })}
                      accept={{ 'image/*': [] }}
                      existingMedia={
                        editing.topImage
                          ? { src: editing.topImage, isVideo: false, fileName: 'topImage' }
                          : undefined
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      2nd View Image
                    </Typography>
                    <CMSUpload
                      onUploadSuccess={(r) => setEditing({ ...editing, buttomImage: r.url })}
                      accept={{ 'image/*': [] }}
                      existingMedia={
                        editing.buttomImage
                          ? { src: editing.buttomImage, isVideo: false, fileName: 'buttomImage' }
                          : undefined
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      3rd View Image
                    </Typography>
                    <CMSUpload
                      onUploadSuccess={(r) => setEditing({ ...editing, leftImage: r.url })}
                      accept={{ 'image/*': [] }}
                      existingMedia={
                        editing.leftImage
                          ? { src: editing.leftImage, isVideo: false, fileName: 'leftImage' }
                          : undefined
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      4th View Image
                    </Typography>
                    <CMSUpload
                      onUploadSuccess={(r) => setEditing({ ...editing, rightImage: r.url })}
                      accept={{ 'image/*': [] }}
                      existingMedia={
                        editing.rightImage
                          ? { src: editing.rightImage, isVideo: false, fileName: 'rightImage' }
                          : undefined
                      }
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setEditDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => editing && handleSave(editing)}
            disabled={loading || !editing?.slug || !/^[a-z0-9-]+$/.test(editing?.slug || '')}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {deleteConfirm && (
        <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete &quot;{deleteConfirm?.name}&quot;? This action cannot
              be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setDeleteConfirm(null)}>
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
