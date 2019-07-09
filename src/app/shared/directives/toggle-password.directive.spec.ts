import { TogglePasswordDirective } from './toggle-password.directive';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div> <input type="password" appTogglePassword/> </div>`
})
class TestComponent {

}
describe('TogglePasswordDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let inputEl: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TogglePasswordDirective, TestComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input'));
  }));

  it('should create toggle password elements', () => {
    const parent = inputEl.nativeElement.parentNode;
    expect(parent.attributes["class"].value).toBe('input-group');

    const sibling = inputEl.nativeElement.nextSibling;
    expect(sibling.attributes["class"].value).toBe('input-group-append');

    const button = inputEl.nativeElement.nextSibling.children[0];
    expect(button.attributes["class"].value).toBe('btn btn-outline-secondary');

    const icon = inputEl.nativeElement.nextSibling.children[0].children[0];
    expect(icon.attributes["class"].value).toBe('fa icon-eye-open fa-eye');
  });

  it('should toggle password on click event', () => {
    const button = inputEl.nativeElement.nextSibling.children[0];

    button.click();
    fixture.detectChanges();
    expect(inputEl.nativeElement.attributes["type"].value).toBe('text');
    const icon = inputEl.nativeElement.nextSibling.children[0].children[0];
    expect(icon.attributes["class"].value).toBe('fa icon-eye-close fa-eye-slash');

    button.click();
    fixture.detectChanges();
    expect(inputEl.nativeElement.attributes["type"].value).toBe('password');
    expect(icon.attributes["class"].value).toBe('fa icon-eye-open fa-eye');

  });
});
