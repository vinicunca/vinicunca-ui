import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { config } from '@vue/test-utils';
import ResizeObserver from 'resize-observer-polyfill';

vi.stubGlobal('ResizeObserver', ResizeObserver);

config.global.stubs = {};

export const restHandlers = [
  rest.get(/google/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.text('@font-face mocked {}'));
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
