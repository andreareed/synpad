import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

import ViewNote from './ViewNote';
import ToggleSwitch from '../../common/components/forms/ToggleSwitch';
import InputWrapper from '../../common/components/forms/InputWrapper';
import Icon from '../../common/components/Icon/Icon';
import Modal from '../../common/components/Modal';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .max(65),
  content: Yup.string().trim(),
});

class Note extends Component {
  static propTypes = {
    note: PropTypes.instanceOf(Map),
    onSave: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
    error: '',
    deleteModalVisible: false,
    deleteConfirmation: '',
  };

  renderDisplay = () => {
    const { note } = this.props;
    const { editing } = this.state;

    if (editing) {
      return null;
    }
    return <ViewNote note={note} />;
  };

  toggleSwitch = (values, submitForm) => {
    const { editing } = this.state;

    if (editing) {
      submitForm();
    }
    this.setState({ editing: !editing, error: '' });
  };

  toggleModal = () => this.setState({ notebookModalVisible: !this.state.notebookModalVisible });

  confirmDelete = e => this.setState({ deleteConfirmation: '', deleteModalVisible: false }, this.props.deleteNote);

  renderDeleteModal = () => {
    const { note } = this.props;
    const { deleteModalVisible, deleteConfirmation } = this.state;

    return (
      <Modal isVisible={deleteModalVisible} onClose={this.toggleModal} className="note-delete-modal">
        <h1>Delete this note?</h1>
        <div className="note-delete-message">
          This action cannot be undone. If you're sure, type <span>{note.get('title')}</span> to confirm and this note
          will be deleted.
          <form>
            <InputWrapper>
              <input
                value={deleteConfirmation}
                onChange={({ target }) => this.setState({ deleteConfirmation: target.value })}
              />
            </InputWrapper>
            <div className="note-delete-buttons">
              <button type="button" className="btn">
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={this.confirmDelete}
                disabled={deleteConfirmation !== note.get('title')}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  };

  renderForm = ({ handleSubmit, values }) => {
    const { editing } = this.state;

    return (
      <Form>
        <div className="note-header">
          <div className="note-header-toggle">
            <ToggleSwitch onToggle={() => this.toggleSwitch(values, handleSubmit)} checked={editing} />
            {editing ? 'Save' : 'Edit'}
          </div>
          <Field name="title" readOnly={!editing} autoComplete="off" className="note-header-title" />
          <div onClick={() => this.setState({ deleteModalVisible: true })}>
            <Icon icon="Trash" />
          </div>
        </div>
        {editing && <Field component="textarea" name="content" />}
        {this.renderDisplay(values)}
      </Form>
    );
  };

  render() {
    const { note, onSave, expand } = this.props;
    const { error } = this.state;
    if (!note) {
      return null;
    }

    return (
      <div className={classNames('note', { expand })}>
        {error && <div className="form-error">{error}</div>}
        <Formik
          initialValues={{
            id: note.get('id'),
            notebook_id: note.get('notebook_id'),
            title: note.get('title') || '',
            content: note.get('content') || '',
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            onSave(note.get('id'), values).then(action => {
              if (!action.response.ok) {
                this.toggleSwitch();
                this.setState({ error: 'Oops! Something went wrong, changes not saved' });
              }
              actions.setSubmitting(false);
            });
          }}
          render={this.renderForm}
        />
        {this.renderDeleteModal()}
      </div>
    );
  }
}

export default Note;
