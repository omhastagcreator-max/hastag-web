const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
// Important: Increase limit because HTML string can be large
app.use(express.json({ limit: "50mb" }));

// Route to generate PDF
app.post("/api/generate-pdf", async (req, res) => {
  const { html } = req.body;

  if (!html) {
    return res.status(400).json({ error: "No HTML content provided." });
  }

  let browser;
  try {
    // Launch puppeteer
    browser = await puppeteer.launch({
      headless: true, // run in background
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    
    // Set the HTML content of the page
    await page.setContent(html, {
      waitUntil: "networkidle0", // Wait until all resources (fonts, images) are loaded
    });

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      pageRanges: '1',
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    });

    // Send the PDF back as a buffer with appropriate headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="proposal.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Failed to generate PDF." });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
