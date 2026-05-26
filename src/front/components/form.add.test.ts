import { describe, it, expect, vi } from 'vitest';
import { createFormAdd } from './form.add';

vi.mock('./base.js', () => ({
    render: vi.fn((selector: string, position: InsertPosition, template: string) => {
        const container = document.createElement('div');
        container.innerHTML = template;
        return container.firstElementChild;
    }),
}));

describe('createFormAdd', () => {
    it('should render the form correctly', () => {
        const products = [
            { id: 1, name: 'Product 1', description: 'Description 1', category: 'mobile', price: 100, hasPromo: false },
            { id: 2, name: 'Product 2', description: 'Description 2', category: 'computer', price: 200, hasPromo: true },
        ];
        const form = createFormAdd(products);
        expect(form).not.toBeNull();
    });
});

it ('should handle form submission correctly', () => {
    const products = [
        { id: 1, name: 'Product 1', description: 'Description 1', category: 'mobile', price: 100, hasPromo: false },
        { id: 2, name: 'Product 2', description: 'Description 2', category: 'computer', price: 200, hasPromo: true },
    ];
    const form = createFormAdd(products) as HTMLFormElement;
    const consoleSpy = vi.spyOn(console, 'log');

    // Simulate form submission
    const submitEvent = new Event('submit', { cancelable: true });
    form.dispatchEvent(submitEvent);

    expect(consoleSpy).toHaveBeenCalled();
});