const ocrLang = {
  Arabic: "ara",
  Bulgarian: "bul",
  "Chinese(Simplified)": "chs",
  "Chinese(Traditional)": "cht",
  Croatian: "hrv",
  Czech: "cze",
  Danish: "dan",
  Dutch: "dut",
  English: "eng",
  Finnish: "fin",
  French: "fre",
  German: "ger",
  Greek: "gre",
  Hungarian: "hun",
  Korean: "kor",
  Italian: "ita",
  Japanese: "jpn",
  Polish: "pol",
  Portuguese: "por",
  Russian: "rus",
  Slovenian: "slv",
  Spanish: "spa",
  Swedish: "swe",
  Turkish: "tur"
};
let ocrArray = Object.keys(ocrLang).reduce((array, key) => {
  let subObj = { value: ocrLang[key], text: key };
  return array.concat(subObj);
}, []);

export default ocrArray;
