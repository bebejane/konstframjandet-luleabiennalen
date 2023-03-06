require("dotenv").config({ path: "./.env" });
const fs = require("fs");
const { buildClient } = require("@datocms/cma-client-node");

(async () => {
	const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN });
	const years = (
		await client.items.list({
			filter: { type: "year" },
			order_by: "title_DESC",
		})
	).map(({ id, title, background_color: backgroundColor }) => ({ id, title, backgroundColor }));

	if (!years.length) throw new Error("No years found!");
	fs.writeFileSync("./lib/years.json", JSON.stringify(years, null, 2));
	console.log(`generated years.json (${years.length})`);
})();
