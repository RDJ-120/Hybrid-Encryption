# Hybrid Encryption CLI Tool (Node.js)

## Overview

A command-line tool built with Node.js that implements Hybrid Encryption
using a combination of symmetric and asymmetric cryptography.

-   AES-256-CBC is used for fast data encryption
-   RSA (2048-bit) is used for secure key exchange

The tool supports encryption and decryption of text, files, and
directories with optional recursive processing.

------------------------------------------------------------------------

## Features

-   Hybrid Encryption (AES + RSA)
-   Encrypt / Decrypt:
    -   Text
    -   Files
    -   Directories
-   Recursive directory processing (--deep)
-   Automatic RSA key generation
-   Secure AES key handling (encrypted with RSA)
-   Interactive CLI prompts or full CLI argument control
-   Colored terminal output using chalk

------------------------------------------------------------------------

## Technologies Used

Node.js (ES Modules) yargs crypto (built-in) fs (built-in) path
(built-in) prompt-sync chalk

------------------------------------------------------------------------

## Installation

    git clone https://github.com/RDJ-120/Hybrid-Encryption
    cd Hybrid-Encryption
    npm install

------------------------------------------------------------------------

## Usage
<p align="center">
  <img src="https://github.com/user-attachments/assets/60499015-e71b-4f6d-a8ec-9d5a30a201f3" width="32%" alt="RSA Key Spec">
  <img src="https://github.com/user-attachments/assets/d5187e3d-f043-4734-a85c-d71366444cf5" width="32%" alt="Key File Spec">
  <img src="https://github.com/user-attachments/assets/e8633432-fdc4-43e6-93e4-8cfb195a1891" width="32%" alt="Result Hash">
</p>

    node CLI-Hybrid.js --mode=<encrypt|decrypt> --type=<text|file|dir> --target="<value>" [options]

------------------------------------------------------------------------

## CLI Options

  Option       Type      Description
  ------------ --------- -----------------------------------------
  --mode       string    encrypt or decrypt
  --type       string    text, file, or dir
  --target     string    Target input (text or path)
  --have-aes   boolean   Use existing AES key
  --have-rsa   boolean   Use existing RSA keys
  --deep       boolean   Recursive processing (directories only)
  --public     string    Path to RSA public key
  --private    string    Path to RSA private key
  --aes-key    string    Path to encrypted AES key

------------------------------------------------------------------------

## License

MIT License
