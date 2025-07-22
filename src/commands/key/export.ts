import { Command } from "@oclif/command";
import { CliUx } from "@oclif/core";
import passwordManager from "../../storage/passwordManager";
import { Key } from "@proton/js";

import { config } from "../../storage/config";
import { lookupKey } from "../../utils/pubkeyToAccount";
import { green, red } from "colors";
import { createTxtFile } from "../../utils/toText";
import { createPdf } from "../../utils/pdfExport";
import inquirer from "inquirer";

export type ExportAccountType = {
  chain: string;
  accounts: string[] | null;
  publicKey: string;
  privateKey: string;
};

export type ExportConfig = {
  mode: "txt" | "pdf" | "json";
  showPrivateKey: boolean;
  search?: string;
  password?: string;
  exportPath?: string;
};

export default class ExportKeys extends Command {
  static description = "Export keys to text or QR code in PDF";

  async run() {
    const privateKeys = await passwordManager.getPrivateKeys();
    const chain = config.get("currentChain");
    const pdfFileName = `${chain}_keys_${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDate()}`;
    const agree = await inquirer.prompt([
      {
        name: "agree",
        message:
          "You are about to export accounts's sensitive information. Do you agree ?",
        type: "confirm",
      },
    ]);

    if (!agree.agree) {
      CliUx.ux.log(red("Canceled"));
      return;
    }

    const exportConfig: ExportConfig = {
      mode: "txt",
      showPrivateKey: false,
    };

    const search = await inquirer.prompt([
      {
        name: "search",
        message: "Search for accounts (leave blank to export all accounts)",
        type: "input",
      },
    ]);

    exportConfig.search = search.search;

    const exportMode: any = await inquirer.prompt([
      {
        name: "mode",
        message: "Select the export format",
        type: "list",
        choices: ["txt", "pdf", "json"],
      },
    ]);

    exportConfig.mode = exportMode.mode;

    if (exportConfig.mode === "pdf") {
      const displayPrivateKey = await inquirer.prompt([
        {
          name: "displayPrivateKey",
          message: "Show private key as plain text in the file?",
          type: "confirm",
        },
      ]);

      exportConfig.showPrivateKey = displayPrivateKey.displayPrivateKey;

      const password = await inquirer.prompt([
        {
          name: "password",
          message: "File protection password (leave blank for no protection)",
          type: "input",
        },
      ]);
      exportConfig.password = password.password;
    }

    if (privateKeys.length > 0) {
      CliUx.ux.action.start(green("Exporting keys"));

      const accountsData = privateKeys.map(async (privateKey) => {
        const parsedPrivateKey = Key.PrivateKey.fromString(privateKey);
        const publicKey = parsedPrivateKey.getPublicKey().toString();
        const accounts = await lookupKey(
          publicKey,
          chain,
          search.search === "" ? undefined : search.search
        );
        return {
          chain,
          accounts,
          publicKey,
          privateKey: "PVT_K1_NOT_REVEALED_FOR_DEMO_DUH",
        };
      });
      Promise.all(accountsData).then((data) => {
        const exportedKeys = data.filter((item) => item.accounts !== null);

        if (exportMode.mode === "pdf") {
          createPdf(
            exportedKeys,
            `${pdfFileName}.pdf`,
            exportConfig.password,
            exportConfig.showPrivateKey
          );
        }

        if (exportConfig.mode === "txt") {
          const txtContent = exportedKeys.map((item) => {
            return `${JSON.stringify(item)}\n`;
          });
          createTxtFile(txtContent.join(""), `${pdfFileName}.txt`);
        }

        if (exportConfig.mode === "json") {
          createTxtFile(
            JSON.stringify(exportedKeys, null, 2),
            `${pdfFileName}.json`
          );
        }

        CliUx.ux.action.stop(green(`Done`));
        CliUx.ux.log(
          green(
            `Exported ${
              exportedKeys.length
            } keys to ${process.cwd()}/${pdfFileName}.${exportMode.mode}`
          )
        );
      });
    }
  }
}
