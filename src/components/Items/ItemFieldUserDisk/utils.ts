export function countSizeFiles(array) {
  // Подсчитывает общий размер всех файлов
  const result = array.reduce((sum, item) => {
    return sum += Number(item.size);
  }, 0);
  return result;
}

export function formatBytes(bytes, decimals = 2) {
  // Переводит байты в другие единицы
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function countTypeFiles(array) {
  // Подсчитывает файлов по типам
  const result = array.reduce((sum, item) => {
    return sum += Number(item.size);
  }, 0);
  return result;
}

export function handleName(fileName) {
  // Подборка иконки файла
  const extension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
  if (extension === "") {
    return ('./file_icons/file.png');
  }
  if (types.includes(extension)) {
    return (`./file_icons/${extension}.png`);
  }
  return ('./file_icons/unknown.png');
}

const types = [
  '7zip',
  'avi',
  'css',
  'csv',
  'doc',
  'docx',
  'dwg',
  'gif',
  'html',
  'jpg',
  'js',
  'json',
  'mp3',
  'mp4',
  'odt',
  'pdf',
  'png',
  'rar',
  'svg',
  'txt',
  'wav',
  'xls',
  'xml',
  'zip',
]
