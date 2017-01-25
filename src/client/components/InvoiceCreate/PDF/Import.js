import React from 'react';
import Step2 from './Step2'

export default class ImportPDF extends React.Component {
  constructor(props) {
    super(props);
    this.Component = null;
  }

  componentWillMount() {
    this.decideComponent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.decideComponent(nextProps);
    }
    this.props = nextProps;
  }

  decideComponent = (props) => {
    switch(parseInt(props.params.step)) {
      case 1:
        this.Component = <Step2 />;
        break;
      default:
        this.Component =
          <div>
            <h3>Create by uploading PDF</h3>
            <section className="oc-drag-and-drop">
              <div className="drag-and-drop-canvas text-center" >
                <h2>Drag a file here</h2>
                <h4>or <a href="#">browse</a> for a file to upload.</h4>
              </div>
            </section>
            <br />
            <div className="form-submit text-right">
              <input type="button" onClick={() => {this.props.router.push('/invoice/create/pdf/1')}}  value="Next" className="btn btn-primary" />
            </div>
          </div>;
        break;
    }
  }

  render() {
    return (
      <div>
        {this.Component}
      </div>
    );
  }
}
