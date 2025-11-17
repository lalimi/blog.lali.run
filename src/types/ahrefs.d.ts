export interface AhrefsAnalyticsEvent {
  sendEvent: (eventName: string, props?: Record<string, any>) => void;
}

declare global {
  interface Window {
    AhrefsAnalytics?: AhrefsAnalyticsEvent;
  }
}