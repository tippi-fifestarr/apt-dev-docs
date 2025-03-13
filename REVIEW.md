# Andrew Filter Review for first-multisig.mdx

## Missing Links

1. **Line 19**: "Aptos implements multisig at the protocol level through its account abstraction system."
   - **Issue**: This technical concept should link to documentation.
   - **Suggested Fix**: "Aptos implements multisig at the [protocol level through its account abstraction system](https://aptos.dev/concepts/accounts)."

2. **Line 36**: "download Python from [python.org](http://python.org/)."
   - **Issue**: The link is using http instead of https.
   - **Suggested Fix**: "download Python from [python.org](https://python.org/)."

3. **Line 254**: "The Aptos account model facilitates the unique ability to rotate an account's private key."
   - **Issue**: Technical concept without a link to documentation.
   - **Suggested Fix**: "The Aptos account model facilitates the unique ability to [rotate an account's private key](https://aptos.dev/concepts/accounts#rotating-authentication-key)."

4. **Line 599**: "Join the [Aptos Discord](https://discord.gg/aptoslabs) for developer support."
   - **Issue**: Link should be verified.
   - **Suggested Fix**: Verify the Discord link is correct and current.

## Grammar Issues

1. **Line 19**: "Aptos implements multisig at the protocol level through its account abstraction system."
   - **Issue**: The term "account abstraction system" is used without prior introduction.
   - **Suggested Fix**: "Aptos implements multisig at the protocol level through its account system, which abstracts the authentication process from the account identity."

2. **Line 23**: "As a brief conceptual overview, imagine a bank vault that requires multiple key holders to open it where each key holder must be present and provide their unique key before any access is granted."
   - **Issue**: Run-on sentence.
   - **Suggested Fix**: "As a brief conceptual overview, imagine a bank vault that requires multiple key holders to open it. Each key holder must be present and provide their unique key before any access is granted."

## Precision Issues

1. **Line 19**: "Aptos implements multisig at the protocol level through its account abstraction system."
   - **Issue**: Lacks precision about how the account abstraction system works.
   - **Suggested Fix**: "Aptos implements multisig directly at the protocol level, allowing accounts to require multiple signatures without deploying additional smart contracts."

2. **Line 36**: "If you see an error or your Python version is below version 3.7, download Python from [python.org](http://python.org/)."
   - **Issue**: Not specific about what to download.
   - **Suggested Fix**: "If you see an error or your Python version is below version 3.7, download and install the latest Python version from [python.org](https://python.org/)."

## Conciseness Issues

1. **Line 107-111**: "This command: - Creates an isolated Python environment - Installs a fresh Python instance - Keeps project dependencies separate from your system Python - Creates a `venv` folder (you can view but don't modify its contents!)"
   - **Issue**: Unnecessarily verbose explanation.
   - **Suggested Fix**: "This command creates an isolated Python environment in a `venv` folder, keeping project dependencies separate from your system Python."

2. **Line 123-128**: "This command: - Modifies your terminal's environment variables - Makes your terminal use the Python from `venv` instead of your system Python - You'll see `(venv)` appear at the start of your terminal line - To deactivate later, simply type `deactivate`"
   - **Issue**: Verbose explanation.
   - **Suggested Fix**: "This command activates the virtual environment. You'll see `(venv)` at the start of your terminal line. To deactivate later, type `deactivate`."

3. **Line 140-144**: "This command: - Downloads the Aptos SDK package from PyPI (Python Package Index) - Installs it inside your `venv` folder - Creates files in `venv/lib/python3.x/site-packages/aptos_sdk` - You can view these files by navigating to that directory"
   - **Issue**: Overly detailed explanation.
   - **Suggested Fix**: "This command installs the Aptos SDK package from PyPI into your virtual environment."

4. **Line 493**: "On devnet, we can easily fund them with test APT"
   - **Issue**: The word "easily" is unnecessary.
   - **Suggested Fix**: "On devnet, we fund them with test APT"

## Ambiguous Pronouns

1. **Line 23-24**: "As a brief conceptual overview, imagine a bank vault that requires multiple key holders to open it where each key holder must be present and provide their unique key before any access is granted. This is exactly how multisig (multi-signature) works in Aptos, but with digital signatures instead of physical keys."
   - **Issue**: "This" is ambiguous.
   - **Suggested Fix**: "As a brief conceptual overview, imagine a bank vault that requires multiple key holders to open it. Each key holder must be present and provide their unique key before any access is granted. This security model is exactly how multisig (multi-signature) works in Aptos, but with digital signatures instead of physical keys."

## Platform-Specific Instructions (Should Use Tabs)

1. **Line 36-39**: Windows-specific instructions in a Callout.
   - **Issue**: Should use Tabs component for platform-specific instructions.
   - **Suggested Fix**:
   ```
   <Tabs items={["Mac/Linux", "Windows"]}>
     <Tabs.Tab>
     ```bash filename="Terminal"
     python3 --version
     ```
     </Tabs.Tab>
     <Tabs.Tab>
     ```bash filename="Terminal"
     python --version
     ```
     </Tabs.Tab>
   </Tabs>
   ```

2. **Line 59-62**: Windows-specific instructions in a Callout.
   - **Issue**: Should use Tabs component.
   - **Suggested Fix**:
   ```
   <Tabs items={["Mac/Linux", "Windows"]}>
     <Tabs.Tab>
     ```bash filename="Terminal"
     python3 -m venv venv
     ```
     </Tabs.Tab>
     <Tabs.Tab>
     ```bash filename="Terminal"
     python -m venv venv
     ```
     </Tabs.Tab>
   </Tabs>
   ```

3. **Line 75-85**: Windows-specific instructions in a Callout.
   - **Issue**: Should use Tabs component.
   - **Suggested Fix**:
   ```
   <Tabs items={["Mac/Linux", "Windows"]}>
     <Tabs.Tab>
     ```bash filename="Terminal"
     source venv/bin/activate
     ```
     </Tabs.Tab>
     <Tabs.Tab>
     ```bash filename="Terminal"
     .\venv\Scripts\activate
     ```
     
     If you get an error about scripts not being allowed to run, you can enable them with PowerShell:
     
     ```powershell filename="Terminal"
     Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
     ```
     
     Confirm by typing `[Y]` and pressing Enter, then retry the activation command.
     </Tabs.Tab>
   </Tabs>
   ```

4. **Line 153-159**: Windows-specific instructions in a Callout.
   - **Issue**: Should use Tabs component.
   - **Suggested Fix**:
   ```
   <Tabs items={["Mac/Linux", "Windows"]}>
     <Tabs.Tab>
     ```bash filename="Terminal"
     touch multisig.py
     ```
     </Tabs.Tab>
     <Tabs.Tab>
     ```powershell filename="Terminal"
     echo "" > multisig.py
     ```
     </Tabs.Tab>
   </Tabs>
   ```

## Vague/Informal Prose

1. **Line 593**: "Let us know what excites you most about multisig on Aptos! Join our community channels to share your ideas and experiences."
   - **Issue**: Overly enthusiastic tone.
   - **Suggested Fix**: "For questions about multisig on Aptos, join our community channels."
