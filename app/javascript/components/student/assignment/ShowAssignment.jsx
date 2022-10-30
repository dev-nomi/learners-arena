import React, { Fragment, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Chip, Box, Typography, Container, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Editor as TextEditor } from "@tinymce/tinymce-react";
const ShowAssignment = () => {
  let { id } = useParams();
  const [assignment, setAssignment] = useState([]);
  const [questions, setQuestions] = useState([]);
  const theme = useTheme();
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
    initialize();
  }, [monaco]);

  const initialize = () => {
    axios
      .get(`/api/v1/assignments/${id}`)
      .then(({ data }) => {
        setAssignment(data);
        setQuestions(data.questions);
      })
      .catch((error) => {});
  };

  const editorRef = useRef(null);
  const textEditorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

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
                    <TextEditor
                      apiKey="1ng284s517ux8frzhkttvwkv4uk1qkiu8kebp5uddx6o8wuc"
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
                    <Typography variant="body2" sx={{ mt: 2, color: theme.palette.primary.main }}>
                      {question.title}
                    </Typography>
                    <Editor
                      height="300px"
                      defaultLanguage="javascript"
                      defaultValue="// some comment"
                      onMount={handleEditorDidMount}
                      className="code-editor"
                    />
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

export default ShowAssignment;
