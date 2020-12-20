import {AfterViewInit, Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'retail-ui';
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    loader.style.display = "none";
  }

  getHeight() {
    return (window.innerHeight - 100) + 'px';
  }
}
