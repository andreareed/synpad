import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import InputWrapper from '../../common/components/forms/InputWrapper';

const validationSchema = Yup.object().shape({
  title: Yup.string().max(255),
  description: Yup.string().max(255),
});

class NotebookForm extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map),
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    notebook: Map(),
  };

  renderForm = ({ errors, touched }) => (
    <Form className="notebook-form">
      <InputWrapper label="Notebook Name" validation={touched.title && errors.title}>
        <Field type="text" name="title" />
      </InputWrapper>
      <InputWrapper label="Description" validation={touched.description && errors.description}>
        <Field component="textarea" name="description" />
      </InputWrapper>
      <div className="notebook-form-buttons">
        <button className="btn" onClick={this.props.onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Create!
        </button>
      </div>
    </Form>
  );

  render() {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          title: '',
          description: '',
        }}
        enableReinitialize
        render={this.renderForm}
        onSubmit={(values, { setSubmitting }) => {
          const { onSubmit, onClose } = this.props;
          for (const key in values) {
            if (!values[key]) {
              delete values[key];
            }
          }
          onSubmit(values).then(action => {
            if (action.response.ok) {
              onClose();
            }
            setSubmitting(false);
          });
        }}
      />
    );
  }
}

export default NotebookForm;
