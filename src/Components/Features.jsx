import { createElement } from 'react'
import { Clock3, MapPinned, MessagesSquare, Truck } from 'lucide-react'

const proof = [
  [Truck, 'FTL + LTL', 'Flexible freight capacity'],
  [MapPinned, 'BC-wide', 'Connected regional coverage'],
  [Clock3, 'On schedule', 'Pickup windows that work'],
  [MessagesSquare, 'Direct updates', 'Real people, clear answers'],
]

export default function Features() {
  return (
    <section className="proof-band">
      <div className="container proof-grid">
        {proof.map(([Icon, title, copy], index) => (
          <article className="proof-card" key={title}>
            <span className="proof-number">0{index + 1}</span>
            {createElement(Icon, { size: 22 })}
            <div><strong>{title}</strong><span>{copy}</span></div>
          </article>
        ))}
      </div>
    </section>
  )
}
