const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

// source: http://resources.companieshouse.gov.uk/sic/
const tableHtmlFile = path.join(__dirname, 'table.html');

const sectionsFile  = path.join(__dirname, 'sections.json');
const codesFile     = path.join(__dirname, 'codes.json');

fs.readFile(tableHtmlFile, function(err, data) {

  const $ = cheerio.load(data);

  let sections = {};
  let codes    = {};
  let lastSectionLetter = null;

  $('table tbody tr').each((i, el1) => {// for each row

    const secArr = $(el1).find('td strong');
    if (secArr && secArr.length) {
      const section = $(secArr[0]).text();
      const letter  = section.split(' ')[1];
      const name    = $(secArr[1]).text().trim();
      console.log('section', letter, name);
      sections[letter] = name;
      lastSectionLetter = letter;
    } else {
      const codeArr  = $(el1).find('td');
      const code     = $(codeArr[0]).text();
      const industry = $(codeArr[1]).text().trim();
      console.log('  code ', code, industry);
      codes[''+code] = { industry, section: lastSectionLetter };
    }

  });


  fs.writeFile(sectionsFile, JSON.stringify(sections), (err) => { console.log('saved sections'); });
  fs.writeFile(codesFile,    JSON.stringify(codes),    (err) => { console.log('saved codes'); });

});
