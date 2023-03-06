import years from '/lib/years.json'
import { apiQuery, SEOQuery } from "dato-nextjs-utils/api";
import { GetStaticProps, GetServerSideProps, GetStaticPropsContext } from 'next'
import { FooterDocument } from "/graphql";
import type { TypedDocumentNode } from "@apollo/client/core/types.js";
import { buildMenu } from "/lib/menu";

export default function withGlobalProps(opt: any, callback: Function): GetStaticProps | GetServerSideProps {

  const revalidate: number = parseInt(process.env.REVALIDATE_TIME)
  const queries: TypedDocumentNode[] = [FooterDocument]

  if (opt.query)
    queries.push(opt.query)
  if (opt.queries)
    queries.push.apply(queries, opt.queries)
  if (opt.seo)
    queries.push(SEOQuery(opt.seo))

  return async (context: GetStaticPropsContext) => {

    const variables = queries.map(el => ({ locale: context.locale }))
    const props = await apiQuery(queries, { preview: context.preview, variables });

    props.menu = await buildMenu(context.locale)
    props.locale = context.locale
    props.messages = (await import(`./messages/${context.locale}.json`)).default
    props.year = years.find(({ title }) => context.params?.year ? title === context.params?.year : title === process.env.NEXT_PUBLIC_CURRENT_YEAR) || null

    if (callback)
      return await callback({ context, props: { ...props }, revalidate });
    else
      return { props: { ...props }, context, revalidate };
  }
}