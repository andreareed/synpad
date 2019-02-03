import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import InputWrapper from '../../common/components/forms/InputWrapper';

const validationSchema = Yup.object().shape({
  title: Yup.string().max(65),
});

class NotebookForm extends Component {
  static propTypes = {
    notebook: PropTypes.instanceOf(Map),
    onSubmit: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    notebook: Map(),
  };

  renderForm = ({ errors, touched }) => (
    <Form className="notebook-form">
      <InputWrapper label="Notebook Name" validation={touched.title && errors.title} className={this.props.className}>
        <Field type="text" name="title" />
      </InputWrapper>
      <div className="notebook-form-buttons">
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
        }}
        enableReinitialize
        render={this.renderForm}
        onSubmit={(values, { setSubmitting }) => {
          const { onSubmit } = this.props;
          for (const key in values) {
            if (!values[key]) {
              delete values[key];
            }
          }
          onSubmit(values);
          setSubmitting(false);
        }}
      />
    );
  }
}

export default NotebookForm;
