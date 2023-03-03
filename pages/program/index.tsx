import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllProgramsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import format from "date-fns/format";
import { formatDate } from "/lib/utils";

export type Props = {
  programs: ProgramRecord[]
}

export default function Program({ programs }: Props) {

  return (

    <CardContainer>
      {programs.map(({ id, image, title, intro, slug, startDate, endDate, programCategory }) =>
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

  );
}

export const getStaticProps = withGlobalProps({ queries: [AllProgramsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props
    },
    revalidate
  };
});