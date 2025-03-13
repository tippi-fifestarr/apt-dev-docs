# Andrew Filter Review for first-multisig.mdx

This document lists issues found in the `apps/nextra/pages/en/build/guides/first-multisig.mdx` file according to the Andrew Filter criteria.

## 1. Links Missing

### Line 19-20:
```
We're interfacing with Aptos using the [Aptos Python SDK](https://aptos.dev/en/build/sdks/python-sdk).
```
**Issue**: The link to the Python SDK is relative and should be updated to a proper URL.

### Line 42:
```
If you see an error or your Python version is below version 3.7, download Python from [python.org](http://python.org/).
```
**Issue**: The link to python.org uses HTTP instead of HTTPS.

### Line 301:
```
1. Review the [complete code example](https://github.com/aptos-labs/aptos-python-sdk/blob/main/examples/multisig.py) which include all the Advanced Features (see above).
```
**Issue**: The link text says "complete code example" but should be more specific about what it links to.

### Line 302-304:
```
2. Learn about [multisig governance in this tutorial](https://aptos.dev/en/build/cli/working-with-move-contracts/multi-signature-tutorial).
3. Explore [account abstraction in Aptos](https://aptos.dev/concepts/accounts).
4. Join the [Aptos Discord](https://discord.gg/aptoslabs) for developer support.
```
**Issue**: The links to Aptos documentation use relative URLs that should be updated to proper URLs.

## 2. Grammar Issues

### Line 19-20:
```
We're interfacing with Aptos using the [Aptos Python SDK](https://aptos.dev/en/build/sdks/python-sdk).
```
**Issue**: This sentence is in first person plural ("We're") which is inconsistent with the rest of the tutorial that uses second person ("you'll learn").

### Line 301:
```
1. Review the [complete code example](https://github.com/aptos-labs/aptos-python-sdk/blob/main/examples/multisig.py) which include all the Advanced Features (see above).
```
**Issue**: Grammar error - "which include" should be "which includes".

### Line 264-265:
```
Like gathering two bank managers to sign a withdrawal slip - we need both signatures before the transaction can proceed.
```
**Issue**: This is a sentence fragment that should be connected to the previous or next sentence.

## 3. Precision Issues

### Line 21-22:
```
As a brief conceptual overview, imagine a bank vault that requires multiple key holders to open it where each key holder must be present and provide their unique key before any access is granted.
```
**Issue**: This is a very long sentence that could be broken up for clarity.

### Line 76-79:
```
This command:
- Creates an isolated Python environment
- Installs a fresh Python instance
- Keeps project dependencies separate from your system Python
- Creates a `venv` folder (you can view but don't modify its contents!)
```
**Issue**: The exclamation mark in the last bullet point is too informal.

### Line 107-110:
```
This command:
- Downloads the Aptos SDK package from PyPI (Python Package Index)
- Installs it inside your `venv` folder
- Creates files in `venv/lib/python3.x/site-packages/aptos_sdk`
- You can view these files by navigating to that directory
```
**Issue**: The last bullet point doesn't follow the same pattern as the others (doesn't start with a verb).

## 4. Newline Before Headers/Components

### Line 19:
```
<Callout type="info">
If you're coming from Ethereum/Solidity, note that Aptos handles multisig differently. Instead of deploying a smart contract like Gnosis Safe, Aptos implements multisig at the protocol level through its account abstraction system.
```
**Issue**: Missing newline before the text inside the Callout component.

### Line 41:
```
<Callout type="warning">
If you see an error or your Python version is below version 3.7, download Python from [python.org](http://python.org/).
</Callout>
```
**Issue**: Missing newline before the text inside the Callout component.

### Line 53:
```
<Callout type="info">
On Windows, use `python -m venv venv` instead (without the '3').
</Callout>
```
**Issue**: Missing newline before the text inside the Callout component.

### Line 81:
```
<Callout type="info">
On Windows, use `.\venv\Scripts\activate` instead.
```
**Issue**: Missing newline before the text inside the Callout component.

## 5. Conciseness Issues

### Line 35-36:
```
On devnet, we can easily fund them with test coins so they can cover the gas fees for transactions
```
**Issue**: Could be more concise by saying "On devnet, we can easily fund them with test APT".

### Line 293-295:
```
<Callout type="info">
Let us know what excites you most about multisig on Aptos! Join our community channels to share your ideas and experiences.
</Callout>
```
**Issue**: This callout is not providing technical information and could be removed.

## 6. Pronoun Ambiguity

### Line 35-36:
```
On devnet, we can easily fund them with test coins so they can cover the gas fees for transactions
```
**Issue**: The pronoun "them" is ambiguous - it refers to accounts but this isn't explicitly stated.

### Line 264-265:
```
Like gathering two bank managers to sign a withdrawal slip - we need both signatures before the transaction can proceed.
```
**Issue**: The pronoun "we" is ambiguous - it could refer to the reader, the author, or the system.

## 7. Out of Scope Sections

### Line 293-295:
```
<Callout type="info">
Let us know what excites you most about multisig on Aptos! Join our community channels to share your ideas and experiences.
</Callout>
```
**Issue**: This callout is out of scope for the tutorial and doesn't provide technical information.

## 8. Redundant Sections

### Line 276-278:
```
### Going Further: Advanced Features

You've completed the basics of Aptos multisig - creating a "vault" (multisig account), adding "key holders" (signers), and making a simple transfer that requires multiple approvals. But just like modern banking, there's much more we can do:
```
**Issue**: This section introduces advanced features but doesn't actually explain how to implement them, making it somewhat redundant.

## 9. Tab Component Missing

### Line 95-102:
```
```bash filename="Terminal"
touch multisig.py
```

<Callout type="info">
On Windows, use the command:
```powershell filename="Terminal"
echo "" > multisig.py
```
</Callout>
```
**Issue**: This should use a Tabs component for the different OS commands rather than a Callout.

## 10. Informal Prose

### Line 76-79:
```
This command:
- Creates an isolated Python environment
- Installs a fresh Python instance
- Keeps project dependencies separate from your system Python
- Creates a `venv` folder (you can view but don't modify its contents!)
```
**Issue**: The exclamation mark and parenthetical comment are too informal.

### Line 293-295:
```
<Callout type="info">
Let us know what excites you most about multisig on Aptos! Join our community channels to share your ideas and experiences.
</Callout>
```
**Issue**: The exclamation mark and invitation to share experiences are too informal for a technical tutorial.

## 11. Separator Issues

No separator issues were found in the document.
