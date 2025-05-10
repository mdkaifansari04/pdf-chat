'use client';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';

function DocumentViewer(props: { docName: string; docUrl: [{ uri: string }] }) {
  return (
    <div className="flex-1 bg-background rounded-lg shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-sm font-medium">{props.docName}</span>
      </div>
      <div className="h-[500px] overflow-auto">
        <DocViewer documents={props.docUrl} pluginRenderers={DocViewerRenderers} />
      </div>
    </div>
  );
}

export default DocumentViewer;
