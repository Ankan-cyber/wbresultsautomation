const puppeteer = require('puppeteer');
const fs = require('fs');

async function getWBHS2023Result(rno, roll) {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
    });

    // Rest of your code...
    const page = await browser.newPage();

    // Perform actions with Puppeteer
    await page.goto('https://wbresults.nic.in/highersecondary202324052023/wbhsres23.htm');

    // Wait for the form elements to be available
    await page.waitForSelector('#CaptchaDiv');
    await page.waitForSelector('#CaptchaInput');

    async function getCapctha() {
        const captchaText = await page.evaluate(() => {
            const captchaDiv = document.getElementById('CaptchaDiv');
            return captchaDiv.textContent.trim();
        });
        return captchaText
    }

    const captchaText = await getCapctha()

    async function fillFormAndSubmit(captchaText, rno, roll) {
        // Fill the form fields
        await page.$eval('input[name="roll"]', (element, text) => element.value = text, roll);
        await page.$eval('input[name="rno"]', (element, text) => element.value = text, rno);
        await page.$eval('input[name="CaptchaInput"]', (element, text) => element.value = text, captchaText);

        // Submit the form
        await page.$eval('input[name="B1"]', (element) => element.click());
    }
    await fillFormAndSubmit(captchaText, rno, roll);

    // Wait for navigation to complete
    await page.waitForNavigation();
    const result = await page.evaluate(() => {
        return document.body.innerHTML;
    });

    await browser.close();
    return result;
}

async function saveResultAsFile(rollNo, htmlContent) {
    const fileName = './results/' + rollNo + '.html';

    // Create a new file and write the HTML content to it
    fs.writeFile(fileName, htmlContent, (err) => {
        if (err) {
            console.error('Error saving file:', err);
        } else {
            console.log('File saved successfully:', fileName);
        }
    });
}

async function run() {
    //get the roll
    let roll = 442221;

    //change the i value for the range of of no.
    for (let i = 1122; i < 1180; i++) {
        const result = await getWBHS2023Result(i, roll);
        saveResultAsFile(i, result)
    }
}

run()