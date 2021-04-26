import { By } from '@angular/platform-browser';

export class TestUtils {
  private fixture;

  constructor(fixt) {
    this.fixture = fixt;
  }

  getStyleProperties(selector: string): any {
    const compiled = this.fixture.debugElement.nativeElement;
    console.log(compiled);
    return getComputedStyle(compiled.querySelector(selector));
  }

  getAttributeValue(selector, attribute): string {
    return this.fixture.debugElement.nativeElement.
      querySelector(selector).getAttribute(attribute);
  }

  clickButton(element): void {
    this.fixture.debugElement.nativeElement.querySelector(element).click();
    this.fixture.detectChanges();
  }
  isDisabled(element): boolean {
  return this.fixture.debugElement.nativeElement.querySelector(element).disabled;
}
  setValue(element, value): void {
    const inputElement = this.fixture.debugElement.query(By.css(element)).nativeElement;
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
  }

}
