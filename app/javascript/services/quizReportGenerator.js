import jsPDF from "jspdf";
import "jspdf-autotable";

const quizReportGenerator = (user_quizzes) => {
  const doc = new jsPDF();

  const tableColumn = ["Id", "Name", "Status", "Marks", "Course"];

  const tableRows = [];

  user_quizzes.forEach((user_quiz, index) => {
    const userQuizData = [
      index + 1,
      user_quiz.quiz.display_name,
      user_quiz.status,
      user_quiz.marks,
      user_quiz.course.display_name,
    ];
    tableRows.push(userQuizData);
  });

  doc.autoTable(tableColumn, tableRows, {
    startY: 20,
  });

  doc.setFont("helvetica");
  doc.setFontSize(23);
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[4];
  doc.text(`Quiz Report`, 14, 15);
  doc.save(`quiz_report_${dateStr}.pdf`);
};

export default quizReportGenerator;
