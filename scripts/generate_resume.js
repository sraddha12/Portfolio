const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

// Create public directory if not exists
const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new PDFDocument({
  size: "A4",
  margins: {
    top: 30,
    bottom: 30,
    left: 45,
    right: 45
  }
});

const outputPath = path.join(publicDir, "resume.pdf");
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Styling constants
const COLOR_PRIMARY = "#1e3a8a"; // Dark blue
const COLOR_TEXT = "#000000";
const COLOR_HEADING_BG = "#A9D4FF"; // Light blue matching resume header strip
const COLOR_HEADING_TEXT = "#0f2942"; // Dark text inside light blue header
const FONT_SANS = "Helvetica";
const FONT_BOLD = "Helvetica-Bold";

// 1. Header (Name & Contact details exactly matching screenshot layout)
doc.fillColor(COLOR_PRIMARY);
doc.font(FONT_BOLD).fontSize(20).text("Sraddha Kanuparthy", 45, 30);

// Contact details line (with clickable links for LinkedIn & GitHub)
doc.font(FONT_SANS).fontSize(8.5).fillColor("#334155");
doc.text("sraddhakanuparthy@gmail.com   |   +91 8179272672   |   ", 45, doc.y + 4, { continued: true });
doc.fillColor(COLOR_PRIMARY).text("LinkedIn", { link: "https://www.linkedin.com/in/sraddha-kanuparthy", continued: true });
doc.fillColor("#334155").text("   |   ", { continued: true });
doc.fillColor(COLOR_PRIMARY).text("GitHub", { link: "https://github.com/sraddha12", continued: true });
doc.fillColor("#334155").text("   |   Hyderabad");

doc.y += 4;

function drawSectionHeading(title) {
  doc.y += 6;
  // Draw full-width light blue background rect
  doc.fillColor(COLOR_HEADING_BG).rect(45, doc.y, 505, 13).fill();
  
  // Write heading text inside the rect
  doc.fillColor(COLOR_HEADING_TEXT).font(FONT_BOLD).fontSize(8).text(title, 48, doc.y + 2.5);
  doc.y += 5; // Add spacing after heading strip
}

// SUMMARY
drawSectionHeading("SUMMARY");
doc.fillColor(COLOR_TEXT).font(FONT_SANS).fontSize(8.5);
doc.text("Computer Science engineer transforming academic projects into full-stack AI applications, leveraging experience from an IBM-backed AI internship and self-built projects in cybersecurity, NLP, and career-tech to drive innovative solutions that bridge theoretical curiosity with practical discipline.", {
  align: "justify",
  lineGap: 1
});

// EDUCATION
drawSectionHeading("EDUCATION");
// Geethanjali
doc.fillColor(COLOR_TEXT).font(FONT_BOLD).fontSize(8.5).text("Geethanjali College Of Engineering And Technology | CGPA: 8.5", { lineGap: 0.5 });
doc.font(FONT_SANS).fontSize(8).text("B.Tech | Computer Science & Engineering", { lineGap: 2 });
// Resonance
doc.font(FONT_BOLD).fontSize(8.5).text("Resonance Junior College, Hyderabad | Percentage: 96.00%", { lineGap: 0.5 });
doc.font(FONT_SANS).fontSize(8).text("Senior Secondary (XII) | MPC", { lineGap: 2 });
// Foster Billabong
doc.font(FONT_BOLD).fontSize(8.5).text("Foster Billabong High International School | 96%", { lineGap: 0.5 });
doc.font(FONT_SANS).fontSize(8).text("CBSE");

// PROFESSIONAL EXPERIENCE
drawSectionHeading("PROFESSIONAL EXPERIENCE");
// YugaYatra
doc.font(FONT_BOLD).fontSize(8.5).text("Software Engineering Intern | YugaYatra Retail", { continued: true });
doc.font(FONT_SANS).fontSize(8).text("   May 2026 - July 2026", { align: "right" });
doc.font(FONT_SANS).fontSize(8).text("•  Contributed to software development as a Software Engineering Intern at YugaYatra Retail, enhancing team output.", { lineGap: 2 });
// IBM
doc.font(FONT_BOLD).fontSize(8.5).text("AI Internship | IBM", { continued: true });
doc.font(FONT_SANS).fontSize(8).text("   Jan 2025", { align: "right" });
doc.font(FONT_SANS).fontSize(8).text("•  Completed a 3-month IBM internship on 'AI & Cloud Technologies'.", { lineGap: 1 });

