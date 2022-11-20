import jsPDF from "jspdf";
import "jspdf-autotable";

const assignmentReportGenerator = (user_assignments) => {
  const doc = new jsPDF();

  const tableColumn = ["Id", "Name", "Status", "Marks", "Course"];

  const tableRows = [];

  user_assignments.forEach((user_assignment, index) => {
    const userAssignmentData = [
      index + 1,
      user_assignment.assignment.display_name,
      user_assignment.status,
      user_assignment.marks,
      user_assignment.course.display_name,
    ];
    tableRows.push(userAssignmentData);
  });

  doc.autoTable(tableColumn, tableRows, {
    startY: 20,
    styles: { fillColor: "#1A374D" },
  });
  doc.setFont("helvetica");
  doc.setFontSize(23);
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[4];
  doc.text(`Assignment Report`, 14, 15);
  doc.save(`assignment_report_${dateStr}.pdf`);
};

export default assignmentReportGenerator;
