import { PropTypes } from "prop-types";
import Image1 from "../assets/logo.png";
import useValidation from "@/formik/useValidation";
import { ForgetPasswordValidationSchema } from "@/formik/validationSchema";
import Input from "@/components/Input";
import { useForgotMutation } from "@/services/nodeApi";

export default function Forget({ modalTypeSet }) {
  const initialValues = {
    email: "",
  };
  const formik = useValidation({
    initialValues,
    handleSubmit,
    validationSchema: ForgetPasswordValidationSchema,
  });

  const [forgot, { isLoading }] = useForgotMutation();

  async function handleSubmit(values) {
    try {
      const res = await forgot(values);
      if (res?.data) modalTypeSet("");
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

        <h2 className="text-center text-xl font-semibold text-gray-800">Forgot your password?</h2>
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

        <button type="button" disabled={isLoading} onClick={formik.handleSubmit} className="w-full cursor-pointer bg-black text-white rounded-full py-2 mt-5">
          {isLoading ? "Checking ..." : "Forget Password"}
        </button>

        <p onClick={() => modalTypeSet("Login")} className="text-center text-sm mt-4 cursor-pointer hover:underline">
          Back to login
        </p>
      </div>
    </div>
  );
}

// Add prop type validation
Forget.propTypes = {
  modalTypeSet: PropTypes.func.isRequired,
};
