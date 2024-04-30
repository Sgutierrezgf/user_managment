/* eslint-disable react/prop-types */

import Modal from "react-modal";

const EmployeeModal = ({
  isOpen,
  closeModal,
  onSubmit,
  reset,
  errors,
  register,
  title,
  buttonText,
  defaultValues,
  employee,
  employeeRequests,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="flex items-center justify-center"
    >
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">{title}</h1>
        <form onSubmit={onSubmit}>{/* Input fields and form elements */}</form>
      </div>
    </Modal>
  );
};

export default EmployeeModal;
