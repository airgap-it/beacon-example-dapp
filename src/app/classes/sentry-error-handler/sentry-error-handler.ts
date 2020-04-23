import { ErrorHandler, Injectable } from '@angular/core'
import { captureException, configureScope, Event, init, Scope, withScope } from '@sentry/browser'

init({
  dsn: 'https://bce0d14340384d60823b5ed9494b6d7d@sentry.papers.tech/172',
  release: 'unknown'
})

export enum ErrorCategory {
  UNKNOWN = 'unknown'
}

const ERROR_CATEGORY: string = 'error-category'

const handleErrorSentry: (category?: ErrorCategory) => (error: any) => void = (
  category: ErrorCategory = ErrorCategory.UNKNOWN
): ((error: any) => void) => {
  return (error: any): void => {
    try {
      withScope((scope: Scope) => {
        scope.setTag(ERROR_CATEGORY, category)
        const eventId: string = captureException(error.originalError || error)
        // tslint:disable-next-line
        console.debug(`[sentry](${category}) - ${eventId}`)
      })
    } catch (sentryReportingError) {
      // tslint:disable-next-line
      console.debug('Error reporting exception to sentry: ', sentryReportingError)
    }
  }
}

const handleErrorIgnore: (error: any) => void = (error: any): void => {
  // tslint:disable
  console.debug('[Sentry]: not sending to sentry')
  console.debug(error.originalError || error)
  // tslint:enable
}

const setSentryRelease: (release: string) => void = (release: string): void => {
  configureScope((scope: Scope) => {
    scope.addEventProcessor(async (event: Event) => {
      event.release = release

      return event
    })
  })
}

const setSentryUser: (UUID: string) => void = (UUID: string): void => {
  configureScope((scope: Scope) => {
    scope.setUser({ id: UUID })
  })
}

export { setSentryRelease, setSentryUser, handleErrorIgnore, handleErrorSentry }

@Injectable()
export class SentryErrorHandler extends ErrorHandler {
  public handleError(error: any): void {
    super.handleError(error)
    handleErrorSentry()(error)
  }
}
