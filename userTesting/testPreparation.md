# Test preparation

These steps needs to be done prior to running the test scripts for the JS SDK

## IDE and other tools

-   Download and install latest LTS version of [nodejs](https://nodejs.org/en/download/)
-   Download and install a text editor or an IDE
    -   [Visual studio code](https://code.visualstudio.com/download)
    -   [Atom](https://atom.io/)

## Configure project

-   Open a command prompt
-   Create a new folder and step into it
-   Run `npm init`
    -   Set a package name (f ex odp_testing)
    -   Leave the other choices to default
-   Create the file `.npmrc`
    -   Paste the following content into it

```
registry=https://pkgs.dev.azure.com/oceandatafoundation/ODP/_packaging/ODP/npm/registry/

always-auth=true
```

-   Go to your home directory and create the file `.npmrc`
    -   Paste the following content into it

```
; begin auth token
//pkgs.dev.azure.com/oceandatafoundation/ODP/_packaging/ODP/npm/registry/:username=oceandatafoundation
//pkgs.dev.azure.com/oceandatafoundation/ODP/_packaging/ODP/npm/registry/:_password=ZnRhbGltaDdlbHd3bXVhZzdkNDJjNGU2bnZvZG9ldHp1eGVqNTRwMmRjajIyN2NqbW5ncQ==
//pkgs.dev.azure.com/oceandatafoundation/ODP/_packaging/ODP/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/oceandatafoundation/ODP/_packaging/ODP/npm/:username=oceandatafoundation
//pkgs.dev.azure.com/oceandatafoundation/ODP/_packaging/ODP/npm/:_password=ZnRhbGltaDdlbHd3bXVhZzdkNDJjNGU2bnZvZG9ldHp1eGVqNTRwMmRjajIyN2NqbW5ncQ==
//pkgs.dev.azure.com/oceandatafoundation/ODP/_packaging/ODP/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
```

-   Go back to the project folder and install the JS SDK

```
npm install @odp/sdk --save
```

-   Now the project should be ready use for test scripts
