/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from './core';
import { ContextualCompletions } from './api/resources/contextualCompletions/client/Client';
import { ContextChunks } from './api/resources/contextChunks/client/Client';
import { Ingestion } from './api/resources/ingestion/client/Client';
import { Embeddings } from './api/resources/embeddings/client/Client';
import { Health } from './api/resources/health/client/Client';

export declare namespace PrivategptApiClient {
  interface Options {
    environment: core.Supplier<string>;
  }

  interface RequestOptions {
    timeoutInSeconds?: number;
    maxRetries?: number;
  }
}

export class PrivategptApiClient {
  constructor(protected readonly _options: PrivategptApiClient.Options) {}

  protected _contextualCompletions: ContextualCompletions | undefined;

  public get contextualCompletions(): ContextualCompletions {
    return (this._contextualCompletions ??= new ContextualCompletions(
      this._options,
    ));
  }

  protected _contextChunks: ContextChunks | undefined;

  public get contextChunks(): ContextChunks {
    return (this._contextChunks ??= new ContextChunks(this._options));
  }

  protected _ingestion: Ingestion | undefined;

  public get ingestion(): Ingestion {
    return (this._ingestion ??= new Ingestion(this._options));
  }

  protected _embeddings: Embeddings | undefined;

  public get embeddings(): Embeddings {
    return (this._embeddings ??= new Embeddings(this._options));
  }

  protected _health: Health | undefined;

  public get health(): Health {
    return (this._health ??= new Health(this._options));
  }
}
