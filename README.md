# AssignmentFE

## Initialization

`npm install`

## Assignment 1

See files in folder `src/bandAssigment`. `bandAssigment.ts` contains the
TypeScript type definitions and the requested code. `bandAssigment.spec.ts`
has tests that verify the functions do as instructed. You can run it with `ng test`.

## Assignment 2

Run `ng serve`.

I implemented the dialog with the native HTML dialog element. It automatically
moves focus for accessibility and gives the Esc hotkey for dismissing the
dialog.

Components that want to use dialogs use the dialog component by
wrapping the dialog content with the `app-dialog` tag.
Communication between the parent and the child dialog is done by a @ViewChild.
I’m not sure how "idiomatically Angular" this is, but it works well enough
for this purpose. Another option would have been to use to a service.


Run the tests with `ng test`. I used
[Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro)
as the testing framework. I like how it tests components like a user uses them:
by asserting that elements exist and clicking on elements, and not assuming
anything about how it works internally.
