import useValidation from "@/formik/useValidation";
import { ResetPasswordValidationSchema } from "@/formik/validationSchema";
import { useForgotMutation, useLazyVerifyResetTokenQuery, useResetMutation } from "@/services/nodeApi";
import Image1 from "@/assets/logo.png";
import Input from "@/components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("t");
  const [validToken, validTokenSet] = useState(null);

  const [loading, loadingSet] = useState(false);

  if (!token) navigate("/");

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const formik = useValidation({
    initialValues,
    handleSubmit,
    validationSchema: ResetPasswordValidationSchema,
  });

  const [reset, { isLoading }] = useResetMutation();
  const [verifyResetToken] = useLazyVerifyResetTokenQuery();

  useEffect(() => {
    async function verify() {
      try {
        const response = await verifyResetToken(token);
        if (response?.data) validTokenSet(token);
        else navigate("/");
      } catch (err) {
        navigate("/");
      } finally {
        loadingSet(false);
      }
    }

    verify();
  }, []);

  async function handleSubmit(values) {
    try {
      const res = await reset({ ...values, token });
      if (res?.data) {
        navigate("/");
      }
    } catch (err) {}
  }

  return !validToken ? null : loading ? (
    <div className="h-screen w-screen flex items-center justify-center size-52 bg-white">Loading ...</div>
  ) : (
    <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-[400px] shadow-lg relative mx-4">
        <div className="flex justify-center mb-4">
          <img src={Image1} alt="Logo" className="w-14 md:w-18 object-contain" />
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800">Reset Password</h2>
        <div className="space-y-1 mt-3">
          <Input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter your new password"
            error={formik.touched.password && !!formik.errors.password}
            errorMsg={formik.touched.password && formik.errors.password}
          />
        </div>

        <div className="space-y-1 mt-3">
          <Input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Confirm your new password"
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            errorMsg={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </div>

        <button type="button" disabled={isLoading} onClick={formik.handleSubmit} className="w-full cursor-pointer bg-black text-white rounded-full py-2 mt-5">
          {isLoading ? "Resetting ..." : "Reset Password"}
        </button>

        <p onClick={() => navigate("/")} className="text-center text-sm mt-4 cursor-pointer hover:underline">
          Back to Home
        </p>
      </div>
    </div>
  );
}
