import { NextRequest, NextResponse } from "next/server";
import Exa from "exa-js";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    const { query } = await req.json();

    const exaApiKey = process.env.EXA_API_KEY!;
    const exaPromptQuery = process.env.EXA_PROMPT_QUERY!;

    const exa = new Exa(exaApiKey);
    const results = await exa.searchAndContents(
        query,
        {
            text: {
                maxCharacters: 250,
            },
            summary: {
                query: exaPromptQuery,
            },
            extras: {
                links: 1,
            },
            numResults: 5,
            includeDomains: ["https://react.dev", "https://developer.mozilla.org", "https://tailwindcss.com/"]
        }
    );

    const data = results.results;

    //Writing result to debug formatting 
    const filePath = path.resolve(process.cwd(), "exa-log.json");
    fs.writeFileSync(filePath, JSON.stringify(results.results, null, 2));

    return NextResponse.json(data);
}
