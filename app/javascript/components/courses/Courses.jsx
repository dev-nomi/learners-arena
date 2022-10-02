import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid
} from '@mui/material';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {

    axios.get('api/v1/courses')
         .then(response => {
            console.log(response.data);
            setCourses(response.data);
         })
         .catch(error => {
            
         });
  },[]);

  return (
    <> 
    <Typography component="h1" variant="h3" mt={2}>
      All Courses
    </Typography>
    <Grid container spacing={2} mt={2} mb={4}>
        {courses.map((course) => 
          <Grid item xs={4} key={course.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000`+course.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.display_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 {course.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Enroll</Button>
              </CardActions>
            </Card>
          </Grid>
        )}
    </Grid>
   </> 
  ) 
}

export default Courses;