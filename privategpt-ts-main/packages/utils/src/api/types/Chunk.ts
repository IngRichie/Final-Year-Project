/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as PrivategptApi from '..';

export interface Chunk {
  object?: unknown;
  score: number;
  document: PrivategptApi.IngestedDoc;
  text: string;
  previousTexts?: string[];
  nextTexts?: string[];
}
