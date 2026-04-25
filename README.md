Hybrid-Encryption CLI Tool

Overview

This project is a command-line tool written in JavaScript that implements Hybrid Encryption, combining the strengths of symmetric and asymmetric cryptography.

The tool uses:

- AES (Advanced Encryption Standard) for fast and secure data encryption
- RSA (Rivest–Shamir–Adleman) for secure key exchange

This approach ensures both performance and security when encrypting files, directories, or text data.

---

Features

- Encrypt and decrypt:
  - Files
  - Directories (with optional recursion)
  - Raw text input
- Hybrid encryption (AES + RSA)
- Secure key generation
- CLI-based usage with flexible options
- Optional deep encryption for directories
- Password protection support (if implemented)

---

How It Works

1. A random AES key is generated.
2. Data is encrypted using AES.
3. The AES key is encrypted using RSA.
4. Both the encrypted data and encrypted AES key are stored or transmitted.

During decryption:

1. RSA decrypts the AES key.
2. AES decrypts the data.

---

Installation

git clone <your-repo-url>
cd <your-project-folder>
npm install

---

Usage

node CLI-Hybrid.js --mode=<encrypt|decrypt> --type=<file|dir|text> --target="<path>" [options]

---

Options

Option| Description
"--mode"| Operation mode: "encrypt" or "decrypt"
"--type"| Target type: "file", "dir", or "text"
"--target"| File path, directory path, or text input
"--have-aes"| Enable AES encryption
"--have-rsa"| Enable RSA encryption
"--deep"| Apply operation recursively on directories

---

Examples

Encrypt a File

node CLI-Hybrid.js --mode=encrypt --type=file --target="example.txt" --have-aes --have-rsa

Decrypt a File

node CLI-Hybrid.js --mode=decrypt --type=file --target="example.enc" --have-aes --have-rsa

Encrypt a Directory Recursively

node CLI-Hybrid.js --mode=encrypt --type=dir --target="./data" --deep --have-aes --have-rsa

---

Project Structure

/project-root
│
├── CLI-Hybrid.js        # Main CLI entry point
├── encryption/          # AES and RSA logic
├── utils/               # Helper functions
├── keys/                # Key storage (if applicable)
└── package.json

---

Security Notes

- Keep private RSA keys secure and never expose them.
- Do not reuse AES keys across multiple encryptions.
- Ensure proper randomness when generating keys and IVs.
- Avoid storing sensitive data in plaintext.

---

Requirements

- Node.js (v16 or higher recommended)

---

Future Improvements

- Key management system
- GUI interface
- Performance optimizations for large directories
- Logging and error tracking enhancements

---

License

This project is licensed under the MIT License.
