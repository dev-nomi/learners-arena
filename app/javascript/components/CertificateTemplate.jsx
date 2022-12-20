import React from "react";
import styles from "./CertificateTemplate.module.css";
import logo from "../assests/logo-learners-white.svg";

const CertificateTemplate = ({ name, course, date, certificateNo }) => {
  return (
    <div className={styles.App}>
      <img src={logo} className={styles.appLogo} alt="logo" />
      <p className={styles.byline}>Certificate of completion</p>

      <div className={styles.content}>
        <p>Proudly Present To</p>
        <h1>{name}</h1>
        <p>for successfully completing the course:</p>
        <h2>{course}</h2>
      </div>

      {date && (
        <p className={styles.date}>
          Issued on <span className={styles.bold}>{date}</span>
        </p>
      )}

      {certificateNo && (
        <p className={styles.certificateNo}>
          Certificate no : <span className={styles.bold}>{certificateNo}</span>
        </p>
      )}
    </div>
  );
};

CertificateTemplate.defaultProps = {
  name: "James Lee",
  course: "Creating PDFs with React & Make.cm",
  date: "March 15 2021",
  certificateNo: "12345",
};

export default CertificateTemplate;
