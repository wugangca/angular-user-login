import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]'
})
export class TogglePasswordDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {

    const tagName: string = element.nativeElement.tagName;
    if (tagName.toLowerCase() !== "input") {
      throw new Error('Please use this directive on an input element.');
    }

    const parent = this.element.nativeElement.parentNode;
    const inputGroup = this.renderer.createElement("div");
    this.renderer.addClass(inputGroup, "input-group");
    this.renderer.appendChild(parent, inputGroup);

    this.renderer.removeChild(parent, this.element.nativeElement);
    this.renderer.appendChild(inputGroup, this.element.nativeElement);

    const appendGroup = this.renderer.createElement("div");
    this.renderer.setAttribute(appendGroup, "class", "input-group-append");
    this.renderer.setAttribute(appendGroup, "style", "cursor: pointer;");
    this.renderer.appendChild(inputGroup, appendGroup);

    const button = this.renderer.createElement("button");
    this.renderer.setAttribute(button, "class", "btn btn-outline-secondary");
    this.renderer.setAttribute(button, "title", "Click to show/hide password");
    this.renderer.setAttribute(button, "type", "button");
    this.renderer.appendChild(appendGroup, button);

    const icon = this.renderer.createElement("i");
    const inputType: string = this.element.nativeElement.attributes["type"].value;
    if (inputType.toLowerCase() === "password") {
      this.renderer.setAttribute(icon, "class", "fa icon-eye-open fa-eye");
    } else {
      this.renderer.setAttribute(icon, "class", "fa icon-eye-close fa-eye-slash");
    }

    this.renderer.appendChild(button, icon);

    this.renderer.listen(button, "click", (event) => {
      const type: string = this.element.nativeElement.attributes["type"].value;
      if (type.toLowerCase() === "password") {
        this.renderer.setAttribute(icon, "class", "fa icon-eye-close fa-eye-slash");
        this.renderer.setAttribute(element.nativeElement, "type", "text");
      } else {
        this.renderer.setAttribute(icon, "class", "fa icon-eye-open fa-eye");
        this.renderer.setAttribute(element.nativeElement, "type", "password");
      }
    })

  }

}
