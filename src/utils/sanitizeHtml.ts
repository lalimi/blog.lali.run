import DOMPurify from 'dompurify';

/**
 * Санітизує HTML-контент для безпечного відображення
 * Видаляє потенційно небезпечні елементи та атрибути
 */
export function sanitizeHtml(html: string): string {
    if (typeof window === 'undefined') {
        // На сервері повертаємо порожній рядок або використовуємо isomorphic-dompurify
        return '';
    }

    // Налаштування DOMPurify
    const config = {
        // Дозволені теги
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'hr',
            'ul', 'ol', 'li',
            'a', 'strong', 'em', 'u', 's', 'code', 'pre',
            'blockquote', 'img',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'div', 'span',
        ],
        // Дозволені атрибути
        ALLOWED_ATTR: [
            'href', 'title', 'alt', 'src',
            'class', 'id',
            'width', 'height',
            'target', 'rel',
        ],
        // Дозволені протоколи для посилань
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        // Додаткові налаштування безпеки
        KEEP_CONTENT: true,
        RETURN_DOM: false,
        RETURN_DOM_FRAGMENT: false,
        RETURN_TRUSTED_TYPE: false,
        FORCE_BODY: false,
        SANITIZE_DOM: true,
        // Видалити всі data-* атрибути окрім безпечних
        ALLOW_DATA_ATTR: false,
    };

    // Додаткові хуки для посилань
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
        // Додати rel="noopener noreferrer" до зовнішніх посилань
        if (node.tagName === 'A') {
            const href = node.getAttribute('href');
            if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                node.setAttribute('target', '_blank');
                node.setAttribute('rel', 'noopener noreferrer');
            }
        }
    });

    return DOMPurify.sanitize(html, config);
}

/**
 * Перевіряє, чи містить HTML потенційно небезпечний контент
 */
export function containsMaliciousContent(html: string): boolean {
    const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i, // onclick, onerror, etc.
        /<iframe/i,
        /<object/i,
        /<embed/i,
        /<applet/i,
        /<meta/i,
        /<link/i,
        /<style/i,
    ];

    return dangerousPatterns.some(pattern => pattern.test(html));
}
