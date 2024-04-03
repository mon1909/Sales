const readline = require('readline');

const SALES_TARGET = 10000;

function inputMonthlySales() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let salesData = [];
    return new Promise(resolve => {
        let day = 1;
        function askSales() {
            rl.question(`Enter sales amount for day ${day}: `, (sales) => {
                sales = Float(sales);
                if (isNaN(sales)) {
                    console.log("Invalid input. Please enter a valid sales amount.");
                    askSales();
                } else {
                    salesData.push(sales);
                    day++;
                    if (day <= 30) {
                        askSales();
                    } else {
                        rl.close();
                        resolve(salesData);
                    }
                }
            });
        }
        askSales();
    });
}

// Function to calculate total sales for the month
function calculateTotalSales(salesData) {
    let totalSales = 0;
    for (let sale of salesData) {
        totalSales += sale;
    }
    return totalSales;
}

async function evaluateSalesPerformance() {
    let salesData = await inputMonthlySales();
    let totalSales = calculateTotalSales(salesData);
    console.log(`Total sales for the month: $${totalSales.toFixed(2)}`);

    if (totalSales < SALES_TARGET) {
        console.log("Total sales did not meet the target.");
        let additionalSales = parseFloat(await new Promise(resolve => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question("Enter additional sales for the remaining days: ", (sales) => {
                rl.close();
                resolve(sales);
            });
        }));
        additionalSales = parseFloat(additionalSales);
        if (isNaN(additionalSales)) {
            console.log("Invalid input. Additional sales must be a number.");
            return;
        }
        totalSales += additionalSales;
    }

    console.log(`Congratulations! Sales target met. Total sales for the month: $${totalSales.toFixed(2)}`);
}

evaluateSalesPerformance();
