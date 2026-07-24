import { cn } from '@/lib/utils'
import React from 'react'

const scriptAttributes = [
  'src',
  'type',
  'async',
  'defer',
  'charset',
  'crossorigin',
  'integrity',
  'referrerpolicy',
] as const

const revealEmbeddedContent = (container: HTMLElement) => {
  container.querySelectorAll('.reveal').forEach((element) => {
    element.classList.add('in')
  })
}

const activateScript = (script: HTMLScriptElement, activatedScripts: HTMLScriptElement[]) => {
  const activatedScript = document.createElement('script')

  scriptAttributes.forEach((attributeName) => {
    const attributeValue = script.getAttribute(attributeName)

    if (attributeValue != null) {
      activatedScript.setAttribute(attributeName, attributeValue)
    }
  })

  if (!script.getAttribute('src')) {
    activatedScript.text = script.textContent ?? ''
  }

  script.replaceWith(activatedScript)
  activatedScripts.push(activatedScript)

  return activatedScript
}

const waitForScriptToSettle = (script: HTMLScriptElement) =>
  new Promise<void>((resolve) => {
    script.onload = () => resolve()
    script.onerror = () => resolve()
  })

const runScriptsInOrder = async (
  scripts: HTMLScriptElement[],
  activatedScripts: HTMLScriptElement[],
  shouldContinue: () => boolean
) => {
  for (const script of scripts) {
    if (!shouldContinue()) {
      return
    }

    const activatedScript = activateScript(script, activatedScripts)
    const hasSource = activatedScript.getAttribute('src') != null
    const isAsync = activatedScript.hasAttribute('async')

    if (hasSource && !isAsync) {
      await waitForScriptToSettle(activatedScript)
    }
  }
}

interface ScriptEmbedDisplayProps {
  className?: string
  data?: string | null
  executeScripts?: boolean
}

const ScriptEmbedDisplay = ({
  className,
  data,
  executeScripts = false,
}: ScriptEmbedDisplayProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!executeScripts || containerRef.current == null) {
      return
    }

    const container = containerRef.current
    let isMounted = true
    const scripts = Array.from(container.querySelectorAll('script'))
    const activatedScripts: HTMLScriptElement[] = []

    void runScriptsInOrder(scripts, activatedScripts, () => isMounted).finally(() => {
      if (isMounted) {
        revealEmbeddedContent(container)
      }
    })

    return () => {
      isMounted = false
      activatedScripts.forEach((script) => script.remove())
    }
  }, [data, executeScripts])

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full max-w-none font-body text-base leading-[1.62] text-spontaine-text-secondary',
        '[&_iframe]:min-h-[320px] [&_iframe]:w-full [&_iframe]:rounded-2xl',
        '[&_img]:max-w-full [&_img]:rounded-2xl',
        '[&_p]:my-4 [&_strong]:font-semibold [&_strong]:text-spontaine-text-primary',
        className
      )}
      dangerouslySetInnerHTML={{ __html: data ?? '' }}
    />
  )
}

export default ScriptEmbedDisplay
