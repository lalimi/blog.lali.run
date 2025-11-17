import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { AhrefsAnalyticsEvent } from '../types/ahrefs';

interface AhrefsAnalyticsProps {
  dataKey: string;
}

/**
 * Компонент для інтеграції Ahrefs Analytics в React додаток
 * Використовує офіційний скрипт Ahrefs для відстеження аналітики
 */
const AhrefsAnalytics: React.FC<AhrefsAnalyticsProps> = ({ dataKey }) => {
  const location = useLocation();

  // Функція для відправки подій
  const sendEvent = useCallback((eventName: string, props?: Record<string, any>) => {
    if (window.AhrefsAnalytics) {
      window.AhrefsAnalytics.sendEvent(eventName, props);
    }
  }, []);

  useEffect(() => {
    // Перевіряємо, чи вже додано скрипт
    const existingScript = document.querySelector(`script[data-key="${dataKey}"]`);
    if (existingScript) {
      return;
    }

    // Створюємо новий скрипт
    const script = document.createElement('script');
    script.src = 'https://analytics.ahrefs.com/analytics.js';
    script.async = true;
    script.setAttribute('data-key', dataKey);
    script.setAttribute('data-track-visibility', 'true');
    
    // Додаємо скрипт до head
    document.head.appendChild(script);

    // Відправляємо подію завантаження сторінки
    sendEvent('pageview');

    // Очищення при розмонтуванні
    return () => {
      // Не видаляємо скрипт, оскільки він може бути потрібен на інших сторінках
      // Але можемо додати логіку очистки, якщо потрібно
    };
  }, [dataKey, sendEvent]);

  // Відстежуємо зміни маршрутів
  useEffect(() => {
    sendEvent('pageview');
  }, [location, sendEvent]);

  return null; // Компонент не рендерить нічого в DOM
};

export default AhrefsAnalytics;