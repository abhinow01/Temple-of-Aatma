'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Create the dynamic component outside of the main component
const DynamicCKEditor = dynamic(
  () => import('./_components/CKEditorComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500">Loading editor...</p>
        </div>
      </div>
    )
  }
);

export default function CkEditor({ value = '', onChange, index }) {
  // Memoize the editor props to prevent unnecessary re-renders
  const editorProps = useMemo(() => ({
    value,
    onChange,
    index
  }), [value, onChange, index]);

  return <DynamicCKEditor {...editorProps} />;
}