import { Command } from "@oclif/command";
import { CliUx } from "@oclif/core";
import passwordManager from "../../storage/passwordManager";
import { Key } from "@proton/js";

import { config } from "../../storage/config";
import { pubKeyToaccount } from "../../utils/pubkeyToAccount";
import { green, red } from "colors";
import { createTxtFile } from "../../utils/toText";
import { createPdf } from "../../utils/pdfExport";
import inquirer from "inquirer";
import { z } from "zod";

const passwordValidator = z
  .string()
  .min(16)
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one digit",
  })
  .refine((val) => /[@_#!?*&$]/.test(val), {
    message: "Password must contain at least one special character (@_#!?*&$)",
  });

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
  protectFile?: boolean;
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
        choices: [
          { name: "PDF (with secure option)", value: "pdf" },
          { name: "Text file (no secure option)", value: "txt" },
          { name: "JSON file (no secure option)", value: "json" },
        ],
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

      const protectFile = await inquirer.prompt([
        {
          name: "protectFile",
          message: "Protect the file with a password?",
          type: "confirm",
        },
      ]);

      exportConfig.protectFile = protectFile.protectFile;

      if (exportConfig.protectFile) {
        const password = await inquirer.prompt([
          {
            name: "password",
            message:
              "Your 16 chars password with uppercase, lowercase, digits and special character (@_#!?*&$)",
            type: "input",
            validate: async (input: string) => {
              const result = passwordValidator.safeParse(input);
              if (!result.success) {
                return result.error.format()._errors.join("\n");
              } else {
                return true;
              }
            },
          },
        ]);
        exportConfig.password = password.password;
      }
    }

    if (privateKeys.length > 0) {
      CliUx.ux.action.start(green("Exporting keys (this may take a bit)"));

      const accountsData = privateKeys.map(async (privateKey) => {
        const parsedPrivateKey = Key.PrivateKey.fromString(privateKey);
        const publicKey = parsedPrivateKey.getPublicKey().toString();
        const accounts = await pubKeyToaccount(
          publicKey,
          chain,
          search.search === "" ? undefined : search.search
        );
        return {
          chain,
          accounts,
          publicKey,
          privateKey,
        };
      });
      Promise.all(accountsData).then((data) => {
        const exportedKeys = data.filter((item) => item.accounts !== null);
        // Remove duplicated public keys from the exportedKeys
        const seenPublicKeys = new Set();
        const uniqueExportedKeys = [];
        for (const item of exportedKeys) {
          if (!seenPublicKeys.has(item.publicKey)) {
            seenPublicKeys.add(item.publicKey);
            uniqueExportedKeys.push(item);
          }
        }

        if (exportMode.mode === "pdf") {
          createPdf(
            uniqueExportedKeys,
            `${pdfFileName}.pdf`,
            exportConfig.password,
            exportConfig.showPrivateKey
          );
        }

        if (exportConfig.mode === "txt") {
          const txtContent = uniqueExportedKeys.map((item) => {
            return `${JSON.stringify(item)}\n`;
          });
          createTxtFile(txtContent.join(""), `${pdfFileName}.txt`);
        }

        if (exportConfig.mode === "json") {
          createTxtFile(
            JSON.stringify(uniqueExportedKeys, null, 2),
            `${pdfFileName}.json`
          );
        }

        CliUx.ux.action.stop(green(`Done`));
        CliUx.ux.log(
          green(
            `Exported ${
              uniqueExportedKeys.length
            } keys to ${process.cwd()}/${pdfFileName}.${exportMode.mode}`
          )
        );
      });
    }
  }
}
