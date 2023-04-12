import withGlobalProps from "/lib/withGlobalProps";
import { AllProgramsDocument, AllProgramCategoriesDocument } from "/graphql";
import { CardContainer, Card, Thumbnail, FilterBar } from "/components";
import { formatDate } from "/lib/utils";
import { useState } from "react";
import { useRouter } from "next/router";
import { DatoSEO } from "dato-nextjs-utils/components";
import { useTranslations } from "next-intl";
import { pageSlugs } from "/lib/i18n";

export type Props = {
  programs: ProgramRecord[]
  programCategories: ProgramCategoryRecord[]
}

export default function Program({ programs, programCategories }: Props) {

  const t = useTranslations()
  const { asPath } = useRouter()
  const options = programCategories.map(({ id, title: label, desc }) => ({ id, label, description: desc }))
  const [category, setCategory] = useState<string>()

  const categoryFilter = ({ programCategory: { id } }: ProgramRecord) => {
    return !category || category === id
  }

  const programsSort = (a: ProgramRecord, b: ProgramRecord) => {
    return 1;
  }

  return (
    <>
      <DatoSEO title={t('Menu.program')} />
      <FilterBar
        options={options}
        multi={false}
        onChange={(opt) => setCategory(opt as string)}
      />
      <CardContainer key={`${category}-${asPath}`}>
        {programs.filter(categoryFilter).sort(programsSort).map(({ id, image, title, intro, slug, startDate, endDate, programCategory }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              titleRows={2}
              image={image}
              intro={intro}
              meta={`${formatDate(startDate, endDate)} — ${programCategory.title}`}
              slug={`/program/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllProgramsDocument, AllProgramCategoriesDocument] }, async ({ props, revalidate, context }: any) => {

  return {
    props: {
      ...props,
      page: {
        slugs: pageSlugs('program')
      }
    },
    revalidate
  };
});