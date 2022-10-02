import React,{useState,useEffect} from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Checkbox
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

const AddCourses = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const course = new FormData();
    course.append('course[display_name]', displayName);
    course.append('course[description]', description);
    course.append('course[image]', selectedImage);

    axios.post('api/v1/courses', course)
     .then(response => {
        toast.success("Successfully created the course.");
        setDisplayName('');
        setDescription('');
        setSelectedImage('');
        navigate("/")
     })
     .catch(error => {
        console.log(error.response.data)
        toast.error(<Errors errors={error.response.data}/>);
     });
  };

  const Errors = ({ closeToast, toastProps, errors }) => (
    <div>
      {errors.map((error) => 
        <li key={error}>{error}</li>
      )}
    </div>
  )

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Add Course
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="display_name"
            label="Display Name"
            name="display_name"
            autoFocus
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="description"
            label="Description"
            type="description"
            id="description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          {imageUrl && selectedImage && (
            <Box mt={2} textAlign="center">
              <div>Image Preview:</div>
              <img src={imageUrl} alt={selectedImage.name} height="100px" />
            </Box>
          )}
          <input 
            accept="image/*" 
            type="file" 
            id="select-image"
            style={{ display: 'none' }}
            onChange={e => setSelectedImage(e.target.files[0])}
          />
          <label htmlFor="select-image">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  ) 
}

export default AddCourses;