import { Photo } from "@models/public.model";
import { environment } from "src/environments/environment.development";

/**
 * Converts a data URI to a Blob object.
 *
 * @param {string} dataURI - The data URI to convert.
 * @return {Blob} The converted Blob object.
 */
export function dataURIToBlob(dataURI: string): Blob {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
}

/**
 * Process an image file and returns a Promise that resolves to a Photo object.
 *
 * @param {File} imgFile - The image file to be processed.
 * @return {Promise<Photo>} A Promise that resolves to a Photo object containing the format, webPath, and base64 representation of the image.
 */
export function processImage(imgFile:File): Promise<Photo>{
    return new Promise((resolve, reject) => {
      const imgUrl = URL.createObjectURL(imgFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgBase64 = reader.result as string;
        const formatArr = imgFile.type.split('/');
        const img:Photo = {
          format: formatArr[1],
          webPath: imgUrl,
          base64: imgBase64
        };
        resolve(img)
      };
      reader.readAsDataURL(imgFile);

      reader.onerror = e => {
        reject(e);
      }
    });
}

/**
 * Retrieves a base64 encoded image from the specified URL.
 *
 * @param {string} url - The URL of the image.
 * @return {Promise<string>} A promise that resolves with the base64 encoded image data.
 */
export function getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
}


/**
 * Clones the given object using deep copy.
 *
 * @param {any} object - the object to be cloned
 * @return {any} the cloned object
 */
export function clone( object:any ): any {
    if (!object) return object;
    return JSON.parse( JSON.stringify( object ) );
}


/**
 * Converts an array of strings to a comma-separated string.
 *
 * @param {string[]} strArray - The array of strings to be converted.
 * @return {string} The comma-separated string.
 */
export const arrayToString = ( strArray : string[]): string => {
    let txt = "";
    txt = strArray.toString().replace(',',' , ');
    return txt;
}

/**
 * Capitalizes the first letter of the input text.
 *
 * @param {string} text - the input text to be capitalized
 * @return {string} the capitalized text
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}



export const urlAsset = (path:string): string => {
  return `${environment.apiUrl}/${path}`;
}


export const toAwait = (ms:number = 1000) => new Promise(resolve => setTimeout(resolve, ms));


export const  toCapitalCase = (sentence:string)  => {
  return sentence
    .toLowerCase() // Convert the entire sentence to lowercase
    .split(' ') // Split the sentence into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a single string
}