'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Container } from '@tbergq/components';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <Container>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Something went wrong!</h2>
        <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
          {`We're sorry, but an unexpected error occurred. Our team has been notified.`}
        </p>
        {error.digest && (
          <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Try again
        </button>
      </div>
    </Container>
  );
}
