import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Box, Typography, Container, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

const ShowQuiz = () => {
  let { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [todoQuiz, setTodoQuiz] = useState("");
  const [formValues, setFormValues] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/quizzes/${id}`)
      .then(({ data }) => {
        setQuiz(data);
        setQuestions(data.questions);
        setTodoQuiz(data.todo_quiz);
        for (let i = 0; i < data.questions.length; i++) {
          if (formValues.length !== data.questions.length) {
            formValues.push({ q_id: data.questions[i].id, ans: "" });
          }
        }
        setLoading(false);
      })
      .catch((error) => {});
  };

  const attempt = (todo_quiz_id) => {
    const todo_quiz = new FormData();
    todo_quiz.append("id", todo_quiz_id);

    axios
      .post("/api/v1/user_quizzes/attempt", todo_quiz)
      .then((response) => {
        toast.success("You! successfully start a quiz.");
        initialize();
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  const handleChange = (id, e) => {
    const newFormValues = [...formValues];
    const formValue = newFormValues.find((a) => a.q_id === id);
    formValue[e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const handleChip = (name, id, e) => {
    const newFormValues = [...formValues];
    const formValue = newFormValues.find((a) => a.q_id === id);
    formValue["ans"] = e.target.textContent;
    setFormValues(newFormValues);
  };

  const submitQuiz = (todo_quiz_id) => {
    const quiz = new FormData();
    quiz.append("id", todo_quiz_id);
    quiz.append("ansKeys", JSON.stringify(formValues));

    axios
      .post(`/api/v1/user_quizzes/submit`, quiz)
      .then(({ data }) => {
        toast.success("You! successfully submit quiz.");
        setTodoQuiz((prevState) => ({
          ...prevState,
          submitted: true,
        }));
        navigate(-1);
      })
      .catch((error) => {});
  };

  return (
    <Container component="main" maxWidth="xs">
      {todoQuiz.attempted === false && (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained" color="success" onClick={() => attempt(todoQuiz.id)}>
            Attempt
          </Button>
        </Box>
      )}
      <Box
        className={todoQuiz.attempted === false ? "blur-effect" : ""}
        sx={{
          marginTop: 2,
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
            {todoQuiz.submitted === false ? (
              <>
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
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, color: theme.palette.primary.main }}
                        >
                          {question.title}
                        </Typography>
                        <TextField
                          sx={{ mt: 1 }}
                          fullWidth
                          id="ans"
                          label="Answer"
                          name="ans"
                          variant="standard"
                          onChange={(e) => handleChange(question.id, e)}
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
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, color: theme.palette.primary.main }}
                        >
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
                          <Button
                            sx={{ marginLeft: 2, marginRight: 2, width: "100%", borderRadius: 5 }}
                            size="small"
                            variant={
                              formValues.find((a) => a.ans === question.options.option1)
                                ? "outlined"
                                : "contained"
                            }
                            color="primary"
                            onClick={(e) => handleChip("option1", question.id, e)}
                          >
                            {question.options.option1}
                          </Button>
                          2.
                          <Button
                            sx={{ marginLeft: 2, marginRight: 2, width: "100%", borderRadius: 5 }}
                            size="small"
                            variant={
                              formValues.find((a) => a.ans === question.options.option2)
                                ? "outlined"
                                : "contained"
                            }
                            color="primary"
                            onClick={(e) => handleChip("option2", question.id, e)}
                          >
                            {question.options.option2}
                          </Button>
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
                          <Button
                            sx={{ marginLeft: 2, marginRight: 2, width: "100%", borderRadius: 5 }}
                            size="small"
                            variant={
                              formValues.find((a) => a.ans === question.options.option3)
                                ? "outlined"
                                : "contained"
                            }
                            color="primary"
                            onClick={(e) => handleChip("option3", question.id, e)}
                          >
                            {question.options.option3}
                          </Button>
                          4.
                          <Button
                            sx={{ marginLeft: 2, marginRight: 2, width: "100%", borderRadius: 5 }}
                            size="small"
                            variant={
                              formValues.find((a) => a.ans === question.options.option4)
                                ? "outlined"
                                : "contained"
                            }
                            color="primary"
                            onClick={(e) => handleChip("option4", question.id, e)}
                          >
                            {question.options.option4}
                          </Button>
                        </Box>
                      </>
                    )}
                  </Fragment>
                ))}
              </>
            ) : (
              <>
                <Box sx={{ textAlign: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-confetti"
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#406882"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 5h2" />
                    <path d="M5 4v2" />
                    <path d="M11.5 4l-.5 2" />
                    <path d="M18 5h2" />
                    <path d="M19 4v2" />
                    <path d="M15 9l-1 1" />
                    <path d="M18 13l2 -.5" />
                    <path d="M18 19h2" />
                    <path d="M19 18v2" />
                    <path d="M14 16.518l-6.518 -6.518l-4.39 9.58a1.003 1.003 0 0 0 1.329 1.329l9.579 -4.39z" />
                  </svg>
                  <Typography>You have submitted this quiz!</Typography>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
        {todoQuiz.submitted === false && (
          <Button
            sx={{ marginBottom: 2 }}
            disabled={todoQuiz?.attempted === false ? true : false}
            variant="contained"
            onClick={() => submitQuiz(todoQuiz.id)}
          >
            Submit
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ShowQuiz;
