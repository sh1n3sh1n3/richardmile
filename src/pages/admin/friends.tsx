import React, { useState } from 'react';
import Head from 'next/head';
// @mui
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  Stack,
  Alert,
} from '@mui/material';
// @mui/icons-material
import { Add, Edit, Delete, Image as ImageIcon } from '@mui/icons-material';
// layouts
import MainLayout from 'src/layouts/main';
// components
import { FriendsProvider, useFriendsContext } from 'src/contexts/FriendsContext';
import { CreateFriendRequest, UpdateFriendRequest } from 'src/@types/friend';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

function FriendsAdminContent() {
  const { friends, loading, error, createFriend, updateFriend, deleteFriend } = useFriendsContext();
  const [open, setOpen] = useState(false);
  const [editingFriend, setEditingFriend] = useState<any>(null);
  const [formData, setFormData] = useState<CreateFriendRequest>({
    name: '',
    image: '',
    description: '',
    profession: '',
    sport: '',
    achievements: [],
    isActive: true,
    order: 0,
  });

  const handleOpen = (friend?: any) => {
    if (friend) {
      setEditingFriend(friend);
      setFormData({
        name: friend.name || '',
        image: friend.image || '',
        description: friend.description || '',
        profession: friend.profession || '',
        sport: friend.sport || '',
        achievements: friend.achievements || [],
        isActive: friend.isActive ?? true,
        order: friend.order || 0,
      });
    } else {
      setEditingFriend(null);
      setFormData({
        name: '',
        image: '',
        description: '',
        profession: '',
        sport: '',
        achievements: [],
        isActive: true,
        order: friends.length,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingFriend(null);
    setFormData({
      name: '',
      image: '',
      description: '',
      profession: '',
      sport: '',
      achievements: [],
      isActive: true,
      order: 0,
    });
  };

  const handleSubmit = async () => {
    if (editingFriend) {
      const success = await updateFriend({
        id: editingFriend._id,
        ...formData,
      });
      if (success) {
        handleClose();
      }
    } else {
      const newFriend = await createFriend(formData);
      if (newFriend) {
        handleClose();
      }
    }
  };

  const handleDelete = async (friendId: string) => {
    if (window.confirm('Are you sure you want to delete this friend?')) {
      await deleteFriend(friendId);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Friends Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add New Friend
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {friends.map((friend) => (
            <Grid item xs={12} sm={6} md={4} key={friend._id}>
              <Card>
                <Box sx={{ position: 'relative' }}>
                  <Image
                    src={friend.image}
                    alt={friend.name}
                    sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(friend)}
                      sx={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(friend._id!)}
                      sx={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {friend.name}
                  </Typography>
                  {friend.profession && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {friend.profession}
                    </Typography>
                  )}
                  {friend.description && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {friend.description}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label={friend.isActive ? 'Active' : 'Inactive'}
                      color={friend.isActive ? 'success' : 'default'}
                      size="small"
                    />
                    <Chip label={`Order: ${friend.order}`} variant="outlined" size="small" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingFriend ? 'Edit Friend' : 'Add New Friend'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Profession"
                value={formData.profession}
                onChange={(e) => handleInputChange('profession', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Sport"
                value={formData.sport}
                onChange={(e) => handleInputChange('sport', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Order"
                type="number"
                value={formData.order}
                onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingFriend ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

// ----------------------------------------------------------------------

FriendsAdminPage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

export default function FriendsAdminPage() {
  return (
    <FriendsProvider>
      <Head>
        <title>Friends Admin | Richard Mille</title>
      </Head>
      <FriendsAdminContent />
    </FriendsProvider>
  );
}
