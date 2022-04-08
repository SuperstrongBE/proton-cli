import { Command, flags } from '@oclif/command'
import { CliUx } from '@oclif/core'
import { network } from '../../storage/networks'
import dedent from 'ts-dedent'
import { ABI } from '@greymass/eosio'
import { red } from 'colors'

export default class Action extends Command {
  static description = 'Execute Action'

  static args = [
    { name: 'contractName', required: true },
    { name: 'actionName', required: false },
    { name: 'data', required: false },
    { name: 'authorization', required: false, description: 'Account to authorize with' },
  ]

  static flags = {
    // permission: flags.string({ char: 'p', description: 'An account and permission to authorize, as in account@permission' }),
  }

  async run() {
    const { args } = this.parse(Action)

    // Get ABI
    const { abi: rawAbi } = await network.rpc.get_abi(args.contractName)
    const abi = ABI.from(rawAbi)

    // Guided flow
    if (!args.actionName) {
      const availableActions = rawAbi.actions.map((a) => {
        const resolved = abi.resolveType(a.name);
        const fields = resolved.fields!.map(field => `${field.name}: ${field.type.name}`).join(', ')
        return `• ${a.name} (${fields})`
      }).join('\n')

      CliUx.ux.log(dedent`
        Available actions:
        ${availableActions}
      `)
      return
    }

    // Resolved action
    const resolvedAction = abi.resolveType(args.actionName);

    // Check data
    if (!args.data) {
      const fields = resolvedAction.fields!.map(field => `${field.name}: ${field.type.name}`).join(', ')
      throw new Error(`Missing ${resolvedAction.name} data: { ${fields} }`)
    }

    // Check authorization
    if (!args.authorization) {
      throw new Error('Authorization missing (e.g. account@active)')
    }

    // Create authorization
    let [actor, permission] = args.authorization.split('@')
    if (!permission) {
      permission = 'active'
    }
    const authorization = [{ actor, permission }]

    // Set data
    const data: any = {}
    const parsedArgsData = JSON.parse(args.data)

    if (Array.isArray(parsedArgsData)) {
      for (const [i, dataArg] of JSON.parse(args.data).entries()) {
        data[resolvedAction.fields![i].name] = dataArg
      }
    } else {
      for (const field of resolvedAction.fields!) {
        if (!field.type.isOptional && !parsedArgsData.hasOwnProperty(field.name)) {
          throw new Error(`Missing field ${field.name} on action ${resolvedAction.name}`);
        }

        if (parsedArgsData.hasOwnProperty(field.name)) {
          data[field.name] = parsedArgsData[field.name]
        }
      }
    }

    // Fetch rows
    const result = await network.transact({
      actions: [{
        account: args.contractName,
        name: args.actionName,
        data,
        authorization
      }]
    })
    CliUx.ux.styledJSON(result)
  }

  async catch(e: Error | any) {
    const error = e && e.details && e.details.length && e.details[0] && e.details[0].message
    if (error || typeof e === 'object') {
      CliUx.ux.log('\n' + red(error || e.message))
    } else {
      CliUx.ux.styledJSON(e)
    }
  }
}