// TECHNICAL SKILLS
drawSectionHeading("TECHNICAL SKILLS");
doc.font(FONT_BOLD).fontSize(8.5).text("Languages: ", { continued: true });
doc.font(FONT_SANS).fontSize(8).text("Python, Java, C#, JavaScript, HTML, CSS, C", { lineGap: 1.5 });
doc.font(FONT_BOLD).fontSize(8.5).text("Developer Tools: ", { continued: true });
doc.font(FONT_SANS).fontSize(8).text("VS Code, Git, GitHub", { lineGap: 1.5 });
doc.font(FONT_BOLD).fontSize(8.5).text("Soft Skills: ", { continued: true });
doc.font(FONT_SANS).fontSize(8).text("Data Structures, Problem Solving, Communication Skills");

// KEY PROJECTS
drawSectionHeading("KEY PROJECTS");
// Cybersecurity
doc.font(FONT_BOLD).fontSize(8.5).text("Adaptive Online Machine Learning for Real-Time Cybersecurity Anomaly Detection");
doc.font(FONT_SANS).fontSize(8).text("•  Developing an AI-powered cybersecurity system to detect network anomalies and evolving cyber threats using machine learning.", { lineGap: 0.5 });
doc.text("•  Covered incremental learning architectures, drift-detection strategies, and trade-offs versus static batch-trained models for evolving threat landscapes.", { lineGap: 2 });
// Butterfly
doc.font(FONT_BOLD).fontSize(8.5).text("Butterfly Effect Simulator");
doc.font(FONT_SANS).fontSize(8).text("•  Built an interactive simulator that models how small changes in initial conditions cascade into significantly different outcomes over time, visualizing sensitive dependence on initial conditions in dynamical systems.", { lineGap: 2 });
// Flash Cards Generator
doc.font(FONT_BOLD).fontSize(8.5).text("Flash Cards Generator");
doc.font(FONT_SANS).fontSize(8).text("•  Built an AI-powered smart study companion that automatically extracts core definitions and concepts from user notes.", { lineGap: 0.5 });
doc.text("•  Implemented intelligent memory organization and spaced-repetition study methods using AI.", { lineGap: 2 });
// Community Sharing
doc.font(FONT_BOLD).fontSize(8.5).text("Community Resource Sharing");
doc.font(FONT_SANS).fontSize(8).text("•  Designed a resource-sharing platform using design thinking and user research, and built a prototype enabling users to share and access community resources.", { lineGap: 2 });
// AI Career Coach
doc.font(FONT_BOLD).fontSize(8.5).text("AI Career Coach");
doc.font(FONT_SANS).fontSize(8).text("•  Developed an interactive, AI-driven guidance platform that conducts mock interviews and analyzes resumes to suggest career roadmaps.", { lineGap: 1 });

// CERTIFICATIONS
drawSectionHeading("CERTIFICATIONS");
// Cyber Security
doc.font(FONT_BOLD).fontSize(8.5).text("Cyber Security with AI | Internshala Trainings");
doc.font(FONT_SANS).fontSize(8).text("•  Training covering core cybersecurity concepts alongside AI-driven approaches to threat detection and defense.", { lineGap: 2 });
// Web Dev
doc.font(FONT_BOLD).fontSize(8.5).text("Web Development with AI | Internshala Trainings");
doc.font(FONT_SANS).fontSize(8).text("•  Successfully completed an 8-week online certified training on Web Development with AI, covering HTML, CSS, Bootstrap, DBMS, PHP, JS, React, a final project, and AI in Web Development modules.", { lineGap: 0.5 });
doc.text("•  Scored 76% in the final assessment.", { lineGap: 2 });
// Java
doc.font(FONT_BOLD).fontSize(8.5).text("Java Programming | NPTEL Swayam");
doc.font(FONT_SANS).fontSize(8).text("•  Earned a Gold Medal (top performance tier) from NPTEL for this course.", { lineGap: 2 });
// C For Everybody
doc.font(FONT_BOLD).fontSize(8.5).text("C For Everybody | Udemy", { lineGap: 1 });

// EXTRA CURRICULAR
drawSectionHeading("EXTRA CURRICULAR");
doc.font(FONT_SANS).fontSize(8);
doc.text("* Member of technical communities.");
doc.text("* Participated in coding competitions.");
doc.text("* Attended AI and software development workshops.");

doc.end();

stream.on("finish", () => {
  console.log("PDF generation finished successfully at: " + outputPath);
});
