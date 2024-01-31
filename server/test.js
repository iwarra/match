const ResumeParser = require('./src');

const fileDir = process.cwd() + '/files/';

ResumeParser
  .parseResumeFile(fileDir + 'mervin.html', fileDir + 'compiled') //input file, output dir
  .then(file => {
    console.log("Yay! " + file);
  })
  .catch(error => {
    console.log('parseResume failed');
    console.error(error);
  });

// ResumeParser.parseResumeUrl('https://ivona.se/ivona_josipovic_cv.pdf') // url
//   .then(data => {
//     console.log('Yay! ', data);
//   })
//   .catch(error => {
//     console.log('parseResume failed');
//     console.error(error);
//   });
