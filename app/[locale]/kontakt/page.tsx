import { Article } from "@/components";
import { ContactDocument } from "@/graphql";
import { locales } from "@/i18n/routing";
import { apiQuery } from "next-dato-utils/api";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export type Props = {
  contact: ContactQuery['contact']
}

export default async function Contact({params }: PageProps<'/[locale]/kontakt'>) {
  const { locale } = await params
  if (!locales.includes(locale as any)) return notFound();
	setRequestLocale(locale);
  
  const { contact } = await apiQuery(ContactDocument, { variables: { locale: locale as SiteLocale } })
  if(!contact) return notFound()
  const { id, title, image, intro, content, _seoMetaTags } = contact
  return (
    
      <Article
        id={id}
        key={id}
        title={title}
        image={image as FileField}
        intro={intro}
        imageSize="small"
        content={content}
      />
  );
}

// export const getStaticProps = withGlobalProps({ queries: [] }, async ({ props, revalidate, context }: any) => {
//   const { contact } = await apiQuery(ContactDocument, { variables: { locale } })

//   return {
//     props: {
//       ...props,
//       contact,
//       page: {
//         section: 'contact',
//         slugs: pageSlugs('contact')
//       } as PageProps
//     },
//     revalidate
//   };
// });