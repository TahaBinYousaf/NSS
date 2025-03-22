import PropTypes from "prop-types"; // ✅ Import PropTypes
import Image1 from "../assets/logo.png";
import { LoginValidationSchema } from "@/formik/validationSchema";
import useValidation from "@/formik/useValidation";
import { useLoginMutation } from "@/services/nodeApi";
import Input from "@/components/Input";

export default function Login({ modalTypeSet }) {
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useValidation({
    initialValues,
    handleSubmit,
    validationSchema: LoginValidationSchema,
  });

  const [login, { isLoading }] = useLoginMutation();

  async function handleSubmit(values) {
    try {
      const res = await login(values);
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

        <h2 className="text-center text-xl font-semibold text-gray-800">Login into your account</h2>

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

        <div className="space-y-1 mt-3">
          <Input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your password"
            error={formik.touched.password && !!formik.errors.password}
            errorMsg={formik.touched.password && formik.errors.password}
          />
        </div>

        <p onClick={() => modalTypeSet("Forget")} className="text-center my-3 text-md cursor-pointer underline">
          Forgot Password?
        </p>

        <button disabled={isLoading} type="button" onClick={formik.handleSubmit} className="w-full cursor-pointer bg-black text-white rounded-full py-2">
          {isLoading ? "Loging in ..." : "Login"}
        </button>

        <p onClick={() => modalTypeSet("Signup")} className="text-center text-sm mt-4 cursor-pointer hover:underline">
          New to NSS? Create an account
        </p>
      </div>
    </div>
  );
}

// ✅ Add PropTypes validation
Login.propTypes = {
  modalTypeSet: PropTypes.func.isRequired, // Ensures modalTypeSet is a required function
};
