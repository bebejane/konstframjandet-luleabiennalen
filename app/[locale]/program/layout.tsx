import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default async function ProgramLayout({ children }: LayoutProps<'/[locale]/program'>) {
	return <NuqsAdapter>{children}</NuqsAdapter>;
}
