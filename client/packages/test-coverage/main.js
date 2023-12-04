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

	markdown += `## Coverage Summary \n`;

	markdown = crateSummaryCoverage(coverageData, markdown);

	Object.entries(coverageData).forEach(([project, files]) => {
		markdown += `## ${project.split('.')[0]}\n\n`;
		markdown += '| File | Statements | Branches | Functions | Lines |\n';
		markdown += '|-|-|-|-|-|\n';

		Object.entries(files).forEach(([file, metrics]) => {
			markdown += `| ${file} | ${metrics.statements.completed} | ${metrics.branches.completed} | ${metrics.functions.completed} | ${metrics.lines.completed} |\n`;
			markdown += `| | ${metrics.statements.covered} | ${metrics.branches.covered} | ${metrics.functions.covered} | ${metrics.lines.covered} |\n`;
			markdown += '| | | | | |\n';
		});

		markdown += '\n';
	});

	return markdown;
}

function crateSummaryCoverage(coverageData, markdown) {
	const data = Object.values(coverageData).reduce(
		(acc, files) => {
			Object.values(files).forEach((file) => {
				acc.statements.covered += file.statements.data.covered;
				acc.statements.total += file.statements.data.total;
				acc.branches.covered += file.branches.data.covered;
				acc.branches.total += file.branches.data.total;
				acc.functions.covered += file.functions.data.covered;
				acc.functions.total += file.functions.data.total;
				acc.lines.covered += file.lines.data.covered;
				acc.lines.total += file.lines.data.total;
			});
			return acc;
		},
		{
			statements: { covered: 0, total: 0 },
			branches: { covered: 0, total: 0 },
			functions: { covered: 0, total: 0 },
			lines: { covered: 0, total: 0 },
		}
	);

	const statements = calculatePercentage(data.statements.covered, data.statements.total);
	const branches = calculatePercentage(data.branches.covered, data.branches.total);
	const functions = calculatePercentage(data.functions.covered, data.functions.total);
	const lines = calculatePercentage(data.lines.covered, data.lines.total);

	markdown += '| Statements | Branches | Functions | Lines |\n';
	markdown += '|-|-|-|-|\n';
	markdown += `|${formatPercentage(statements)} | ${formatPercentage(branches)} | ${formatPercentage(
		functions
	)} | ${formatPercentage(lines)} |\n`;
	markdown += `|${data.statements.covered}/${data.statements.total}| ${data.branches.covered}/${data.branches.total} | ${data.functions.covered}/${data.functions.total} | ${data.lines.covered}/${data.lines.total} |\n`;
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

function formatPercentage(percentage) {
	return `${percentage.toFixed(0)}%`;
}

function convertToResult(percentage, category, covered, total) {
	return {
		completed: formatPercentage(percentage),
		category,
		covered: `${covered}/${total}`,
		data: {
			percentage,
			covered,
			total,
		},
	};
}

function calculatePercentage(covered, total) {
	return total === 0 ? 100 : (covered / total) * 100;
}

function convert(coverageData) {
	const statementsTotal = Object.keys(coverageData.statementMap).length;
	const branchesTotal = Object.keys(coverageData.branchMap).length;
	const functionsTotal = Object.keys(coverageData.fnMap).length;
	const linesTotal = Object.keys(coverageData.statementMap).reduce((total, key) => {
		const statement = coverageData.statementMap[key];
		return total + (statement.end.line - statement.start.line + 1);
	}, 0);

	const statementsCovered = Object.values(coverageData.s).reduce((total, value) => total + (value > 0 ? 1 : 0), 0);
	const branchesCovered = Object.values(coverageData.b).reduce((total, arr) => total + (arr[0] > 0 ? 1 : 0), 0);
	const functionsCovered = Object.values(coverageData.f).reduce((total, value) => total + (value > 0 ? 1 : 0), 0);
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
