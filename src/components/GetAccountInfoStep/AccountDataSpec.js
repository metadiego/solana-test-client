//TODO: replace ExampleAccount and ExampleSchema by a corresponding Account Data
//model and schema which can be used to desiralize the data in your account.
//More information here: https://learn.figment.io/tutorials/get-greetings

// The state of the target account managed by the target program.
class TargetAccount {
  counter = 0;
  constructor(fields: {counter: number} | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for the account information.
const TargetAccountSchema = new Map([
  [TargetAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);
