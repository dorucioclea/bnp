import React from 'react';

export default class ImportPDF extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Create by uploading PDF</h3>
          <section className="oc-drag-and-drop">
            <div className="drag-and-drop-canvas text-center" >
              <h2>Drag a file here</h2>
              <h4>or <a href="#">browse</a> for a file to upload.</h4>
            </div>
          </section>
      </div>
    );
  }
}
