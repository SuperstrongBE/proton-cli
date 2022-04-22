@proton/cli
===================

Proton CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@proton/cli.svg)](https://npmjs.org/package/@proton/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@proton/cli.svg)](https://npmjs.org/package/@proton/cli)
[![License](https://img.shields.io/npm/l/@proton/cli.svg)](https://github.com/ProtonProtocol/proton-cli/blob/master/package.json)

<!-- toc -->
* [Installation](#installation)
* [Install NodeJS](#install-nodejs)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Installation
Install CLI (NPM)
```
npm i -g @proton/cli
```

Install CLI (Yarn)
```
yarn global add @proton/cli
```

If you get a missing write access error on Mac/Linux, first run:
```
sudo chown -R $USER /usr/local/lib/node_modules
sudo chown -R $USER /usr/local/bin
```

# Install NodeJS

> You can skip this step if you already have NodeJS installed

**1. Install NVM**

MacOS/Linux/WSL:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Windows 7/10/11:

Download nvm-setup.zip and run it [here](https://github.com/coreybutler/nvm-windows/releases). After installation, open a new PowerShell window as administrator.

**2. Install NodeJS**
```
nvm install 16
nvm use 16
```

# Usage
<!-- usage -->
```sh-session
$ npm install -g @proton/cli
$ proton COMMAND
running command...
$ proton (--version)
@proton/cli/0.1.64 darwin-arm64 node-v16.14.0
$ proton --help [COMMAND]
USAGE
  $ proton COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`proton account ACCOUNT`](#proton-account-account)
* [`proton account:create ACCOUNT`](#proton-accountcreate-account)
* [`proton action CONTRACT [ACTION] [DATA] [AUTHORIZATION]`](#proton-action-contract-action-data-authorization)
* [`proton block:get BLOCKNUMBER`](#proton-blockget-blocknumber)
* [`proton boilerplate [FOLDER]`](#proton-boilerplate-folder)
* [`proton chain:get`](#proton-chainget)
* [`proton chain:info`](#proton-chaininfo)
* [`proton chain:list`](#proton-chainlist)
* [`proton chain:set [CHAIN]`](#proton-chainset-chain)
* [`proton contract:abi ACCOUNT`](#proton-contractabi-account)
* [`proton contract:create CONTRACTNAME`](#proton-contractcreate-contractname)
* [`proton contract:enableinline ACCOUNT`](#proton-contractenableinline-account)
* [`proton contract:set ACCOUNT DIRECTORY`](#proton-contractset-account-directory)
* [`proton contract:table TABLENAME CONTRACTNAME`](#proton-contracttable-tablename-contractname)
* [`proton faucet`](#proton-faucet)
* [`proton faucet:claim SYMBOL AUTHORIZATION`](#proton-faucetclaim-symbol-authorization)
* [`proton help [COMMAND]`](#proton-help-command)
* [`proton key:add [PRIVATEKEY]`](#proton-keyadd-privatekey)
* [`proton key:generate`](#proton-keygenerate)
* [`proton key:get PUBLICKEY`](#proton-keyget-publickey)
* [`proton key:list`](#proton-keylist)
* [`proton key:lock`](#proton-keylock)
* [`proton key:remove [PRIVATEKEY]`](#proton-keyremove-privatekey)
* [`proton key:reset`](#proton-keyreset)
* [`proton key:unlock [PASSWORD]`](#proton-keyunlock-password)
* [`proton multisig:contract DIRECTORY`](#proton-multisigcontract-directory)
* [`proton network`](#proton-network)
* [`proton permission ACCOUNT`](#proton-permission-account)
* [`proton permission:link ACCOUNT PERMISSION CONTRACT [ACTION]`](#proton-permissionlink-account-permission-contract-action)
* [`proton permission:unlink ACCOUNT CONTRACT [ACTION]`](#proton-permissionunlink-account-contract-action)
* [`proton psr URI`](#proton-psr-uri)
* [`proton ram`](#proton-ram)
* [`proton ram:buy BUYER RECEIVER BYTES`](#proton-rambuy-buyer-receiver-bytes)
* [`proton scan ACCOUNT`](#proton-scan-account)
* [`proton table CONTRACT [TABLE] [SCOPE]`](#proton-table-contract-table-scope)
* [`proton transaction JSON`](#proton-transaction-json)
* [`proton transaction:get ID`](#proton-transactionget-id)
* [`proton transaction:push TRANSACTION`](#proton-transactionpush-transaction)
* [`proton version`](#proton-version)

## `proton account ACCOUNT`

Get Account Information

```
USAGE
  $ proton account [ACCOUNT] [-r] [-t]

FLAGS
  -r, --raw
  -t, --tokens  Show token balances

DESCRIPTION
  Get Account Information
```

_See code: [lib/commands/account/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/account/index.js)_

## `proton account:create ACCOUNT`

Create New Account

```
USAGE
  $ proton account:create [ACCOUNT]

DESCRIPTION
  Create New Account
```

_See code: [lib/commands/account/create.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/account/create.js)_

## `proton action CONTRACT [ACTION] [DATA] [AUTHORIZATION]`

Execute Action

```
USAGE
  $ proton action [CONTRACT] [ACTION] [DATA] [AUTHORIZATION]

ARGUMENTS
  CONTRACT
  ACTION
  DATA
  AUTHORIZATION  Account to authorize with

DESCRIPTION
  Execute Action
```

_See code: [lib/commands/action/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/action/index.js)_

## `proton block:get BLOCKNUMBER`

Get Block

```
USAGE
  $ proton block:get [BLOCKNUMBER]

DESCRIPTION
  Get Block
```

_See code: [lib/commands/block/get.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/block/get.js)_

## `proton boilerplate [FOLDER]`

Boilerplate a new Proton Project with contract, frontend and tests

```
USAGE
  $ proton boilerplate [FOLDER] [-h]

FLAGS
  -h, --help  show CLI help

DESCRIPTION
  Boilerplate a new Proton Project with contract, frontend and tests
```

_See code: [lib/commands/boilerplate.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/boilerplate.js)_

## `proton chain:get`

Get Current Chain

```
USAGE
  $ proton chain:get

DESCRIPTION
  Get Current Chain

ALIASES
  $ proton network
```

_See code: [lib/commands/chain/get.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/chain/get.js)_

## `proton chain:info`

Get Chain Info

```
USAGE
  $ proton chain:info

DESCRIPTION
  Get Chain Info
```

_See code: [lib/commands/chain/info.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/chain/info.js)_

## `proton chain:list`

All Networks

```
USAGE
  $ proton chain:list

DESCRIPTION
  All Networks
```

_See code: [lib/commands/chain/list.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/chain/list.js)_

## `proton chain:set [CHAIN]`

Set Chain

```
USAGE
  $ proton chain:set [CHAIN]

ARGUMENTS
  CHAIN  Specific chain

DESCRIPTION
  Set Chain
```

_See code: [lib/commands/chain/set.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/chain/set.js)_

## `proton contract:abi ACCOUNT`

Get Contract ABI

```
USAGE
  $ proton contract:abi [ACCOUNT]

DESCRIPTION
  Get Contract ABI
```

_See code: [lib/commands/contract/abi.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/contract/abi.js)_

## `proton contract:create CONTRACTNAME`

```
USAGE
  $ proton contract:create [CONTRACTNAME] [-o <value>]

ARGUMENTS
  CONTRACTNAME  The name of the contract. 1-12 chars, only lowercase a-z and numbers 1-5 are possible

FLAGS
  -o, --output=<value>  The relative path to folder the the contract should be located. Current folder by default.
```

_See code: [lib/commands/contract/create.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/contract/create.js)_

## `proton contract:enableinline ACCOUNT`

Enable Inline Actions on a Contract

```
USAGE
  $ proton contract:enableinline [ACCOUNT] [-p <value>]

ARGUMENTS
  ACCOUNT  Contract account to enable

FLAGS
  -p, --authorization=<value>  Use a specific authorization other than contract@active

DESCRIPTION
  Enable Inline Actions on a Contract
```

_See code: [lib/commands/contract/enableinline.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/contract/enableinline.js)_

## `proton contract:set ACCOUNT DIRECTORY`

Deploy Contract (WASM + ABI)

```
USAGE
  $ proton contract:set [ACCOUNT] [DIRECTORY] [-c] [-a] [-w] [-i]

FLAGS
  -a, --abiOnly       Only deploy ABI
  -c, --clear         Removes WASM + ABI from contract
  -i, --enableInline  Enable inline
  -w, --wasmOnly      Only deploy WASM

DESCRIPTION
  Deploy Contract (WASM + ABI)
```

_See code: [lib/commands/contract/set.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/contract/set.js)_

## `proton contract:table TABLENAME CONTRACTNAME`

```
USAGE
  $ proton contract:table [TABLENAME] [CONTRACTNAME] [-t <value>] [-s] [-o <value>]

ARGUMENTS
  TABLENAME     The name of the contract's table. 1-12 chars, only lowercase a-z and numbers 1-5 are possible
  CONTRACTNAME  The name of the contract for table. 1-12 chars, only lowercase a-z and numbers 1-5 are possible

FLAGS
  -o, --output=<value>  The relative path to folder the the contract should be located. Current folder by default.
  -s, --singleton       Create a singleton table?
  -t, --class=<value>   The name of Typescript class for the table
```

_See code: [lib/commands/contract/table.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/contract/table.js)_

## `proton faucet`

List all faucets

```
USAGE
  $ proton faucet

DESCRIPTION
  List all faucets
```

_See code: [lib/commands/faucet/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/faucet/index.js)_

## `proton faucet:claim SYMBOL AUTHORIZATION`

Claim faucet

```
USAGE
  $ proton faucet:claim [SYMBOL] [AUTHORIZATION]

ARGUMENTS
  SYMBOL
  AUTHORIZATION  Authorization like account1@active

DESCRIPTION
  Claim faucet
```

_See code: [lib/commands/faucet/claim.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/faucet/claim.js)_

## `proton help [COMMAND]`

display help for proton

```
USAGE
  $ proton help [COMMAND] [--all]

ARGUMENTS
  COMMAND  command to show help for

FLAGS
  --all  see all commands in CLI

DESCRIPTION
  display help for proton
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.3.1/src/commands/help.ts)_

## `proton key:add [PRIVATEKEY]`

Manage Keys

```
USAGE
  $ proton key:add [PRIVATEKEY]

DESCRIPTION
  Manage Keys
```

_See code: [lib/commands/key/add.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/key/add.js)_

## `proton key:generate`

Generate Key

```
USAGE
  $ proton key:generate

DESCRIPTION
  Generate Key
```

_See code: [lib/commands/key/generate.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/key/generate.js)_

## `proton key:get PUBLICKEY`

Find private key for public key

```
USAGE
  $ proton key:get [PUBLICKEY]

DESCRIPTION
  Find private key for public key
```

_See code: [lib/commands/key/get.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/key/get.js)_

## `proton key:list`

List All Key

```
USAGE
  $ proton key:list

DESCRIPTION
  List All Key
```

_See code: [lib/commands/key/list.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/key/list.js)_

## `proton key:lock`

Lock Keys with password

```
USAGE
  $ proton key:lock

DESCRIPTION
  Lock Keys with password
```

_See code: [lib/commands/key/lock.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/key/lock.js)_

## `proton key:remove [PRIVATEKEY]`

Remove Key

```
USAGE
  $ proton key:remove [PRIVATEKEY]

DESCRIPTION
  Remove Key
```

_See code: [lib/commands/key/remove.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/key/remove.js)_

## `proton key:reset`

Reset password (Caution: deletes all private keys stored)

```
USAGE
  $ proton key:reset

DESCRIPTION
  Reset password (Caution: deletes all private keys stored)
```

_See code: [lib/commands/key/reset.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/key/reset.js)_

## `proton key:unlock [PASSWORD]`

Unlock all keys (Caution: Your keys will be stored in plaintext on disk)

```
USAGE
  $ proton key:unlock [PASSWORD]

DESCRIPTION
  Unlock all keys (Caution: Your keys will be stored in plaintext on disk)
```

_See code: [lib/commands/key/unlock.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/key/unlock.js)_

## `proton multisig:contract DIRECTORY`

Multisig Contract

```
USAGE
  $ proton multisig:contract [DIRECTORY]

DESCRIPTION
  Multisig Contract
```

_See code: [lib/commands/multisig/contract.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/multisig/contract.js)_

## `proton network`

Get Current Chain

```
USAGE
  $ proton network

DESCRIPTION
  Get Current Chain

ALIASES
  $ proton network
```

## `proton permission ACCOUNT`

Update Permission

```
USAGE
  $ proton permission [ACCOUNT]

ARGUMENTS
  ACCOUNT  Account to modify

DESCRIPTION
  Update Permission
```

_See code: [lib/commands/permission/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/permission/index.js)_

## `proton permission:link ACCOUNT PERMISSION CONTRACT [ACTION]`

Link Auth

```
USAGE
  $ proton permission:link [ACCOUNT] [PERMISSION] [CONTRACT] [ACTION] [-p <value>]

FLAGS
  -p, --permission=<value>  Permission to sign with (e.g. account@active)

DESCRIPTION
  Link Auth
```

_See code: [lib/commands/permission/link.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/permission/link.js)_

## `proton permission:unlink ACCOUNT CONTRACT [ACTION]`

Unlink Auth

```
USAGE
  $ proton permission:unlink [ACCOUNT] [CONTRACT] [ACTION] [-p <value>]

FLAGS
  -p, --permission=<value>

DESCRIPTION
  Unlink Auth
```

_See code: [lib/commands/permission/unlink.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/permission/unlink.js)_

## `proton psr URI`

Create Session

```
USAGE
  $ proton psr [URI]

DESCRIPTION
  Create Session
```

_See code: [lib/commands/psr/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/psr/index.js)_

## `proton ram`

List Ram price

```
USAGE
  $ proton ram

DESCRIPTION
  List Ram price
```

_See code: [lib/commands/ram/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/ram/index.js)_

## `proton ram:buy BUYER RECEIVER BYTES`

Claim faucet

```
USAGE
  $ proton ram:buy [BUYER] [RECEIVER] [BYTES] [-p <value>]

ARGUMENTS
  BUYER     Account paying for RAM
  RECEIVER  Account receiving RAM
  BYTES     Bytes of RAM to purchase

FLAGS
  -p, --authorization=<value>  Use a specific authorization other than buyer@active

DESCRIPTION
  Claim faucet
```

_See code: [lib/commands/ram/buy.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/ram/buy.js)_

## `proton scan ACCOUNT`

Open Account in Proton Scan

```
USAGE
  $ proton scan [ACCOUNT]

DESCRIPTION
  Open Account in Proton Scan
```

_See code: [lib/commands/scan/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/scan/index.js)_

## `proton table CONTRACT [TABLE] [SCOPE]`

Get Table Storage Rows

```
USAGE
  $ proton table [CONTRACT] [TABLE] [SCOPE] [-l <value>] [-u <value>] [-k <value>] [-r] [-p] [-c <value>]
    [-i <value>]

FLAGS
  -c, --limit=<value>          [default: 100]
  -i, --indexPosition=<value>  [default: 1]
  -k, --keyType=<value>
  -l, --lowerBound=<value>
  -p, --showPayer
  -r, --reverse
  -u, --upperBound=<value>

DESCRIPTION
  Get Table Storage Rows
```

_See code: [lib/commands/table/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/table/index.js)_

## `proton transaction JSON`

Execute Transaction

```
USAGE
  $ proton transaction [JSON]

DESCRIPTION
  Execute Transaction
```

_See code: [lib/commands/transaction/index.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/transaction/index.js)_

## `proton transaction:get ID`

Get Transaction by Transaction ID

```
USAGE
  $ proton transaction:get [ID]

DESCRIPTION
  Get Transaction by Transaction ID
```

_See code: [lib/commands/transaction/get.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/transaction/get.js)_

## `proton transaction:push TRANSACTION`

Push Transaction

```
USAGE
  $ proton transaction:push [TRANSACTION]

DESCRIPTION
  Push Transaction
```

_See code: [lib/commands/transaction/push.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/transaction/push.js)_

## `proton version`

Version of CLI

```
USAGE
  $ proton version

DESCRIPTION
  Version of CLI
```

_See code: [lib/commands/version.js](https://github.com/ProtonProtocol/proton-cli/blob/v0.1.64/lib/commands/version.js)_
<!-- commandsstop -->
