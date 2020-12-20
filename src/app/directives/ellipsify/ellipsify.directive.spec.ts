import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import {EllipsifyDirective} from './ellipsify.directive';

@Component({
  selector: 'app-test-container',
  template: `
    <div id="red" style="width: 30px" appEllipsify>
    Sample Text to check the ellipse text
    </div>
  `
})
class ContainerComponent { }

describe('EllipsifyDirective', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let container: ContainerComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, EllipsifyDirective],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ],
    });

    fixture = TestBed.createComponent(ContainerComponent);
    container = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should check the directive applied', () => {
    const targetElement = <HTMLSpanElement>element.querySelector('#red');
    expect(targetElement.style.cssText).toEqual('width: 30px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;');
  });
});
