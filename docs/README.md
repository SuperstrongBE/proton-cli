# Proton CLI Documentation

This documentation covers all the commands available in the Proton CLI tool. The commands are organized into categories based on their functionality.

## Command Categories

### Account Management
- [Account Commands](commands/account/README.md) - Create and manage accounts
- [Permission Commands](commands/permission/README.md) - Manage account permissions and authorities

### Resource Management
- [RAM Commands](commands/ram/README.md) - Buy and manage RAM resources
- [System Commands](commands/system/README.md) - System-level resource management

### Smart Contract Interaction
- [Action Commands](commands/action/README.md) - Execute smart contract actions
- [Contract Commands](commands/contract/README.md) - Deploy and manage smart contracts
- [Table Commands](commands/table/README.md) - Query smart contract tables

### Transaction Management
- [Transaction Commands](commands/transaction/README.md) - Create and manage transactions
- [Multisig Commands](commands/msig/README.md) - Handle multisignature transactions

### Development Tools
- [Generate Commands](commands/generate/README.md) - Generate smart contract code and boilerplate
- [Encode Commands](commands/encode/README.md) - Encode blockchain data types

### Key Management
- [Key Commands](commands/key/README.md) - Manage private keys and permissions

### Chain Interaction
- [Chain Commands](commands/chain/README.md) - Manage blockchain network connections
- [Block Commands](commands/block/README.md) - Query block information
- [RPC Commands](commands/rpc/README.md) - Direct RPC endpoint interaction

### Utility Commands
- [Faucet Commands](commands/faucet/README.md) - Interact with token faucets
- [PSR Commands](commands/psr/README.md) - Handle Proton Signing Requests
- [Scan Commands](commands/scan/README.md) - Quick access to block explorer

## Common Command Patterns

Most commands follow these general patterns:
1. Basic query: `proton <category> <action>`
2. Resource management: `proton <category>:<action> <target> <amount>`
3. Contract interaction: `proton <category> <contract> <action> [data]`
4. Account operations: `proton <category> <account> [parameters]`

## General Notes

- Most commands that modify the blockchain require proper authorization
- Many commands support additional flags for customization
- Interactive prompts are available when required parameters are not provided
- Error messages include detailed information about failures
- Some commands are restricted to system accounts
- Documentation for each command includes examples and parameter descriptions

For detailed information about specific commands, please refer to their respective documentation pages linked above.