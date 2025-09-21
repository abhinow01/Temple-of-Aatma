'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CKEditorComponent({ value = '', onChange, index }) {
  return (
    <div className="ckeditor-wrapper">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              'link',
              '|',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'blockQuote',
              'insertTable',
              '|',
              'undo',
              'redo'
            ]
          },
          language: 'en',
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableProperties',
              'tableCellProperties'
            ]
          },
          licenseKey: '',
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          if (typeof index === 'number') {
            onChange(index, data);
          } else {
            onChange(data);
          }
        }}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
}