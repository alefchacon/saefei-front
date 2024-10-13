import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const FILE_URL = "http://localhost:8000/api/file/";
export default async function downloadAsZip(files, zipName = "files"){
  const zip = new JSZip();

   await Promise.all(
    files.map(async (file, index) => {
      const link = FILE_URL.concat(file.file);
      const response = await fetch(link);
      const blob = await response.blob();
      const extension = link.split(".").pop();
      zip.file(`${file.name}.${extension}`, blob);
    })
  );

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${zipName}.zip`);
  });
};