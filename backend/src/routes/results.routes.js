const express = require("express");
const router = express.Router();
const TestResult = require("../models/TestResult");

router.get("/patient/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    console.log("QUERYING RESULTS FOR:", patientId);

    const results = await TestResult.find({ patientId });

    console.log("RESULTS FOUND:", results);

    res.json({
      patientId,
      total: results.length,
      results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
