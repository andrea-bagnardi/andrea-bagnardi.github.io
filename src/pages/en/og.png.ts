import type { APIRoute } from 'astro';

import { renderShareImage } from '../../lib/share-image';

export const GET: APIRoute = () => renderShareImage('en');
