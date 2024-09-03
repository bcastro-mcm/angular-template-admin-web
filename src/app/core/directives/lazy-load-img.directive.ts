import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AppAssets } from '@utils/app-assets';

/**
 * LAZY LOAD DIRECTIVE, WHILE IMAGE IS LOAD SHOW A PLACEHOLDER, IF AN ERROR OCCURS SHOW A ERROR IMAGE
 */
@Directive({
  selector: '[lazyLoadImg]'
})
export class LazyLoadImgDirective implements OnInit {

  /** @param {string} defaultImage Path of the locale image that can be used how Placeholder while image in [src] attribute is loaded */
  @Input() defaultImage = AppAssets.default;
  /** @param {string} errorImage Path of the locale image that appear when image failed to load. */
  @Input() errorImage = AppAssets.default;

  imgElement!:HTMLImageElement;

  constructor(
    private imageRef: ElementRef,
  ) {
    this.imgElement = this.imageRef.nativeElement as HTMLImageElement;
    this.imgElement.setAttribute('loading', 'lazy');
    this.setPlaceholderImage();
  }
  ngOnInit(): void {
    if(this.errorImage == '' ) this.errorImage = AppAssets.default;
    if(this.defaultImage == '' ) this.defaultImage = AppAssets.default;
  }

  setPlaceholderImage(){
    this.imgElement.style.backgroundImage = `url(${this.defaultImage})`;
    this.imgElement.style.backgroundRepeat = 'no-repeat';
    this.imgElement.style.backgroundPosition = 'center';
    this.imgElement.style.backgroundSize = 'cover';
    this.imgElement.style.transition = 'all .4s linear';
  }

  @HostListener('load', ['$event']) onLoadImage() {
    this.imgElement.style.backgroundImage = '';
  }

  @HostListener('error', ['$event']) onErrImage() {
    this.imgElement.src = this.errorImage;
    this.imgElement.style.objectFit = 'cover';
    this.imgElement.style.transition = 'all .4s linear';
  }
}
