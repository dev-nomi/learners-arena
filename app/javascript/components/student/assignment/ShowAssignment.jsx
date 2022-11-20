import React, { Fragment, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Box, Typography, Container, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Editor as TextEditor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

const ShowAssignment = () => {
  let { id } = useParams();
  const [assignment, setAssignment] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [todoAssignment, setTodoAssignment] = useState("");
  const [formValues, setFormValues] = useState([]);
  const theme = useTheme();
  const monaco = useMonaco();

  useEffect(() => {
    initialize();
  }, [monaco]);

  const initialize = () => {
    axios
      .get(`/api/v1/assignments/${id}`)
      .then(({ data }) => {
        setAssignment(data);
        setQuestions(data.questions);
        setTodoAssignment(data.todo_assignment);
        for (let i = 0; i < data.questions.length; i++) {
          if (formValues.length !== data.questions.length) {
            formValues.push({ q_id: data.questions[i].id, ans: "" });
          }
        }
      })
      .catch((error) => {});
  };

  const attempt = (todo_assignment_id) => {
    const todo_assignment = new FormData();
    todo_assignment.append("id", todo_assignment_id);

    axios
      .post("/api/v1/user_assignments/attempt", todo_assignment)
      .then((response) => {
        toast.success("You! successfully start a assignment.");
        initialize();
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  const submitAssignment = (todo_assignment_id) => {
    const assignment = new FormData();
    assignment.append("id", todo_assignment_id);
    assignment.append("ansKeys", JSON.stringify(formValues));

    axios
      .post("/api/v1/user_assignments/submit", assignment)
      .then(({ data }) => {
        toast.success("You! successfully submit assignment.");
        setTodoAssignment((prevState) => ({
          ...prevState,
          submitted: true,
        }));
        navigate(-1);
      })
      .catch((error) => {});
  };

  const handleChange = (id, e, editorName) => {
    const newFormValues = [...formValues];
    const formValue = newFormValues.find((a) => a.q_id === id);
    if (editorName == "monaco") {
      formValue["ans"] = e;
    } else {
      formValue["ans"] = e.getContent();
    }
    setFormValues(newFormValues);
  };

  const editorRef = useRef(null);
  const textEditorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <Container component="main" maxWidth="xs">
      {todoAssignment.attempted === false && (
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="contained" color="success" onClick={() => attempt(todoAssignment.id)}>
            Attempt
          </Button>
        </Box>
      )}
      <Box
        className={todoAssignment.attempted === false ? "blur-effect" : ""}
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: theme.palette.primary.main }} variant="h6" component="h2">
          <strong>{assignment.display_name}</strong>
        </Typography>
        <Typography sx={{ color: theme.palette.primary.main }} variant="body2">
          {assignment.description}
        </Typography>
        <Card
          sx={{
            marginTop: 2,
            marginBottom: 4,
            width: 700,
            border: "1px solid #1A374D",
            borderRadius: 1,
          }}
        >
          <CardContent>
            {todoAssignment.submitted === false ? (
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
                        <TextEditor
                          apiKey="1ng284s517ux8frzhkttvwkv4uk1qkiu8kebp5uddx6o8wuc"
                          onEditorChange={(newValue, editor) => {
                            handleChange(question.id, editor, "tiny");
                          }}
                          onInit={(evt, editor) => (textEditorRef.current = editor)}
                          initialValue="<p>This is the initial content of the editor.</p>"
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                              "advlist",
                              "autolink",
                              "lists",
                              "link",
                              "image",
                              "charmap",
                              "preview",
                              "anchor",
                              "searchreplace",
                              "visualblocks",
                              "code",
                              "fullscreen",
                              "insertdatetime",
                              "media",
                              "table",
                              "code",
                              "help",
                              "wordcount",
                            ],
                            toolbar:
                              "undo redo | blocks | " +
                              "bold italic forecolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
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
                        <Editor
                          height="300px"
                          defaultLanguage="javascript"
                          defaultValue="// some comment"
                          onMount={handleEditorDidMount}
                          onChange={(e) => handleChange(question.id, e, "monaco")}
                          className="code-editor"
                        />
                      </>
                    )}
                  </Fragment>
                ))}
              </>
            ) : (
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
                <Typography>You have submitted this assignmnet!</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
        {todoAssignment.submitted === false && (
          <Button
            sx={{ marginBottom: 2 }}
            disabled={todoAssignment?.attempted === false ? true : false}
            variant="contained"
            onClick={() => submitAssignment(todoAssignment.id)}
          >
            Submit
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ShowAssignment;
