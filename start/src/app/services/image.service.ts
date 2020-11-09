import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImageService{
  base64DefaultURL: any;
  base64TrimmedURL: any;
  generatedImage: any;

getImage(imageUrl: string): Observable<string> {
  this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
    this.base64TrimmedURL = base64Data;
    this.createBlobImageFileAndShow(imageUrl);
  });
  console.log(this.generatedImage);
  return this.generatedImage;
}

getBase64ImageFromURL(url: string): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    if (!img.complete) {
      img.onload = () => {
        observer.next(this.getBase64Image(img));
        observer.complete();
      };
      img.onerror = err => {
        observer.error(err);
      };
    } else {
      observer.next(this.getBase64Image(img));
      observer.complete();
    }
  });
}

  getBase64Image(img: HTMLImageElement): string {
    var canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let dataURL: string = canvas.toDataURL('image/png');
    this.base64DefaultURL = dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  createBlobImageFileAndShow(url: string): void {
    this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
      const imageBlob: Blob = blob;
      const imageName: string = url.split('\\images\\')[1];
      const imageFile: File = new File([imageBlob], imageName, {
        type: 'image/png'
      });
      this.generatedImage = imageFile;
      return this.generatedImage;
    });
  }

  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });
      observer.next(blob);
      observer.complete();
    });
  }
}
