import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllProgramsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail, SectionHeader } from "/components";
export type Props = {
  programs: ProgramRecord[]
}

export default function Program({ programs }: Props) {

  return (
    <>
      <SectionHeader>LB22 — Om</SectionHeader>
      <div className={s.line}></div>

      <CardContainer>
        {programs.map(({ id, image, title, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={title}
              image={image}
              slug={`/program/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
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