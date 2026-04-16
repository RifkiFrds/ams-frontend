'use client';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
