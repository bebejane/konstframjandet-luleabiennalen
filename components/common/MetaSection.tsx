import s from './MetaSection.module.scss'
import { isEmail } from '/lib/utils'

export type Props = {
  items: {
    title: string
    value: string
  }[]
}

export default function MetaSection({ items = [] }: Props) {

  return (
    <section className={s.meta}>
      <ul className="small">
        {items.filter(({ value, title }) => value && title).map(({ title, value }, idx) =>
          <li key={idx}>
            {title}: {isEmail(value) ? <a href={`mailto:${value}`}>E-post</a> : <>{value}</>}
          </li>
        )}
      </ul>
    </section>
  )
}
