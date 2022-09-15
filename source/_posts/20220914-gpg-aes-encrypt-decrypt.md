title: GPG AES 256 encrypt and decrypt
date: 2022-09-14 21:29:12
tags:
- gpg
- aes
---

## Encrypt

```bash
gpg --cipher-algo AES256 \
  --no-symkey-cache \
  --batch --pinentry-mode loopback \
  --passphrase  "STRONG_PASSWORD" \
  --output ENCRYPTED_FILENAME --symmetric FILENAME

```

## Decrypt

```bash
gpg --no-symkey-cache \
  --batch --pinentry-mode loopback \
  --passphrase  "STRONG_PASSWORD" \
  --output DECRYPTED_FILENAME --decrypt ENCRYPTED_FILENAME
```

## Option explanation

If directly using `gpg -c XXX` and `gpg -d XXX` the gpg-agent will prompt the password asking dialog.

See GPG manual:

```bash
If this command is used with --batch, --pinentry-mode has been set to loopback,  and  one  of
the  passphrase  options  (--passphrase,  --passphrase-fd, or --passphrase-file) is used, the
supplied passphrase is used for the new key and the agent does not ask for it.  To  create  a
key without any protection --passphrase '' may be used.
```

So just set it with `--batch` and `--pinentry-mode loopback`, then can use the `--passphrase`.

`--no-symkey-cache` to disable symmetric key cached and `--cipher-algo` to set algorithm.

Available algorithms can check by `gpg --version`.

Hope this save your time! :)
