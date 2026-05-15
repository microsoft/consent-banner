import { HtmlTools } from './htmlTools';
import { IRichText } from './interfaces/RichText';

describe('HtmlTools.appendTextWithLinks', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
    });

    it('does nothing when content is undefined', () => {
        HtmlTools.appendTextWithLinks(container, undefined);
        expect(container.childNodes.length).toBe(0);
    });

    it('renders plain text when no placeholders are present', () => {
        HtmlTools.appendTextWithLinks(container, { message: 'Hello world' });
        expect(container.textContent).toBe('Hello world');
        expect(container.querySelectorAll('a').length).toBe(0);
    });

    it('substitutes a single {0} placeholder with the matching link', () => {
        const content: IRichText = {
            message: 'Read more {0} please',
            links: [{ text: 'here', href: 'https://example.com' }]
        };
        HtmlTools.appendTextWithLinks(container, content);

        const anchors = container.querySelectorAll('a');
        expect(anchors.length).toBe(1);
        expect(anchors[0].textContent).toBe('here');
        expect(anchors[0].getAttribute('href')).toBe('https://example.com');
        expect(anchors[0].getAttribute('target')).toBe('_blank');
        expect(anchors[0].getAttribute('rel')).toBe('noopener noreferrer');
        expect(container.textContent).toBe('Read more here please');
    });

    it('substitutes multiple placeholders by index', () => {
        const content: IRichText = {
            message: 'See {0} and {1}.',
            links: [
                { text: 'A', href: '/a' },
                { text: 'B', href: '/b' }
            ]
        };
        HtmlTools.appendTextWithLinks(container, content);

        const anchors = container.querySelectorAll('a');
        expect(anchors.length).toBe(2);
        expect(anchors[0].getAttribute('href')).toBe('/a');
        expect(anchors[1].getAttribute('href')).toBe('/b');
        expect(container.textContent).toBe('See A and B.');
    });

    it('drops placeholders whose index is out of range', () => {
        HtmlTools.appendTextWithLinks(container, {
            message: 'Hello {5}!',
            links: [{ text: 'x', href: '/x' }]
        });
        expect(container.querySelectorAll('a').length).toBe(0);
        expect(container.textContent).toBe('Hello !');
    });

    it('renders text only when links is undefined but placeholder is present', () => {
        HtmlTools.appendTextWithLinks(container, { message: 'Hello {0}!' });
        expect(container.querySelectorAll('a').length).toBe(0);
        expect(container.textContent).toBe('Hello !');
    });

    it('treats malformed braces as plain text', () => {
        HtmlTools.appendTextWithLinks(container, { message: 'Hello {a} {} world' });
        expect(container.querySelectorAll('a').length).toBe(0);
        expect(container.textContent).toBe('Hello {a} {} world');
    });

    it('does not interpret HTML in the message (XSS safety)', () => {
        HtmlTools.appendTextWithLinks(container, {
            message: '<script>alert(1)</script>',
            links: []
        });
        expect(container.querySelectorAll('script').length).toBe(0);
        expect(container.textContent).toBe('<script>alert(1)</script>');
    });

    it('does not interpret HTML in link text (XSS safety)', () => {
        HtmlTools.appendTextWithLinks(container, {
            message: 'click {0}',
            links: [{ text: '<b>bold</b>', href: 'javascript:void(0)' }]
        });
        const a = container.querySelector('a')!;
        expect(a.querySelectorAll('b').length).toBe(0);
        expect(a.textContent).toBe('<b>bold</b>');
    });
});