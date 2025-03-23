import Image1 from "../assets/logo.png";
import PropTypes from "prop-types"; // Import PropTypes
import useValidation from "../formik/useValidation";
import { SignupValidationSchema } from "../formik/validationSchema";
import { useRegisterMutation } from "@/services/nodeApi";
import Input from "@/components/Input";

export default function Signup({ modalTypeSet }) {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useValidation({
    initialValues,
    handleSubmit,
    validationSchema: SignupValidationSchema,
    enableReinitialize: false,
  });

  const [register, { isLoading }] = useRegisterMutation();

  async function handleSubmit(values) {
    try {
      const res = await register(values);
      if (res?.data) modalTypeSet("Login");
    } catch (err) {}
  }

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-[400px] shadow-lg relative mx-4">
        <button onClick={() => modalTypeSet("")} className="absolute top-4 font-bold cursor-pointer right-4 text-3xl">
          &times;
        </button>

        <div className="flex justify-center mb-4">
          <img src={Image1} alt="Logo" className="w-14 md:w-18 object-contain" />
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800">Create new account</h2>
        <div className="space-y-1 mt-5">
          <Input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter name"
            error={formik.touched.name && !!formik.errors.name}
            errorMsg={formik.touched.name && formik.errors.name}
          />
        </div>

        <div className="space-y-1 mt-5">
          <Input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter your email"
            error={formik.touched.email && !!formik.errors.email}
            errorMsg={formik.touched.email && formik.errors.email}
          />
        </div>

        <div className="space-y-1 mt-5">
          <Input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Enter phone number"
            error={formik.touched.phone && !!formik.errors.phone}
            errorMsg={formik.touched.phone && formik.errors.phone}
          />
        </div>

        <div className="space-y-1 mt-3">
          <Input
            password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your password"
            error={formik.touched.password && !!formik.errors.password}
            errorMsg={formik.touched.password && formik.errors.password}
          />
        </div>

        <div className="space-y-1 mt-3">
          <Input
            password
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Confirm your password"
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            errorMsg={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </div>

        <button disabled={isLoading} type="button" onClick={formik.handleSubmit} className="w-full cursor-pointer bg-black text-white mt-5 rounded-full py-2">
          {isLoading ? "Signing up ..." : "Create Account"}
        </button>

        <p onClick={() => modalTypeSet("Login")} className="text-center text-sm mt-4 cursor-pointer hover:underline">
          Already have an account? Login!
        </p>
      </div>
    </div>
  );
}

// Add PropTypes validation
Signup.propTypes = {
  modalTypeSet: PropTypes.func.isRequired,
};
