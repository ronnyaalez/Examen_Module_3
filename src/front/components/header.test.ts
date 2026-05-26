import { describe, it, expect, vi } from 'vitest';
import { createHeader } from './header';

vi.mock('./base.js', () => ({
    render: vi.fn().mockImplementation(
        (_selector: string, _position: InsertPosition, template: string) => {
            const container = document.createElement('div');
            container.innerHTML = template;
            return container;
        }
    ),
}));

describe('Header', () => {
    it('should render the logo, title, and button', () => {
        const element = createHeader();

        expect(element.querySelector('.header__logo')).not.toBeNull();
        expect(element.querySelector('.header__title')?.textContent).toBe('Productos');
        expect(element.querySelector('.header__nav-button')?.textContent).toBe('Add');
    });

    it ('should render the details element with the correct class and summary', () => {
        const element = createHeader();
        const details = element.querySelector('details.add');
        expect(details).not.toBeNull();
        const summary = details?.querySelector('summary.header__nav-title');
        expect(summary).not.toBeNull();
        expect(summary?.textContent).toBe('Add');
    });
})
