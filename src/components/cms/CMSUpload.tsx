import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, LinearProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDropZone = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `2px dashed ${theme.palette.grey[400]}`,
  '&:hover': {
    opacity: 0.72,
  },
}));

const StyledDropZoneNoPadding = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  padding: 0,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: 'transparent',
  border: `2px dashed ${theme.palette.grey[400]}`,
  '&:hover': {
    opacity: 0.72,
  },
}));

// Simple Media Preview Component
const SimpleMediaPreview = ({
  src,
  isVideo,
  fileName,
  onClick,
}: {
  src: string;
  isVideo: boolean;
  fileName: string;
  onClick: () => void;
}) => {
  if (isVideo) {
    return (
      <Box
        sx={{
          mb: 2,
          cursor: 'pointer',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        }}
        onClick={onClick}
      >
        <video
          src={src}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          controls
          onError={(e) => e.preventDefault()}
        >
          <track kind="captions" src="" label="No captions available" />
        </video>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mb: 2,
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={fileName}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
    </Box>
  );
};

interface CMSUploadProps {
  onUploadSuccess: (file: any) => void;
  accept?: { [key: string]: string[] };
  maxSize?: number;
  existingMedia?: { src: string; isVideo: boolean; fileName: string };
  keepContentAfterUpload?: boolean;
}

export default function CMSUpload({
  onUploadSuccess,
  accept = { 'video/*': [], 'image/*': [] },
  maxSize = 50 * 1024 * 1024, // 50MB
  existingMedia,
  keepContentAfterUpload = false,
}: CMSUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setUploading(true);
      setError(null);
      setProgress(0);

      try {
        // 1) Ask server for a presigned URL
        const initRes = await fetch('/api/cms/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type || 'application/octet-stream',
            size: file.size,
          }),
        });

        if (!initRes.ok) {
          throw new Error('Failed to initialize upload');
        }

        const { uploadUrl, previewUrl, publicUrl, objectKey } = await initRes.json();

        // 2) Upload directly to MinIO using the presigned URL
        const uploadReq = new XMLHttpRequest();
        await new Promise<void>((resolve, reject) => {
          uploadReq.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              setProgress((event.loaded / event.total) * 100);
            }
          };
          uploadReq.onerror = () => reject(new Error('Direct upload failed'));
          uploadReq.onload = () => {
            if (uploadReq.status >= 200 && uploadReq.status < 300) {
              resolve();
            } else {
              reject(new Error('Direct upload failed'));
            }
          };
          uploadReq.open('PUT', uploadUrl, true);
          if (file.type) {
            uploadReq.setRequestHeader('Content-Type', file.type);
          }
          uploadReq.send(file);
        });

        // 3) Finalize: save metadata in DB
        const finalizeRes = await fetch('/api/cms/upload-finalize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            objectKey,
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
            url: publicUrl, // Save public URL (no expiry) to backend
          }),
        });

        if (!finalizeRes.ok) {
          throw new Error('Failed to save metadata');
        }

        const result = await finalizeRes.json();

        // Use presigned URL for preview but public URL for saving
        const previewResult = {
          ...result,
          url: previewUrl, // Use presigned URL for preview
        };

        onUploadSuccess(result); // Pass the original result with public URL to parent
        setUploadedFile(previewResult); // Use preview URL for display
        setProgress(100);
      } catch (err) {
        setError('Upload failed. Please try again.');
        console.error('Upload error:', err);
      } finally {
        setUploading(false);
      }
    },
    [onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const DropZoneComponent = keepContentAfterUpload ? StyledDropZoneNoPadding : StyledDropZone;

  return (
    <Box>
      {/* Always show drag & drop zone, with uploaded files as previews above */}
      <DropZoneComponent
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(uploading && {
            pointerEvents: 'none',
          }),
          ...(existingMedia &&
            !uploadedFile && {
              borderColor: 'primary.main',
              borderStyle: 'dashed',
              backgroundColor: 'action.hover',
            }),
        }}
      >
        <input {...getInputProps()} />

        {/* Show uploaded file preview when adding new */}
        {uploadedFile && !uploading && !keepContentAfterUpload && (
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <SimpleMediaPreview
              src={uploadedFile.url}
              isVideo={uploadedFile.isVideo}
              fileName={uploadedFile.fileName}
              onClick={() => setUploadedFile(null)}
            />
            {/* <Typography variant="body2" color="success.main" sx={{ mt: 1, fontWeight: 'medium' }}>
              File uploaded successfully - drag & drop another file to replace
            </Typography> */}
          </Box>
        )}

        {/* Show current media preview when editing */}
        {existingMedia && !uploadedFile && (
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <SimpleMediaPreview
              src={existingMedia.src}
              isVideo={existingMedia.isVideo}
              fileName={existingMedia.fileName}
              onClick={() => {
                // Clear existing media when re-uploading
                onUploadSuccess({ url: '', isVideo: false, fileName: '' });
              }}
            />
          </Box>
        )}

        <Box textAlign="center" sx={{ p: keepContentAfterUpload ? 2 : 0 }}>
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop the file here...' : 'Upload file'}
            <Typography variant="body2" color="text.secondary">
              (max 50MB)
            </Typography>
          </Typography>

          {/* <Typography variant="body2" color="text.secondary">
            Supports videos and images (max 50MB)
          </Typography> */}

          {/* {!uploading && (
            <Button variant="contained" sx={{ mt: 2 }}>
              Select File
            </Button>
          )} */}
        </Box>
      </DropZoneComponent>

      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Uploading... {Math.round(progress)}%
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {fileRejections.length > 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {fileRejections[0].errors[0].message}
        </Alert>
      )}
    </Box>
  );
}
