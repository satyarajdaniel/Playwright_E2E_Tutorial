const {test, expect,request} = require('@playwright/test')
const ExcelJs = require('exceljs');
const path = require('path');
const downloadsPath = path.resolve(__dirname, '..', 'Downloads');

//Since Reading excel is a async work, got wrapped into async function
async function readExcelTest(workSheet, target) {
    let index = { row: -1, col: -1 };

    //Iterating Through each value
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            console.log(cell.value);
            //gets value at particular cell
            if (cell.value === target) {
                //gets cell address
                console.log(cell.address);
                index.row = rowNumber;
                index.col = colNumber;
            }
        });
    });

    return index;
}

async function writeExcelTest(workbookPath, target, replacement, columnChange) {
    //Creating Object
    const workBook = new ExcelJs.Workbook();
    //Reading Excel File
    await workBook.xlsx.readFile(workbookPath);

    //Returning Sheet
    const workSheet = workBook.getWorksheet('Sheet1');

    const index = await readExcelTest(workSheet, target);

    if (index.row === -1 || index.col === -1) {
        console.log('Target not found');
        return;
    }

    //Reading an Excel Cell & manipulating column index as needed
    const appleCell = workSheet.getCell(index.row, index.col+columnChange.colChange);

    console.log('Before Updating Cell', appleCell.value);

    //Setting value for cell
    appleCell.value = replacement;

    await workBook.xlsx.writeFile(workbookPath);

    console.log('After Updating Cell', appleCell.value);
}

//update mango price to target


//test upload download files
test("Test Upload Excel File",async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
        //Downloading File & Setting Path for downloading file
        const [download] = await Promise.all([
           page.waitForEvent('download'),
           page.getByRole("button",{name:'Download'}).click()
        ]);
        
        //Another way to handle until download is complete
        /*
        const downloadEvent = page.waitForEvent('download');
        await page.getByRole("button",{name:'Download'}).click()
        await downloadEvent;
        */

        const fileName = 'download.xlsx';
        const excelFilePath = path.join(downloadsPath,fileName);
        await download.saveAs(excelFilePath);

        //manipulating data as needed
        await writeExcelTest(excelFilePath, 'Mango', 350, {rowChange:0,colChange:2});

        //uploading file
         await page.locator("#fileinput").click()
         //set input files only works, in case of element has input attribute "file"
         await page.locator("#fileinput").setInputFiles(excelFilePath); 


}

)




