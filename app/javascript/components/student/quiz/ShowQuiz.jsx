import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";

const ShowQuiz = () => {
  let { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [todoQuiz, setTodoQuiz] = useState("");
  const [formValues, setFormValues] = useState([]);
  const [chipColor, setChipColor] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
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
      })
      .catch((error) => {});
  };

  const attempt = (todo_quiz_id, course_id) => {
    const todo_quiz = new FormData();
    todo_quiz.append("id", todo_quiz_id);
    todo_quiz.append("course_id", course_id);

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

  const formValue = (id) => {
    formValue = formValues.find((a) => a.q_id === id);
    return formValue.ans;
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
    formValue["ans"] = e.target?.children[0]?.textContent;
    switch (name) {
      case "option1":
        chipColor.option1 = false;
        chipColor.option2 = true;
        chipColor.option3 = true;
        chipColor.option4 = true;
        break;
      case "option2":
        chipColor.option2 = false;
        chipColor.option1 = true;
        chipColor.option3 = true;
        chipColor.option4 = true;
        break;
      case "option3":
        chipColor.option3 = false;
        chipColor.option2 = true;
        chipColor.option1 = true;
        chipColor.option4 = true;
        break;
      case "option4":
        chipColor.option4 = false;
        chipColor.option2 = true;
        chipColor.option3 = true;
        chipColor.option1 = true;
        break;
      default:
        break;
    }
    setChipColor(chipColor);
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
          <Button
            variant="contained"
            color="success"
            onClick={() => attempt(todoQuiz.id, quiz.course.id)}
          >
            Attempt
          </Button>
        </Box>
      )}
      <Box
        className={todoQuiz.attempted === false ? "blur-quiz" : ""}
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
                        variant={chipColor?.option1 ? "outlined" : "contained"}
                        disabled={chipColor?.option1}
                        color="primary"
                        onClick={(e) => handleChip("option1", question.id, e)}
                      />
                      2.
                      <Chip
                        sx={{ marginLeft: 2, marginRight: 2, width: "100%" }}
                        label={question.options.option2}
                        variant={chipColor?.option2 ? "outlined" : "contained"}
                        disabled={chipColor?.option2}
                        color="primary"
                        onClick={(e) => handleChip("option2", question.id, e)}
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
                        disabled={chipColor?.option3}
                        variant={chipColor?.option3 ? "outlined" : "contained"}
                        color="primary"
                        onClick={(e) => handleChip("option3", question.id, e)}
                      />
                      4.
                      <Chip
                        sx={{ marginLeft: 2, marginRight: 2, width: "100%" }}
                        label={question.options.option4}
                        disabled={chipColor?.option4}
                        variant={chipColor?.option4 ? "outlined" : "contained"}
                        color="primary"
                        onClick={(e) => handleChip("option4", question.id, e)}
                      />
                    </Box>
                  </>
                )}
              </Fragment>
            ))}
          </CardContent>
        </Card>
        <Button
          sx={{ marginBottom: 2 }}
          disabled={todoQuiz?.attempted === false ? true : false}
          variant="contained"
          onClick={() => submitQuiz(todoQuiz.id)}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ShowQuiz;
