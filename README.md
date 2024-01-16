# AssignmentFE

## Initialization

`npm install`

## Assignment 1

See files in folder `src/bandAssigment`. `bandAssigment.ts` contains the
TypeScript type definitions and the requested code. `bandAssigment.spec.ts`
has tests that verify the functions do as instructed. You can run it with `ng test`.

## Assignment 2

Run `ng serve`. Code for the dialog is in `src/app/dialog`. Code for the two
use examples are in `src/app/simple-dialog` and `src/app/form-dialog`.

I implemented the dialog with the native HTML dialog element. It automatically
moves focus for accessibility and gives the Esc hotkey for dismissing the
dialog. (Esc dismissing has a bug where it doesn’t emit the close event.
Fixing that would have required some hacky things or abandoning the native
dialog altogether, which I didn’t think was necessary for this assignment.)

Components that want to use dialogs use the dialog component by
wrapping the dialog content with the `app-dialog` tag.
Communication between the parent component and the child dialog is done through
a @ViewChild.  I’m not sure how "idiomatically Angular" this is, but it works
well enough for this purpose. Another option would have been to use to a service.
The dialog component offers methods for opening and closing the dialog,
and the ability to listen for the close event, which can pass along arbitrary
payloads.

Run the tests with `ng test`. I used
[Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro)
as the testing framework. I like how it tests components like a user uses them:
by asserting that elements exist and clicking on elements, and not assuming
anything about how it works internally.
