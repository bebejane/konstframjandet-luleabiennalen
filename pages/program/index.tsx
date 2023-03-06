import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllProgramsDocument, AllProgramCategoriesDocument } from "/graphql";
import { CardContainer, Card, Thumbnail, FilterBar } from "/components";
import format from "date-fns/format";
import { formatDate } from "/lib/utils";
import { useState } from "react";
import type { FilterOption } from "/components/common/FilterBar";
import { useRouter } from "next/router";

export type Props = {
  programs: ProgramRecord[]
  programCategories: ProgramCategoryRecord[]
}

export default function Program({ programs, programCategories }: Props) {

  const { asPath } = useRouter()
  const options = programCategories.map(({ id, title: label }) => ({ id, label }))
  const [categories, setCategories] = useState<string[]>([])

  const categoryFilter = ({ programCategory: { id } }: ProgramRecord) => {
    return categories.length === 0 || categories.find((cId) => cId === id)
  }
  return (
    <>
      <FilterBar
        options={options}
        multi={true}
        onChange={(opt) => setCategories(opt as string[])}
      />
      <CardContainer key={`${asPath}${JSON.stringify(categories)}`}>
        {programs.filter(categoryFilter).map(({ id, image, title, intro, slug, startDate, endDate, programCategory }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
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
      ...props
    },
    revalidate
  };
});