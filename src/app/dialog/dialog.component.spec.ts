import {DialogComponent} from './dialog.component';
import {Component, ViewChild} from "@angular/core";
import {render, screen} from "@testing-library/angular";
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';
import {userEvent} from "@testing-library/user-event";


const closeSpy = jasmine.createSpy();

@Component({
  template: `
    <div>
      <button id="openButton" (click)="openModal()">Open</button>
      <app-dialog title="Test title" (closed)="closeSpy($event)">
        <p>Hello World</p>
        <button (click)="customButtonClick()">Custom button</button>
      </app-dialog>
    </div>`,
  imports: [DialogComponent],
  standalone: true
})
class TestHostComponent {
  @ViewChild(DialogComponent) dialog?: DialogComponent<string>;

  openModal() {
    this.dialog?.openDialog();
  }

  customButtonClick() {
    this.dialog?.closeDialog('Custom result');
  }

  protected readonly closeSpy = closeSpy;
}

describe('DialogComponent', () => {
  beforeAll(() => {
    // Custom matchers used by testing-library
    jasmine.addMatchers(JasmineDOM);
  });

  afterEach(() => closeSpy.calls.reset());


  it('should have title, body, and close button', async () => {
    const user = userEvent.setup();
    await render(TestHostComponent);
    const openButton = screen.getByText('Open');
    expect(openButton).toBeVisible();
    expect(screen.getByText('Test title')).not.toBeVisible();
    await user.click(openButton);
    expect(screen.getByText('Test title')).toBeVisible();
    expect(screen.getByText('X')).toBeVisible();
    expect(screen.getByText('Hello World')).toBeVisible();
    expect(closeSpy).not.toHaveBeenCalled();
    await user.click(screen.getByText('X'));
    expect(screen.getByText('Test title')).not.toBeVisible();
    expect(closeSpy).toHaveBeenCalled();
  });
  it('emits custom payloads on close', async () => {
    const user = userEvent.setup();
    await render(TestHostComponent);
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Test title')).toBeVisible();
    expect(closeSpy).not.toHaveBeenCalled();
    await user.click(screen.getByText('Custom button'));
    expect(screen.getByText('Test title')).not.toBeVisible();
    expect(closeSpy).toHaveBeenCalledWith('Custom result');
  })
});
