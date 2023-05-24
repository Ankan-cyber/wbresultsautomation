# WBResults Automation Tool

The WBResults Automation Tool is a script that automates the process of retrieving result data in bulk from the wbresults.nic.in website. It uses Puppeteer, a Node.js library, to navigate the website, fill the form, and extract the result data.

## Prerequisites

Before running the automation tool, make sure you have the following installed on your system:

- Node.js: Download and Install Node.js

## Getting Started

1. Clone this repository to your local machine or download the source code.

2. Install the project dependencies by running the following command in the project root directory:
```
npm install
```
3. Update the `rollNumbers` array in the `index.js` file with the roll numbers for which you want to retrieve the result data.

4. Run the automation script using the following command:
```
node index.js
```

The script will launch a headless browser, navigate to the wbresults.nic.in website, fill the form with each roll number, and save the result page HTML for each roll number in separate files.

5. Check the output directory for the saved result files. Each file will be named after the corresponding roll number.

## Customization

- If you want to modify the script's behavior or add additional functionality, you can edit the `index.js` file according to your requirements.

- You can customize the output directory by updating the `outputDirectory` variable in the `index.js` file.

## Troubleshooting

- If you encounter any issues or errors while running the automation tool, please check the troubleshooting guide provided by Puppeteer.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

