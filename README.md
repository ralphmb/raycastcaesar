# Raycast Caesar ciphers
A simple implementation of the Caesar cipher, as an easy-to-use extension for Raycast.

## What is a Caesar cipher?
The Caesar cipher takes a string, splits it into letters, and moves those letters k places forward in the alphabet, wrapping around if needed.

For instance given a shift of k=2, the string "abcXYZ" is encrypted as "cdeZAB".

By default, numbers are left unchanged. An optional checkbox can be ticked which will encode numbers, by adding 5 mod 10. This means 1->6, 6->1, 7->2 and 9->4 etc.


## Why is 13 the default shift length?
A Caesar cipher with a shift of 13 is also known as ROT13. As the alphabet is 2\*13 = 26 letters long, this special case is known as an _involution_ or _reciprocal cipher_: the same process can be used to encrypt text as well as decrypt ciphertext. This means "Hello World" is encrypted as "Uryyb Jbeyq", and "Uryyb Jbeyq" is encrypted as "Hello World".
(The Enigma machine used by the Axis powers in WWII was another example of a reciprocal cipher, though that was much more complex.)

While useless for serious cryptography, ROT13 is useful for (e.g.) discussing film spoilers in a public forum, where willing participants can easily en-/decode the messages without spoiling the film for other people around.


## Details and Howto
This implementation is case-sensitive and does not transform non-Latin characters, or symbols. Numbers are optionally encoded using ROT5, n-> n+5 mod10.

To install, clone this repository or otherwise download its contents to a directory of your choosing. After that, open Raycast and hit Enter+, to access the settings. Under "Extensions", hit the "+" icon, and select "Add Script Directory". Select the directory where this extension is stored, and you should be good to go.

To use, start typing "CaesarCipher" into Raycast and hit Enter. Type or paste the text you want to encode in the topmost text area. If you want a custom shift amount, enter this in the next box down. Un-parse-able entries here will instead use the default value of 13. Hit Shift+Enter to view the ciphertext and optionally copy it to your clipboard using Enter.

## Todo
- [ ] Add a notification if parsing was unsuccessful?
- [ ] Add options regarding case-sensitivity?
