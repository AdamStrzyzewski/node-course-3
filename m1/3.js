// filesystem
const fs = require("fs").promises;

// fs.readdir(__dirname)
//   .then((files) => {
//     return Promise.all(
//       files.map(async (filename) => {
//         const stats = await fs.stat(filename);
//         return {
//           Name: filename,
//           Size: stats.size,
//           Date: stats.mtime,
//         };
//       })
//     );
//   })
//   .then((result) => {
//     console.table(result);
//   });

// callback hell
// setTimeout(() => {
//   setTimeout(() => {}, 2000);
// }, 1000);

// async / await - syntax sugar

const mapFileStats = (filename, fileStats) => ({
  Name: filename,
  Size: fileStats.size,
  Date: fileStats.mtime,
  isFolder: fileStats.isDirectory(),
  isFile: !fileStats.isDirectory(),
});

const getFileStat = async (filename) => {
  const stats = await fs.stat(filename);
  return mapFileStats(filename, stats);
};

const getFilesStats = async (dirname) => {
  const files = await fs.readdir(dirname);
  const filesDetails = await Promise.all(files.map(getFileStat));
  console.table(filesDetails);
};

getFilesStats(__dirname);

// fs.readdir - odczytanie zawartości folderu
// fs.readFile => Buffer - odczytanie zawartości pliku (może być tekstem, lub będzie danymi binarnymi)
// Buffer.toString()
// fs.appendFile - dodanie linijki do zawartości (głównie do pliku tekstowe)
// fs.rename - zmiana nazwy / przeniesienie pliku (mv)
// fs.unlink - usuwanie pliku

// fs.readFile("1.js").then((data) => {
//   console.log(data.toString());
// });
// // \n znak nowej linii
// fs.appendFile("test.txt", `${Math.random()}\n`);
