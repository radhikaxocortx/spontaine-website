import type { StackArtworkKind } from './SectionCardStackArtworkV3'

export interface StackCardData {
  readonly label: string
  readonly title: string
  readonly description: readonly string[]
  readonly artwork: StackArtworkKind
  readonly titleTone?: 'default' | 'green'
}

export const stackCards: StackCardData[] = [
  {
    label: 'Connectors',
    title: 'Connect any source, from anywhere.',
    description: [
      'Spontaine plugs into your data systems in-place, and runs automatically so your processes are untouched. Nothing to replace, nothing to reconfigure.',
      "And unlike enterprise vendors, you're not locked in to any one stack or limited by a set of supported connectors.",
    ],
    artwork: 'connectors',
  },
  {
    label: 'Meaning',
    title: 'Knows your business, not just your data',
    description: [
      "Spontaine doesn't just know what a number means. It knows what it means for you - your org structure, how you operate, what you're actually trying to achieve. That context shapes the answer, not just the definition behind it.",
      "Ask a nuanced question, get an answer built to be acted on, with the logical next question already suggested. Insight doesn't dead-end at the first answer.",
    ],
    artwork: 'meaning',
  },
  {
    label: 'Answers',
    title: "Answers built for who's asking",
    description: [
      'A partner and an associate ask "what\'s our margin on this account," and each gets exactly what they are looking for.',
      "Context isn't just what's being asked. It's also who's asking.",
      'Every answer carries its own reasoning and traces straight back to the source data behind it.',
    ],
    artwork: 'answers',
    titleTone: 'green',
  },
  {
    label: 'Persistence',
    title: 'Generated once and staying alive.',
    description: [
      "A Persistent Block isn't a frozen snapshot - generated once, pulls data and stays interactive forever. Filter it, drill into it, explore it independently, without asking the AI again.",
      'AI inference runs down toward the minimum as use expands.',
    ],
    artwork: 'persistence',
    titleTone: 'green',
  },
  {
    label: 'Safety',
    title: 'Safe by architecture, not by policy.',
    description: [
      'AI never sees your raw data. Only its shape. Anything sensitive - names, IDs - gets pseudonymised before the model sees it, and the AI has no ability to submit queries to your database directly.',
      'Every answer traces back to what produced it. Safe to run at scale, not just safe in a demo.',
    ],
    artwork: 'safety',
  },
  {
    label: 'New IP',
    title: 'Your platform. Your IP. Your revenue.',
    description: [
      'Codified skills and persistent endpoints remove the real barrier to productising a service line: the build cost.',
      "Connected workflows and automated actions get easier to assemble, and each one keeps uncovering value long after it's built.",
      "Spontaine's core runs inside your perimeter. Everything built on top of it is yours - new IP, not a vendor's feature you're renting.",
    ],
    artwork: 'new-ip',
    titleTone: 'green',
  },
]

export const trustChips = ['Pseudonymised', 'Traceable', 'In-place', 'Yours']

export const STACK_CARD_COUNT = stackCards.length

export const getCardProgress = (progress: number, index: number) => {
  const current = progress * (STACK_CARD_COUNT - 1)

  return current - index
}
