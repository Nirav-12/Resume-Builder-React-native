import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";

export const generatePDF = async (resumeData) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
          }
          .header p {
            margin: 5px 0;
            color: #777;
          }
          h2 {
            border-bottom: 2px solid #444;
            padding-bottom: 5px;
            margin-top: 30px;
            color: #444;
          }
          .section {
            margin-bottom: 20px;
          }
          .item {
            margin-bottom: 10px;
          }
          .item h3 {
            margin: 5px 0;
            color: #555;
          }
          .item p {
            margin: 3px 0;
          }
          .skills ul {
            list-style-type: none;
            padding: 0;
          }
          .skills ul li {
            background: #f1f1f1;
            margin: 5px 0;
            padding: 10px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${resumeData.name}</h1>
          <p>Email: ${resumeData.email} | Phone: ${
    resumeData.phone
  } | GitHub: ${resumeData.github}</p>
        </div>
        <div class="section">
          <h2>Experience</h2>
          ${resumeData.experiences
            .map(
              (exp) => `
            <div class="item">
              <h3>${exp.company}</h3>
              <p><strong>Role:</strong> ${exp.role}</p>
              <p><strong>Duration:</strong> ${exp.duration}</p>
              <p><strong>Description:</strong> ${exp.description}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section">
          <h2>Education</h2>
          ${resumeData.educations
            .map(
              (edu) => `
            <div class="item">
              <h3>${edu.school}</h3>
              <p><strong>Degree:</strong> ${edu.degree}</p>
              <p><strong>Year:</strong> ${edu.year}</p>
              <p><strong>CGPA:</strong> ${edu.cgpa}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section skills">
          <h2>Skills</h2>
          <ul>
            ${resumeData.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </div>
      </body>
    </html>
  `;
  // return htmlContent;
  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
};
