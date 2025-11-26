# Security Policy

## Supported Versions

EaseSplit is a client-side application that runs entirely in the browser. All data is stored locally and never sent to any servers. As such, security updates are primarily focused on the application code itself.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of EaseSplit seriously. If you believe you have found a security vulnerability in our application, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them by emailing our security team at <hello@easesplit.app>.

Please include the following information in your report:

- A description of the vulnerability and its impact
- Steps to reproduce the vulnerability
- Any potential mitigations you've identified
- Your contact information

## Security Considerations

Since EaseSplit is a client-side application:

1. **No Server Communication**: The application does not communicate with any servers. All data remains on the user's device.

2. **Local Storage**: Data is stored in the browser's localStorage. Users should be aware of their browser's security settings.

3. **No User Accounts**: No user accounts or passwords are required, eliminating many common attack vectors.

4. **Open Source**: The code is open source, allowing for community review and security auditing.

5. **No External Dependencies**: The application does not load external resources that could be compromised.

## Best Practices for Users

To ensure the best security when using EaseSplit:

1. Keep your browser updated to the latest version
2. Use a modern, secure browser
3. Be cautious when installing browser extensions that might access localStorage
4. Regularly clear your browser data if you want to remove your EaseSplit data
5. Do not share your device with untrusted users without clearing browser data

## Response Process

When we receive a security report:

1. We will acknowledge receipt of your report within 48 hours
2. Our team will investigate and assess the vulnerability
3. We will develop and test a fix if the vulnerability is confirmed
4. We will release an update with the fix
5. We will notify you when the fix is released

We appreciate your efforts to responsibly disclose any security concerns.
