const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

// Function to read a JSON file and return its content
function readJsonFile(filePath) {
	try {
		return jsonfile.readFileSync(filePath);
	} catch (error) {
		console.error(`Error reading JSON file ${filePath}:`, error);
		return null;
	}
}

function generateCoverageMarkdown(coverageData) {
	let markdown = `# Client Code Coverage\n\n`;

	Object.entries(coverageData).forEach(([project, files]) => {
		markdown += `## ${project.split('-coverage')[0]}\n\n`;
		markdown +=
			'| File                        | Statements Completed | Branches Completed | Functions Completed | Lines Completed |\n';
		markdown +=
			'|-----------------------------|-----------------------|--------------------|----------------------|------------------|\n';

		Object.entries(files).forEach(([file, metrics]) => {
			markdown += `| ${file.padEnd(28)} | ${metrics.statements.completed.padEnd(
				21
			)} | ${metrics.branches.completed.padEnd(18)} | ${metrics.functions.completed.padEnd(
				22
			)} | ${metrics.lines.completed.padEnd(16)} |\n`;
			markdown += `|                             | ${metrics.statements.covered} | ${metrics.branches.covered} | ${metrics.functions.covered} | ${metrics.lines.covered} |\n`;
			markdown +=
				'|                             |                       |                    |                      |                  |\n';
		});

		markdown += '\n';
	});

	return markdown;
}

// Function to consolidate JSON files in a folder
function consolidateJsonFiles(folderPath, outputFile) {
	try {
		// Get a list of all files in the folder
		const files = fs.readdirSync(folderPath);

		// Filter out non-JSON files
		const jsonFiles = files.filter((file) => path.extname(file) === '.json');

		// Create an array to store JSON objects
		const jsonObjects = [];

		// Read each JSON file and add its content to the array
		jsonFiles.forEach((file) => {
			const filePath = path.join(folderPath, file);
			const jsonObject = readJsonFile(filePath);

			if (jsonObject) {
				jsonObjects.push({ name: file, data: jsonObject });
			}
		});

		// Write the consolidated JSON object to the output file
		const outputPath = path.join(folderPath, outputFile);

		const coverageJSON = jsonObjects.reduce((acc, project) => {
			Object.values(project.data).forEach((item) => {
				const data = convert(item);
				const fileName = `${item.path}`.split('/').at(-1).toString();
				acc[project.name] = { ...acc[project.name], [fileName]: data };
			});
			return acc;
		}, {});

		jsonfile.writeFileSync(outputPath, coverageJSON, { spaces: 2 });

		fs.writeFileSync(outputPath.replace('json', 'md'), generateCoverageMarkdown(coverageJSON));

		console.log(`Consolidation successful. Output written to ${outputPath}`);
	} catch (error) {
		console.error('Error consolidating JSON files:', error);
	}
}

consolidateJsonFiles('../../coverage', '../../clinet-coverage.json');

function convertToResult(percentage, category, covered, total) {
	const formatPercentage = (percentage) => `${percentage.toFixed(2)}%`;

	return {
		completed: formatPercentage(percentage),
		category,
		covered: `${covered}/${total}`,
	};
}

function convert(coverageData) {
	const calculatePercentage = (covered, total) => (total === 0 ? 100 : (covered / total) * 100);

	const statementsTotal = Object.keys(coverageData.statementMap).length;
	const branchesTotal = Object.keys(coverageData.branchMap).length;
	const functionsTotal = Object.keys(coverageData.fnMap).length;
	const linesTotal = Object.keys(coverageData.statementMap).reduce((total, key) => {
		const statement = coverageData.statementMap[key];
		return total + (statement.end.line - statement.start.line + 1);
	}, 0);

	const statementsCovered = Object.values(coverageData.s).reduce((total, value) => total + value, 0);
	const branchesCovered = Object.values(coverageData.b).reduce((total, arr) => total + arr.length, 0);
	const functionsCovered = Object.values(coverageData.f).reduce((total, value) => total + value, 0);
	const linesCovered = statementsCovered;

	const statementPercentage = calculatePercentage(statementsCovered, statementsTotal);
	const branchPercentage = calculatePercentage(branchesCovered, branchesTotal);
	const functionPercentage = calculatePercentage(functionsCovered, functionsTotal);
	const linePercentage = calculatePercentage(linesCovered, linesTotal);

	const statementsResult = convertToResult(statementPercentage, 'Statements', statementsCovered, statementsTotal);
	const branchesResult = convertToResult(branchPercentage, 'Branches', branchesCovered, branchesTotal);
	const functionsResult = convertToResult(functionPercentage, 'Functions', functionsCovered, functionsTotal);
	const linesResult = convertToResult(linePercentage, 'Lines', linesCovered, linesTotal);

	return { statements: statementsResult, branches: branchesResult, functions: functionsResult, lines: linesResult };
}
