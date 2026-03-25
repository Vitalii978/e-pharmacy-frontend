import React, { useState } from 'react';
import { useSuppliers } from '../../../../hooks/useSuppliers';
import EditBtn from '../../EditBtn/EditBtn';
import EditSupplierForm from '../../EditSupplierForm/EditSupplierForm';
import './SuppliersItem.css';

const SuppliersItem = ({ supplier }) => {
  const { name, address, status, amount, date, suppliers, _id } = supplier;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { suppliersLoading } = useSuppliers();
  const isLoading = suppliersLoading && isSubmitting;

  let amountValue = amount;
  if (amount && amount.charAt(0) === '৳') {
    amountValue = amount.substring(1);
  }

  const getStatusClass = status => {
    return status === 'Active'
      ? 'status-badge active'
      : 'status-badge deactive';
  };

  return (
    <>
      {openEditModal && (
        <EditSupplierForm
          setIsModalOpen={setOpenEditModal}
          supplier={supplier}
          setIsSubmitting={setIsSubmitting}
        />
      )}

      <tr className="supplier-row">
        <td className="supplier-celll name-celll">
          {isLoading ? <span className="loader">...</span> : name}
        </td>

        <td className="supplier-celll address-celll">
          {isLoading ? <span className="loader">...</span> : address}
        </td>

        <td className="supplier-celll company-celll">
          {isLoading ? <span className="loader">...</span> : suppliers}
        </td>

        <td className="supplier-celll date-celll">
          {isLoading ? <span className="loader">...</span> : date}
        </td>

        <td className="supplier-celll amount-celll">
          {isLoading ? <span className="loader">...</span> : amountValue}
        </td>

        <td className="supplier-celll status-celll ">
          {isLoading ? (
            <span className="loader">...</span>
          ) : (
            <span className={getStatusClass(status)}>{status}</span>
          )}
        </td>

        <td className="supplier-celll action-celll">
          <EditBtn setOpenEditModal={setOpenEditModal} />
        </td>
      </tr>
    </>
  );
};

export default SuppliersItem;
