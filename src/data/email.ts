/**
 * Contact address, base64 encoded and decoded at click time.
 *
 * Astro inlines short client scripts into the page, so storing the address in
 * plain text here would put it straight back into the HTML source. Encoded, it
 * never appears in readable form anywhere in the markup.
 *
 * To change it: btoa('nuovo@indirizzo')
 * To read it:   atob('YW5kcmVhLmJhZ25hcmRpQGdtYWlsLmNvbQ==')
 */
export const encodedEmail = 'YW5kcmVhLmJhZ25hcmRpQGdtYWlsLmNvbQ==';
