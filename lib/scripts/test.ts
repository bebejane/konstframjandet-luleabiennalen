import 'dotenv/config';
import { getSection } from '@/lib/context/year';

(async () => {
	console.log(getSection('/en/exhibitions', 'en'));
	console.log(getSection('/en/2022/exhibitions', 'en'));
	console.log(getSection('/2022/exhibitions', 'sv'));
	console.log(getSection('/2022/exhibitions', 'en'));
	console.log(getSection('/2022/exhibitions/slug', 'sv'));
	console.log(getSection('/sv/utstallningar/slug', 'sv'));
	console.log(getSection('/2023/utstallningar/slug', 'sv'));
})();
