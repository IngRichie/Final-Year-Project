/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as PrivategptApi from '../../../..';

/**
 * @example
 *     {
 *         messages: [],
 *         contextFilter: {}
 *     }
 */
export interface ChatBody {
  messages: PrivategptApi.OpenAiMessage[];
  useContext?: boolean;
  contextFilter?: PrivategptApi.ContextFilter;
  includeSources?: boolean;
  stream?: boolean;
}
