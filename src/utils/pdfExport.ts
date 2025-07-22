import pdfMake from "pdfmake";
import fs from "fs";
import path from "path";
import { ExportAccountType } from "../commands/key/export";
const longText =
  "The amount of data that can be stored in the QR code symbol depends on the datatype (mode, or input character set), version (1, …, 40, indicating the overall dimensions of the symbol), and error correction level. The maximum storage capacities occur for 40-L symbols (version 40, error correction level L):";

const fonts = {
  Roboto: {
    normal: path.join(__dirname, "../fixtures/fonts/roboto-regular.ttf"),
    // bold, italics, bolditalics can be added if you have those files
  },
};

export function createPdf(accounts: ExportAccountType[], fileName: string) {
  const PdfPrinter = new pdfMake(fonts);
  const docDefinition = {
    pageSize: "A5",
    content: accounts.map((account) => exportAccount(account)),
    styles: {
      fieldHeader: {
        fontSize: 10,

        color: "#737373",
      },
      fieldValue: {
        fontSize: 16,
      },
      waLabel: {
        align: "center",
        background: "black",
        color: "#FFFFFF",
      },
    },
  };

  const pdf = PdfPrinter.createPdfKitDocument(docDefinition);
  pdf.pipe(fs.createWriteStream(fileName));
  pdf.end();
}

function exportAccount(account: ExportAccountType) {
  return {
    pageBreak: "after",
    table: {
      widths: ["100%"],
      body: [
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
              fit: 260,
              margin: [40, 40, 40, 20],
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
}
