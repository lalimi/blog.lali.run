import { sanitizeHtml, containsMaliciousContent } from '../src/utils/sanitizeHtml';

describe('sanitizeHtml', () => {
    // Мок для window об'єкта
    beforeAll(() => {
        // @ts-ignore
        global.window = {};
    });

    it('should remove script tags', () => {
        const maliciousHtml = '<p>Hello</p><script>alert("XSS")</script>';
        const sanitized = sanitizeHtml(maliciousHtml);
        expect(sanitized).not.toContain('<script');
        expect(sanitized).not.toContain('alert');
    });

    it('should remove onclick handlers', () => {
        const maliciousHtml = '<button onclick="alert(\'XSS\')">Click me</button>';
        const sanitized = sanitizeHtml(maliciousHtml);
        expect(sanitized).not.toContain('onclick');
    });

    it('should allow safe HTML tags', () => {
        const safeHtml = '<h1>Title</h1><p>Paragraph</p><a href="https://example.com">Link</a>';
        const sanitized = sanitizeHtml(safeHtml);
        expect(sanitized).toContain('<h1>');
        expect(sanitized).toContain('<p>');
        expect(sanitized).toContain('<a');
    });

    it('should add rel="noopener noreferrer" to external links', () => {
        const html = '<a href="https://example.com">External Link</a>';
        const sanitized = sanitizeHtml(html);
        expect(sanitized).toContain('rel="noopener noreferrer"');
        expect(sanitized).toContain('target="_blank"');
    });

    it('should remove iframe tags', () => {
        const maliciousHtml = '<iframe src="https://evil.com"></iframe>';
        const sanitized = sanitizeHtml(maliciousHtml);
        expect(sanitized).not.toContain('<iframe');
    });

    it('should handle empty string', () => {
        const sanitized = sanitizeHtml('');
        expect(sanitized).toBe('');
    });
});

describe('containsMaliciousContent', () => {
    it('should detect script tags', () => {
        expect(containsMaliciousContent('<script>alert("XSS")</script>')).toBe(true);
    });

    it('should detect javascript: protocol', () => {
        expect(containsMaliciousContent('<a href="javascript:alert(1)">Click</a>')).toBe(true);
    });

    it('should detect event handlers', () => {
        expect(containsMaliciousContent('<img onerror="alert(1)">')).toBe(true);
        expect(containsMaliciousContent('<div onclick="alert(1)">Click</div>')).toBe(true);
    });

    it('should detect iframe tags', () => {
        expect(containsMaliciousContent('<iframe src="evil.com"></iframe>')).toBe(true);
    });

    it('should return false for safe content', () => {
        expect(containsMaliciousContent('<p>Safe content</p>')).toBe(false);
        expect(containsMaliciousContent('<a href="https://example.com">Link</a>')).toBe(false);
    });
});
