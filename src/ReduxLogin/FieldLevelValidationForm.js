import React from "react";
import { Field, reduxForm } from "redux-form";

const required = value => (value ? undefined : "Required");
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const password = value =>
  value &&
  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}).+$/i.test(value)
    ? "Password must contain atleast one each of capital letters,small lettes,numbers and special characters. Should also be atleast 8 strong"
    : undefined;

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
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
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const FieldLevelValidationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="col text-center">
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
          validate={email}
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
          validate={[required]}
          warn={password}
        />
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
  form: "fieldLevelValidation" // a unique identifier for this form
})(FieldLevelValidationForm);
