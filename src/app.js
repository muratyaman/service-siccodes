const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, 'public');

// serve JSON and CSV files
app.use(express.static(publicPath));

const divisions = require('./public/divisions.json');
const sections = require('./public/sections.json');
const codes = require('./public/codes.json');

app.get('/api/sic-codes/divisions', function (req, res) {
  res.json({ data: divisions });
});

app.get('/api/sic-codes/codes', function (req, res) {
  const { term } = req.query;
  if (term !== '') {
    const codesFiltered = [];
    const termUp = term.toUpperCase();
    Object.entries(codes).forEach(([key, codeObj]) => {
      if (codeObj.industry.toUpperCase().includes(termUp)) {
        codesFiltered.push({ code: key, industry: codeObj.industry })
      }
    });
    res.json({ data: codesFiltered });
  } else {
    res.json({data: codes});
  }
});

app.get('/api/sic-codes/sections', function (req, res) {
  res.json({ data: sections });
});

app.get('/api/sic-codes/sections/:letter', function (req, res) {
  const { letter } = req.params;
  const section = sections[letter];
  res.json({ data: section });
});

app.get('/api/sic-codes/sections/:letter/codes', function (req, res) {
  const { letter } = req.params;
  const codesFiltered = [];
  Object.entries(codes).forEach(([key, codeObj]) => {
    if (codeObj.section === letter) {
      codesFiltered.push({ code: key, industry: codeObj.industry })
    }
  });
  res.json({ data: codesFiltered });
});

app.get('/api/sic-codes', (req, res) => {
  res.json({ data: 'Express server for SIC Codes' });
});

module.exports = app;
