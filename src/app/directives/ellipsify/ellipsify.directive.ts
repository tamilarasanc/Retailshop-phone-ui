import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
@Directive({
  selector: '[appEllipsify]'
})
export class EllipsifyDirective {
  domElement: any;
  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
    this.domElement = this.elementRef.nativeElement;
    const ellipseStyle = {
      'text-overflow': 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap',
    };
    Object.keys(ellipseStyle).forEach(element => {
      this.renderer.setStyle(
          this.domElement, `${element}`, ellipseStyle[element]
      );
    });
  }

  // Enable this block if we need a tooltip to have the full text of ellipsed text
  @HostListener('mouseenter')
  onMouseEnter(): void {
      if (this.domElement.offsetWidth < this.domElement.scrollWidth) {
        this.domElement.title = this.domElement.textContent;
      } else {
        this.domElement.removeAttribute('title');
      }
  }
}
