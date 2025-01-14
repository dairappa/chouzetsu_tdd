import axios from "axios";

async function fetchScrapboxPage(projectName: string, pageTitle: string) {
	try {
		const response = await axios.get(
			`https://scrapbox.io/api/pages/${projectName}/${pageTitle}`,
		);
		return response.data;
	} catch (error) {
		console.error(
			`Failed to fetch page "${pageTitle}" from project "${projectName}":`,
			error,
		);
		return null;
	}
}

async function analyzeScrapboxPage(projectName: string, pageTitle: string) {
	const pageData = await fetchScrapboxPage(projectName, pageTitle);
	if (pageData) {
		console.log(`Analyzing page "${pageTitle}" from project "${projectName}":`);
		const lineCount = pageData.lines.length;
		console.log(`Number of lines: ${lineCount}`);
	}
}

const args = process.argv.slice(2);
const projectName = args[0];
const pageTitle = args[1];

if (!projectName || !pageTitle) {
	console.error("Usage: ts-node scanner.ts <projectName> <pageTitle>");
	process.exit(1);
}

analyzeScrapboxPage(projectName, pageTitle);
