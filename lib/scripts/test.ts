import 'dotenv/config';
import { buildMenu } from '@/lib/menu2';

(async () => {
	const menu = await buildMenu('en' as SiteLocale);
	console.log(menu);
})();
