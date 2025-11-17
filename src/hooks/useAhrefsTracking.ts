import { useCallback } from 'react';

/**
 * Хук для відстеження подій через Ahrefs Analytics
 * Дозволяє відправляти кастомні події з пропсами
 */
export const useAhrefsTracking = () => {
  const trackEvent = useCallback((eventName: string, props?: Record<string, any>) => {
    if (window.AhrefsAnalytics) {
      window.AhrefsAnalytics.sendEvent(eventName, props);
    }
  }, []);

  /**
   * Відстеження кліку на посилання
   */
  const trackLinkClick = useCallback((href: string, text?: string) => {
    trackEvent('link_click', {
      href,
      text,
      timestamp: new Date().toISOString()
    });
  }, [trackEvent]);

  /**
   * Відстеження перегляду сторінки
   */
  const trackPageView = useCallback((path: string, title?: string) => {
    trackEvent('pageview', {
      path,
      title,
      timestamp: new Date().toISOString()
    });
  }, [trackEvent]);

  /**
   * Відстеження взаємодії з формою
   */
  const trackFormInteraction = useCallback((formName: string, action: string, data?: any) => {
    trackEvent('form_interaction', {
      form_name: formName,
      action,
      data,
      timestamp: new Date().toISOString()
    });
  }, [trackEvent]);

  /**
   * Відстеження SEO подій
   */
  const trackSEOEvent = useCallback((eventType: string, data?: any) => {
    trackEvent('seo_event', {
      event_type: eventType,
      data,
      timestamp: new Date().toISOString()
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackLinkClick,
    trackPageView,
    trackFormInteraction,
    trackSEOEvent
  };
};