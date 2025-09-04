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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Edit, Delete, Add, AddPhotoAlternate } from '@mui/icons-material';
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

interface CollectionItem {
    _id?: string;
    name: string;
    label: string;
    category: string;
    imageUp: string;
    imageDown: string;
    background: string; // image or video URL
    backgroundIsVideo?: boolean;
    title: string;
    description: string;
    introduction: CollectionIntroduction;
    production: ProductionItem[];
    topImage: string;
    buttomImage: string;
    leftImage: string;
    rightImage: string;
}

function createEmptyCollection(): CollectionItem {
    return {
        name: '',
        label: '',
        category: '',
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
        topImage: '',
        buttomImage: '',
        leftImage: '',
        rightImage: '',
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
        setLoading(true);
        try {
            const method = item._id ? 'PUT' : 'POST';
            const { _id, ...withoutId } = item as any;
            const requestBody = item._id ? { id: _id, ...withoutId, page: 'collections' } : { ...withoutId, page: 'collections' };

            const response = await fetch('/api/cms/sections', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error('Save failed');

            enqueueSnackbar('Collection saved successfully', { variant: 'success' });
            setEditDialog(false);
            setEditing(null);
            fetchCollections();
        } catch (error) {
            console.error('Save error:', error);
            enqueueSnackbar('Failed to save collection', { variant: 'error' });
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
                        <Card sx={{
                            paddingTop:'10px',
                            border: '1px solid white',
                            transition: 'all 0.2s ease-in-out',
                            background: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <StyledImage imageUp={item.imageUp} imageDown={item.imageDown} />

                            <Stack sx={{ textAlign: 'center' }}>
                                <Typography variant="subtitle1">{item.name}</Typography>
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                    {item.label}
                                </Typography>
                            </Stack>
                            <CardContent sx={{ textAlign: 'center', pt: 2 }}>
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <IconButton onClick={() => { setEditing(item); setDialogTab(0); setEditDialog(true); }}>
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
                            </Tabs>

                            {dialogTab === 0 && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth label="Name" value={editing.name} onChange={(e) => updateEditing({ name: e.target.value })} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth label="Label" value={editing.label} onChange={(e) => updateEditing({ label: e.target.value })} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField fullWidth label="Category" value={editing.category} onChange={(e) => updateEditing({ category: e.target.value })} />
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
                                </Grid>
                            )}

                            {dialogTab === 1 && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>Image Up</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, imageUp: r.url })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.imageUp ? { src: editing.imageUp, isVideo: false, fileName: 'imageUp' } : undefined}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>Image Down</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, imageDown: r.url })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.imageDown ? { src: editing.imageDown, isVideo: false, fileName: 'imageDown' } : undefined}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Typography variant="subtitle2">Background (image/video)</Typography>
                                            <AddPhotoAlternate fontSize="small" color="disabled" />
                                        </Stack>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, background: r.url, backgroundIsVideo: !!r.isVideo })}
                                            accept={{ 'video/*': [], 'image/*': [] }}
                                            existingMedia={editing.background ? { src: editing.background, isVideo: !!editing.backgroundIsVideo, fileName: 'background' } : undefined}
                                        />
                                    </Grid>
                                </Grid>
                            )}

                            {dialogTab === 2 && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Intro Title"
                                            value={editing.introduction.title}
                                            onChange={(e) => setEditing({ ...editing, introduction: { ...editing.introduction, title: e.target.value } })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="Intro Description"
                                            value={editing.introduction.description}
                                            onChange={(e) => setEditing({ ...editing, introduction: { ...editing.introduction, description: e.target.value } })}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle2" gutterBottom>Intro Image 1</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, introduction: { ...editing.introduction, images1: r.url } })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.introduction.images1 ? { src: editing.introduction.images1, isVideo: false, fileName: 'intro1' } : undefined}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle2" gutterBottom>Intro Image 2</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, introduction: { ...editing.introduction, images2: r.url } })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.introduction.images2 ? { src: editing.introduction.images2, isVideo: false, fileName: 'intro2' } : undefined}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="subtitle2" gutterBottom>Intro Image 3</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, introduction: { ...editing.introduction, images3: r.url } })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.introduction.images3 ? { src: editing.introduction.images3, isVideo: false, fileName: 'intro3' } : undefined}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" gutterBottom>Intro Background (image/video)</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, introduction: { ...editing.introduction, background: r.url, backgroundIsVideo: !!r.isVideo } })}
                                            accept={{ 'video/*': [], 'image/*': [] }}
                                            existingMedia={editing.introduction.background ? { src: editing.introduction.background, isVideo: !!editing.introduction.backgroundIsVideo, fileName: 'introBackground' } : undefined}
                                        />
                                    </Grid>
                                </Grid>
                            )}

                            {dialogTab === 3 && (
                                <Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="subtitle1">Production Items</Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<Add />}
                                            onClick={() => setEditing({ ...editing, production: [...editing.production, { title: '', description: '', imageSource: '' }] })}
                                        >
                                            Add Item
                                        </Button>
                                    </Box>
                                    <Grid container spacing={2}>
                                        {editing.production.map((p, idx) => (
                                            <Grid key={idx} item xs={12}>
                                                <Card variant="outlined">
                                                    <CardContent>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={6}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Title"
                                                                    value={p.title}
                                                                    onChange={(e) => {
                                                                        const next = [...editing.production];
                                                                        next[idx] = { ...next[idx], title: e.target.value };
                                                                        setEditing({ ...editing, production: next });
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Description"
                                                                    value={p.description}
                                                                    onChange={(e) => {
                                                                        const next = [...editing.production];
                                                                        next[idx] = { ...next[idx], description: e.target.value };
                                                                        setEditing({ ...editing, production: next });
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle2" gutterBottom>Image</Typography>
                                                                <CMSUpload
                                                                    onUploadSuccess={(r) => {
                                                                        const next = [...editing.production];
                                                                        next[idx] = { ...next[idx], imageSource: r.url };
                                                                        setEditing({ ...editing, production: next });
                                                                    }}
                                                                    accept={{ 'image/*': [] }}
                                                                    existingMedia={p.imageSource ? { src: p.imageSource, isVideo: false, fileName: `production-${idx}` } : undefined}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Box display="flex" justifyContent="flex-end">
                                                                    <Button color="error" onClick={() => {
                                                                        const next = editing.production.filter((_, i) => i !== idx);
                                                                        setEditing({ ...editing, production: next });
                                                                    }}>Remove</Button>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}

                            {dialogTab === 4 && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>Top Image</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, topImage: r.url })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.topImage ? { src: editing.topImage, isVideo: false, fileName: 'topImage' } : undefined}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>Bottom Image</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, buttomImage: r.url })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.buttomImage ? { src: editing.buttomImage, isVideo: false, fileName: 'buttomImage' } : undefined}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>Left Image</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, leftImage: r.url })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.leftImage ? { src: editing.leftImage, isVideo: false, fileName: 'leftImage' } : undefined}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" gutterBottom>Right Image</Typography>
                                        <CMSUpload
                                            onUploadSuccess={(r) => setEditing({ ...editing, rightImage: r.url })}
                                            accept={{ 'image/*': [] }}
                                            existingMedia={editing.rightImage ? { src: editing.rightImage, isVideo: false, fileName: 'rightImage' } : undefined}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setEditDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => editing && handleSave(editing)} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            {deleteConfirm && (
                <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete &quot;{deleteConfirm?.name}&quot;? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                        <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
}


