import { apiQuery, SEOQuery } from "dato-nextjs-utils/api";
import { GetStaticProps, GetServerSideProps, GetStaticPropsContext } from 'next'
import { GlobalDocument, FooterDocument } from "/graphql";
import type { TypedDocumentNode } from "@apollo/client/core/types.js";
import { buildMenu } from "/lib/menu";
import { allYears } from "/lib/utils";

export default function withGlobalProps(opt: any, callback: Function): GetStaticProps | GetServerSideProps {

  const revalidate: number = parseInt(process.env.REVALIDATE_TIME)
  const queries: TypedDocumentNode[] = [GlobalDocument, FooterDocument]

  if (opt.query)
    queries.push(opt.query)
  if (opt.queries)
    queries.push.apply(queries, opt.queries)
  if (opt.seo)
    queries.push(SEOQuery(opt.seo))

  return async (context: GetStaticPropsContext) => {

    const years = await allYears()
    const year = years.find(({ title }) => context.params?.year ? title === context.params?.year : title === years[0].title)

    if (!year) {
      return { notFound: true };
    }

    year.isArchive = year.title !== years[0].title

    const variables = queries.map(el => ({ locale: context.locale, yearId: year.id }))
    const props = await apiQuery(queries, { preview: context.preview, variables });

    props.menu = await buildMenu(context.locale)
    props.locale = context.locale
    props.messages = (await import(`./i18n/${context.locale}.json`)).default
    props.year = year;

    if (callback)
      return await callback({ context, props: { ...props }, revalidate });
    else
      return { props: { ...props }, context, revalidate };
  }
}