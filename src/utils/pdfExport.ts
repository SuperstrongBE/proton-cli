import pdfMake from "pdfmake";
import fs from "fs";
import path from "path";
import { ExportAccountType } from "../commands/key/export";
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";

const fonts = {
  Roboto: {
    normal: path.join(__dirname, "../fixtures/fonts/roboto-regular.ttf"),
    // bold, italics, bolditalics can be added if you have those files
  },
};

export function createPdf(
  accounts: ExportAccountType[],
  fileName: string,
  password?: string,
  showPrivateKey?: boolean
) {
  const PdfPrinter = new pdfMake(fonts);
  const docDefinition: TDocumentDefinitions = {
    version: "1.7ext3",
    pageSize: "A5",
    content: [
      ...(accounts.map((account, index) =>
        exportAccount(account, showPrivateKey, index < accounts.length - 1)
      ) as Content[]),
    ],
    styles: {
      fieldHeader: {
        fontSize: 10,
        color: "#737373",
      },
      warning: {
        fontSize: 10,
        color: "#FF0000",
      },
      fieldValue: {
        fontSize: 12,
      },
      waLabel: {
        alignment: "center" as const,
        background: "black",
        color: "#FFFFFF",
      },
    },
  };

  if (password) {
    docDefinition.userPassword = password;
    docDefinition.ownerPassword = password;
    docDefinition.permissions = {
      modifying: false,
      copying: false,
      annotating: false,
    };
  }

  const pdf = PdfPrinter.createPdfKitDocument(docDefinition);
  pdf.pipe(fs.createWriteStream(fileName));
  pdf.end();
}

function exportAccount(
  account: ExportAccountType,
  showPrivateKey?: boolean,
  breakPage?: boolean
): Content {
  const definition = {
    pageBreak: breakPage ? "after" : undefined,

    table: {
      widths: ["100%"],
      body: [
        [
          {
            text: "This following documents contains highly sensitive informations, make sure to store it securely. If you print it, store it into a secure vault and delete the file.",
            style: "warning",
          },
        ],
        [
          [
            { text: "Chain", style: "fieldHeader" },
            { text: account.chain, style: "filedValue" },
          ],
        ],
        [
          [
            {
              qr: account.privateKey,
              fit: 200,
              margin: [70, 20, 40, 20],
            },
            {
              margin: [40, 0, 40, 40],
              table: {
                widths: ["100%"],

                body: [
                  [
                    {
                      text: "Scan with webauth in Import > Private Key",
                      style: "waLabel",
                    },
                  ],
                ],
              },
              layout: {
                fillColor: "#000000",
              },
            },
          ],
        ],
        [
          [
            { text: "Accounts", style: "fieldHeader" },
            { text: account.accounts?.join(", "), style: "filedValue" },
          ],
        ],
        [
          [
            { text: "Public key", style: "fieldHeader" },
            { text: account.publicKey, style: "filedValue" },
          ],
        ],
      ],
    },
  };
  if (showPrivateKey) {
    definition.table.body.push([
      [
        { text: "Private key", style: "fieldHeader" },
        { text: account.privateKey, style: "filedValue" },
      ],
    ]);
  }
  return definition as Content;
}
