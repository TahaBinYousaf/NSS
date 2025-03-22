import { useFormik } from "formik";

const useValidation = ({ initialValues, handleSubmit, validationSchema, enableReinitialize = false, stopReset = false }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      await handleSubmit(values, actions);
      !stopReset && actions.resetForm();
    },
    enableReinitialize: enableReinitialize,
  });

  return formik;
};

export default useValidation;
