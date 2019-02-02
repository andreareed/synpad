import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import InputWrapper from '../../common/components/forms/InputWrapper';

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .max(65)
    .required('First name is required'),
  last_name: Yup.string()
    .trim()
    .max(65)
    .required('Last name is required'),
  email: Yup.string()
    .trim()
    .email()
    .required('Email is required'),
  changingPassword: Yup.boolean(),
  password: Yup.string()
    .trim()
    .when('changingPassword', {
      is: true,
      then: Yup.string().required('Enter your current password'),
    }),
  newPassword: Yup.string()
    .trim()
    .when('changingPassword', {
      is: true,
      then: Yup.string().required('Enter a new password'),
    }),
  confirmPassword: Yup.string().when('changingPassword', {
    is: true,
    then: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
      .required('Confirm password is required'),
  }),
});

class Account extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
  };

  state = {
    editing: null,
    error: null,
  };

  renderForm = ({ handleSubmit, errors, touched, setFieldValue, values }) => {
    const { editing, error } = this.state;

    if (!editing) {
      return null;
    }

    if (values.changingPassword !== (editing === 'password')) {
      setFieldValue('changingPassword', editing === 'password');
    }

    return (
      <Form className="account-form">
        {editing === 'name' && (
          <Fragment>
            <InputWrapper label="First Name" validation={touched.first_name && errors.first_name}>
              <Field name="first_name" />
            </InputWrapper>
            <InputWrapper label="Last Name" validation={touched.last_name && errors.last_name}>
              <Field name="last_name" />
            </InputWrapper>
          </Fragment>
        )}
        {editing === 'email' && (
          <InputWrapper label="Email" validation={touched.email && errors.email}>
            <Field type="email" name="email" />
          </InputWrapper>
        )}
        {editing === 'password' && (
          <Fragment>
            <InputWrapper label="Current Password" validation={touched.currentPassword && errors.currentPassword}>
              <Field type="password" name="password" />
            </InputWrapper>
            <InputWrapper label="New Password" validation={touched.newPassword && errors.newPassword}>
              <Field type="password" name="newPassword" />
            </InputWrapper>
            <InputWrapper label="Confirm New Password" validation={touched.confirmPassword && errors.confirmPassword}>
              <Field type="password" name="confirmPassword" />
            </InputWrapper>
          </Fragment>
        )}
        {error && <div className="form-error">{error}</div>}
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </Form>
    );
  };

  render() {
    const { user, updateUser } = this.props;

    return (
      <div className="account container">
        <div className="account-wrapper">
          <div className="account-row">
            <label>Name</label>
            <div>
              {user.get('first_name')} {user.get('last_name')}{' '}
              <span onClick={() => this.setState({ editing: 'name' })}>Change</span>
            </div>
          </div>
          <div className="account-row">
            <label>Email</label>
            <div>
              {user.get('email')} <span onClick={() => this.setState({ editing: 'email' })}>Change</span>
            </div>
          </div>
          <div className="account-row">
            <label>Password</label>
            <div>
              &bull; &bull; &bull; &bull; &bull; &bull;{' '}
              <span onClick={() => this.setState({ editing: 'password' })}>Change</span>
            </div>
          </div>
          <Formik
            initialValues={{
              first_name: user.get('first_name'),
              last_name: user.get('last_name'),
              email: user.get('email'),
              changingPassword: false,
              password: user.get('password'),
              newPassword: '',
              confirmPassword: '',
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              const preparedValues = Object.assign({}, values);
              delete preparedValues.changingPassword;
              updateUser(user.get('id'), preparedValues).then(action => {
                if (action.response.ok) {
                  actions.resetForm();
                  this.setState({ editing: null, error: null });
                } else if (action.json) {
                  this.setState({ error: action.json.message });
                }
              });
            }}
            render={this.renderForm}
          />
        </div>
      </div>
    );
  }
}

export default Account;
