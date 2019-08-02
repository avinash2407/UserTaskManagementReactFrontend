import React from "react";
import { Field, reduxForm } from "redux-form";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div style={{ padding: "0px 300px 0px 300px" }}>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
      {touched &&
        error && <span>{error}</span>}
    </div>
  </div>
);

const SubmitValidationForm = props => {
  const { error ,handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="col text-center">
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        {error && <strong>{error}</strong>}
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "submitValidation" // a unique identifier for this form
})(SubmitValidationForm);
