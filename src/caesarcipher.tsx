import { Form, ActionPanel, Action, Clipboard, confirmAlert, Alert } from "@raycast/api";

// Function for general Caesar ciphers.
// s is the input string, to be transformed
// shift is the number of places each character should be moved around the alphabet
// number_transform decides whether to apply n->n+5 mod10 to numeric characters (true) or not (false)
function caesar(s: string, shift: number, number_transform: boolean): string {
  return s
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0);

      if (charCode >= 65 && charCode <= 90) {
        //Uppercase chars take this path
        return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        //Lowercase chars this one
        return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      } else if (charCode >= 48 && charCode <= 57 && number_transform) {
        // If the user sets the number_transform flag to true, numeric chars take this path
        return String.fromCharCode(((charCode - 48 + 5) % 10) + 48);
      } else {
        // Symbols and other chars take this path, numbers too by default
        return char;
      }
    })
    .join("");
}

type Values = {
  textarea: string;
  caesarshift: string;
  decryptmode: boolean;
  numtransform: boolean;
};

export default function Command() {
  async function handleSubmit(values: Values) {
    let ciphertext = "";
    let shift = parseInt(values.caesarshift);
    if (isNaN(shift)) {
      // Maybe a better default should be given in the case where a user's input isn't a valid int
      // Add a seperate alert maybe? a text warning when this occurs?
      shift = 13;
    }
    if (values.decryptmode) {
      shift = 26 - shift;
    }
    ciphertext = caesar(values.textarea, shift, values.numtransform);

    const options: Alert.Options = {
      title: "The Caesar cipher of your input is:",
      message: ciphertext,
      primaryAction: {
        title: "Copy to clipboard",
      },
    };
    if (await confirmAlert(options)) {
      Clipboard.copy(ciphertext);
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Enter text you want to encode/decode." />
      <Form.TextArea id="textarea" placeholder="Enter text here" />
      <Form.Separator />
      <Form.Description text="Enter the Caesar shift you want to apply:" />
      <Form.TextField
        id="caesarshift"
        placeholder="Enter the shift you'd like to apply to each character:"
        defaultValue="13"
      />
      <Form.Description text="Non-integer entries will be replaced with the value 13." />
      <Form.Separator />
      <Form.Description text="Options:" />
      <Form.Checkbox id="numtransform" label="Transform numbers too? (n -> n+5 mod 10)" />
      <Form.Checkbox id="decryptmode" label="Decryption mode? (Reverses transformation)" />
    </Form>
  );
}
