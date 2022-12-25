import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Container, Card, CardContent, Box, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

const CheckAssignment = () => {
  let { id } = useParams();
  const [assignment, setAssignment] = useState([]);
  const [detail, setDetail] = useState("");
  const [questions, setQuestions] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/user_assignments/${id}`)
      .then(({ data }) => {
        setAssignment(data);
        setDetail(data.assignment);
        setQuestions(data.questions);
      })
      .catch((error) => {});
  };

  const answer = (question_id) => {
    return assignment["ans_keys"].filter((ans_key) => ans_key.q_id === question_id)[0].ans;
  };

  const marks = formValues?.reduce(
    (previousScore, currentScore) => previousScore + currentScore,
    0
  );

  const checkAssignment = (id) => {
    const data = new FormData();
    data.append("id", id);
    data.append("marks", marks);

    axios
      .post("/api/v1/user_assignments/check", data)
      .then(({ data }) => {
        toast.success("You! successfully check the assignment.");
        navigate(`/show_student/${assignment.user.id}`);
      })
      .catch((error) => {});
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i] = parseInt(e.target.value, 10);
    setFormValues(newFormValues);
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography component="h6" variant="h5">
            {detail.display_name}
          </Typography>
          <Typography variant="body">{detail.description}</Typography>
        </Box>
        {assignment.status === "in_progress" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ marginLeft: 2, padding: 1 }}
              variant="contained"
              onClick={() => checkAssignment(assignment.id)}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
      <Card
        sx={{
          marginTop: 2,
          marginBottom: 4,
          width: "100%",
          border: "1px solid #1A374D",
          borderRadius: 1,
        }}
      >
        <CardContent>
          {questions.map((question, index) => (
            <Fragment key={question.id}>
              {question.question_type === "short_question" ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ mt: 1, color: theme.palette.primary.main }}
                    >
                      <strong>Question {index + 1} :</strong>
                    </Typography>
                    <TextField
                      size="small"
                      name="marks"
                      label="Marks"
                      type="number"
                      id="marks"
                      placeholder={"[1-5]"}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 1);
                      }}
                      min={1}
                      InputProps={{ inputProps: { min: 1, max: 5 } }}
                      value={formValues[index] || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </Box>
                  <Typography variant="body2">{question.title}</Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ mt: 1, color: theme.palette.primary.main }}
                  >
                    <strong>Answer {index + 1} :</strong>
                  </Typography>
                  <Box variant="body2">
                    <div dangerouslySetInnerHTML={{ __html: answer(question.id) }} />
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ mt: 1, color: theme.palette.primary.main }}
                    >
                      <strong>Question {index + 1} :</strong>
                    </Typography>
                    <TextField
                      size="small"
                      name="marks"
                      label="Marks"
                      type="number"
                      id="marks"
                      placeholder={"[1-5]"}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 1);
                      }}
                      min={1}
                      InputProps={{ inputProps: { min: 1, max: 5 } }}
                      value={formValues[index] || ""}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </Box>
                  <Typography variant="body2">{question.title}</Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ mt: 1, color: theme.palette.primary.main }}
                  >
                    <strong>Answer {index + 1} :</strong>
                  </Typography>
                  <Box variant="body2">
                    <code> {answer(question.id)}</code>
                  </Box>
                </>
              )}
            </Fragment>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default CheckAssignment;
