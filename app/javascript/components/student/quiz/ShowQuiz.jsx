import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Chip,
  TextField,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ShowQuiz = () => {
  let { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/quizzes/${id}`)
      .then(({ data }) => {
        setQuiz(data);
        setQuestions(data.questions);
      })
      .catch((error) => {});
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: theme.palette.primary.main }} variant="h6" component="h2">
          <strong>{quiz.display_name}</strong>
        </Typography>
        <Typography sx={{ color: theme.palette.primary.main }} variant="body2">
          {quiz.description}
        </Typography>
        <Card
          sx={{
            marginTop: 2,
            marginBottom: 4,
            width: 500,
            border: "1px solid #1A374D",
            borderRadius: 1,
          }}
        >
          <CardContent>
            {questions.map((question, index) => (
              <Fragment key={question.id}>
                {question.question_type === "short_question" ? (
                  <>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ mt: 1, color: theme.palette.primary.main }}
                    >
                      <strong>Question {index + 1} :</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, color: theme.palette.primary.main }}>
                      {question.title}
                    </Typography>
                    <TextField
                      sx={{ mt: 1 }}
                      fullWidth
                      id="answer"
                      label="Answer"
                      name="answer"
                      variant="standard"
                    />
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ mt: 1, color: theme.palette.primary.main }}
                    >
                      <strong>Question {index + 1} :</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, color: theme.palette.primary.main }}>
                      {question.title}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      1.
                      <Chip
                        sx={{ marginLeft: 2, marginRight: 2, width: "100%" }}
                        label={question.options.option1}
                        variant="outlined"
                        color="primary"
                      />
                      2.
                      <Chip
                        sx={{ marginLeft: 2, marginRight: 2, width: "100%" }}
                        label={question.options.option2}
                        variant="outlined"
                        color="primary"
                      />
                    </Box>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      3.
                      <Chip
                        sx={{ marginLeft: 2, marginRight: 2, width: "100%" }}
                        label={question.options.option3}
                        variant="outlined"
                        color="primary"
                      />
                      4.
                      <Chip
                        sx={{ marginLeft: 2, marginRight: 2, width: "100%" }}
                        label={question.options.option4}
                        variant="outlined"
                        color="primary"
                      />
                    </Box>
                  </>
                )}
              </Fragment>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ShowQuiz;
