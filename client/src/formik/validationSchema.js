import * as Yup from "yup";

const createValidationSchema = fieldName => {
  return Yup.string().required(`${fieldName} is required`);
};

const postalCodeValidation = Yup.string().matches(/^[A-Za-z0-9]{5,7}$/, "Please enter a valid postal code");
const latitudeValidation = Yup.string()
  .required("Latitude is required")
  .matches(/^-?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/, "Invalid Latitude value");
const longitudeValidation = Yup.string()
  .required("Longitude is required")
  .matches(/^-?(180(\.0+)?|1[0-7]\d(\.\d+)?|[1-9]?\d(\.\d+)?)$/, "Invalid Longitude value");
const emailValidation = Yup.string().email("Invalid Email").required("Email is mandatory");
const websiteValidation = Yup.string().matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, "Please enter a valid website URL");
const phoneValidation = Yup.string()
  .matches(/^(?:\+92|92|0)3[0-9]{9}$/, "Please enter (e.g., +92xxxxxxxxxx or 0xxxxxxxxxx)")
  .required("Please enter your phone number");
const requiredPhoneValidation = Yup.string()
  .required("Phone No. is required")
  .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please enter a valid phone number");
const iframeValidation = Yup.string().required("Google's iframe is required to show map");
const inventoryValidation = Yup.number()
  .required("Inventory is mandatory")
  .typeError("Must be integer")
  .positive("Must be greater than 0")
  .integer("Must not be in decimal");
const rateValidation = Yup.number().required("Rate is mandatory").typeError("Must be integer").positive("Must be greater than 0");

const booleanSchema = Yup.boolean();
const dateSchema = Yup.string().required("Date is required");
const startDateSchema = Yup.string()
  .test(
    "isValidDate",
    "Please enter a valid start date (YYYY/MM/DD)",
    value => dayjs(value).isValid() // Check if valid date format
  )
  .required("Start date is required");
const endDateSchema = Yup.string()
  .test("isValidDate", "Please enter a valid end date (YYYY/MM/DD)", value => dayjs(value).isValid())
  .test("isAfterStartDate", "End date must be after start date", function (value) {
    const startDate = dayjs(this.parent.startDate);
    const endDate = dayjs(value);
    return endDate.isAfter(startDate);
  })
  .required("End date is required");

const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm Password is required");

const LoginValidationSchema = Yup.object({
  email: emailValidation,
  password: createValidationSchema("Password"),
});

const ForgetPasswordValidationSchema = Yup.object({
  email: emailValidation,
});

const ResetPasswordValidationSchema = Yup.object({
  password: createValidationSchema("Password"),
  confirmPassword: confirmPasswordValidation,
});

const SignupValidationSchema = Yup.object({
  name: createValidationSchema("Name"),
  email: emailValidation,
  phone: phoneValidation,
  password: createValidationSchema("Password"),
  confirmPassword: confirmPasswordValidation,
});

const ProfileValidationSchema = Yup.object({
  name: createValidationSchema("Name"),
  gender: createValidationSchema("Gender"),
  location: createValidationSchema("Location"),
  phone: phoneValidation,
});

export { LoginValidationSchema, SignupValidationSchema, ForgetPasswordValidationSchema, ResetPasswordValidationSchema, ProfileValidationSchema };
