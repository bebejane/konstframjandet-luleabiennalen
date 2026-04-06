import 'dotenv/config';
import { client } from '../client';
import { Item, Upload } from '@datocms/cma-client/dist/types/generated/ApiTypes';
import { buildClient } from '@datocms/cma-client';

function formatBytes(bytes: number, decimals = 2) {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

(async () => {
	const environments = await client.environments.list();
	const uploads: Upload[] = [];
	const items: Item[] = [];

	console.log('Environmnets:', environments.length);

	for (const { id: environment } of environments) {
		process.stdout.write(`.`);
		const c = buildClient({
			apiToken: process.env.DATOCMS_API_TOKEN!,
			environment,
		});

		for await (const upload of c.uploads.listPagedIterator()) uploads.push(upload);
		for await (const item of c.items.listPagedIterator()) items.push(item);
	}

	const uploadsSize = uploads.reduce((acc, upload) => acc + upload.size, 0);
	const itemsSize = new TextEncoder().encode(JSON.stringify(items)).length;
	const total = uploadsSize + itemsSize;

	console.log('---------------');
	console.log('Uploads:', formatBytes(uploadsSize), uploads.length);
	console.log('Items:', formatBytes(itemsSize), items.length);
	console.log('Total:', formatBytes(total));
})();
