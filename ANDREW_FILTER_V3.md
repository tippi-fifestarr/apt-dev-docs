# The ANDREW FILTER v3

Help me apply an Andrew Filter (Andrew is the eagle-eye core dev approving my PRs for merge to main) for my new updated Guide: REPLACEWITH GUIDE at the end of the Andrews RULES, I'll give you the OLD VERSION of the guide.

After creating the REVIEW, double check that all the things you listed are indeed problems and that you've offered solutions. This is essentially a code review task focused on documentation quality rather than code functionality. Follow these rules exactly, paying attention to the examples and provided fixes below.

## Andrew.yaml RULES

Don't make any edits to our actual content, just make a separate file like "REVIEW.md" which lists out exact line numbers and quotes for every one of the following issues you see (a huge list of everything Andrew has complained about) and explain the issue and suggested fix for each one:

### Andrew.yaml v1

Andrew likes guides with a good general flow, and if we are updating an existing tutorial, he likes when we add sections that make sense (like defining Move Modules for the audience in Your First Move Module). If I provide you with an OLD VERSION and UPDATED you can compare the new sections but if you just have UPDATED assume all my sections are thoughtful additions.

1. Make sure everything that seems like it should be a link is a link. Make sure internal links to other pages in the Aptos Docs are formatted correctly, avoiding the .mdx if it's a root folder with a landing page, like sdks/ or book/.

   Example:

   "If you need more info, check out Node.js Documentation or the Aptos TypeScript SDK documentation."

   Fix:

   If you need more info, check out [Node.js Introduction](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) or the [Aptos TypeScript SDK](../sdks/ts-sdk) documentation.

   Example:

   ```bash
   [Move Book](../smart-contracts/book.mdx)
   ```

   Fix:

   ```bash
   [Move Book](../smart-contracts/book)
   ```

   Example:

   ```bash
   Ensure you have [installed the Aptos CLI](../cli.mdx).
   ```

   Fix:

   ```bash
   Ensure you have [installed the Aptos CLI](../cli).
   ```

2. Make sure all the sentences make grammatical sense individually and in context.

   Example:
   This goes through how the example code (shown in full at the end) does.

   Fix:

   We'll go through how the example code (shown in full at the end) does it.

3. Make sure we are precise with what we want people to know or do.

   Example:

   "This tutorial assumes you are comfortable with using the command line, have Node.js and npm installed, and understand basic JavaScript/TypeScript concepts."

   Fix:

   "This tutorial assumes you are comfortable with using the [Aptos CLI](../cli), have Node.js and npm installed, and understand basic JavaScript/TypeScript concepts."

4. Make sure to newline before headers and components

   Example:

   <Steps>
   ### setup the client

   Fix:

   <Steps>

   ### setup the client

5. Be concise and specific, but don't need to explain some things:

   Example:

   On devnet, we can easily fund them with test coins so they can cover the gas fees for transactions

   Fix:

   On devnet, we can easily fund them with test APT

6. When the pronoun is ambiguous, be precise with the word.

   Example:

   With the collection created, we can now mint a digital asset (an NFT) into it. This involves providing details like the name, description, and a URI (often linking to metadata like images).

   Fix:

   With the collection created, we can now mint a digital asset (an NFT) for the collection. This involves providing details like the name, description, and a URI (often linking to metadata like images).

7. The example below is a section with common errors I encountered (and mitigated with more specific steps in the tutorial). Callouts after tricky sections are okay, but remove sections (and even callouts) that are out of scope of the tutorial (meaning they shouldn't see these errors if they are following the steps of the tutorial).

   Example:

   ### Common Typescript Errors

   - **"Cannot find name 'process'"**: This error occurs when TypeScript can't find the Node.js type definitions. Make sure you have both installed `@types/node` and created a proper `tsconfig.json` file as shown in the "Configure TypeScript" step.
   - **"Object is possibly 'undefined'"**: TypeScript's strict mode prevents accessing properties on potentially undefined objects. Always check if arrays have elements before accessing them, as shown in our code example.

   Fix:

   Remove this whole section on Common Errors and make sure the steps of the tutorial mitigate possible problems.

8. Remove long summaries and redundant sections or repetitive explanations. Short summary of key learnings (less than 5 things) at end is okay.

   Example

   ## Run the Code

   Run the code with:

   Fix:

   Remove "run the code with:" because the header already explains this

9. Use Tabs component to keep things clean, like for Mac/Linux users and Windows users for Terminal command

   Example:

   1. Create a new file called `index.ts` in your project folder:

      ```bash
      touch index.ts
      ```

      <Callout type="info">
      **Windows users:** Use `type nul > index.ts` in Command Prompt.
      </Callout>

   Fix:

   1. Create a new file called `index.ts` in your project folder:

   ```powershell
   <Tabs items={["Mac/Linux", "Windows"]}>
     <Tabs.Tab>
     ```bash filename="Terminal"
     touch index.ts
     ```
     </Tabs.Tab>
     <Tabs.Tab>
     ```bash filename="Terminal"
     type nul > index.ts
     ```
     </Tabs.Tab>
   </Tabs>
   ```

10. Avoiding vague and informal prose, keeping the writing style concise and professional. Also we shouldn't make a statement that is missing info or can misdirect. In the example, our original intro mentions connecting with the SDK, but andrew points out that many folk write contracts without using the SDK to interact with it… and the SDK isn't used in the tutorial so whats the relevance?

    Example:

    The Aptos blockchain allows developers to write Turing complete smart contracts (called "modules") with the secure-by-design Move language. This means you can do all the blockchain things like sending money, but also write arbitrary code, even games. It all starts with the Move module. Once compiled and deployed with Aptos CLI, you can connect to a published move Module on Aptos like a public API via one of our [many Official SDKs](/sdks/).

    Fix:

    The Aptos blockchain allows developers to write Turing complete smart contracts (called "modules") with the secure-by-design Move language. Smart contracts enable users to send money with the blockchain, but also write arbitrary code, even games! It all starts with the Aptos CLI creating an account which will store the deployed ("published") Move module.

11. He likes clean, default formatting. He noticed `---` separators in the document before headers sometimes. It looks odd to have a separator above and (as by default, in the Nextra rendering) also below each heading. Ignore the front matter (title) --- dashes.

    Fix:

    remove any `---` separators that are near headers

12. Skip file creation instructions with tabs or callouts. Assume users know how to create files on their machine.

    Example:

    ```
    ### Create tsconfig.json

    1. Create a new TypeScript configuration file:

    <Tabs items={["Mac/Linux", "Windows"]}>
      <Tabs.Tab>
        ```bash filename="Terminal"
        touch tsconfig.json
        ```
      </Tabs.Tab>
      <Tabs.Tab>
        ```bash filename="Terminal"
        type nul > tsconfig.json
        ```
      </Tabs.Tab>
    </Tabs>

    2. Open the `tsconfig.json` file and add the following configuration:
    ```

    Fix:

    ```
    ### Create tsconfig.json

    Create a tsconfig file with the following:
    ```

13. Remove extraneous save file reminders.

    Example:

    ```
    <Callout type="warning">
    Remember to save your file after adding the configuration!
    </Callout>
    ```

    or

    ```
    <Callout type="warning">
    Remember to save your `.env` file after adding the configuration!
    </Callout>
    ```

    Fix:

    Remove these callouts entirely. Users know they need to save files.

OLD VERSION:
REPLACE WITH OLD VERSION
