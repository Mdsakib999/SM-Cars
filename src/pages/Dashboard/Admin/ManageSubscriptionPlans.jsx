import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllSubscriptionsQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useCreateSubscriptionMutation,
} from "../../../redux/apiSlice";
import SubscriptionModal from "../../../components/DashboardComponent/Admin/SubscriptionModal";
import DeleteModal from "../../../components/DashboardComponent/Admin/DeleteModal";

const ManageSubscriptionPlans = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("seller");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalType, setModalType] = useState(""); // "create", "edit", "delete"

  // API hooks
  const { data, isLoading, isError, refetch } = useGetAllSubscriptionsQuery();
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const [createSubscription] = useCreateSubscriptionMutation();

  const initialFormState = {
    name: "",
    price: 1,
    duration: 30,
    features: "",
    tier: 2,
  };

  const [formState, setFormState] = useState(initialFormState);

  const openModal = (type, plan = null) => {
    setSelectedPlan(plan);
    setModalType(type);
    if (type === "edit" && plan) {
      // Pre-populate form with previous data
      setFormState({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        features: plan.features.join(", "),
        tier: plan.tier,
        ...(activeTab === "seller"
          ? { carListingLimit: plan.carListingLimit }
          : { carBiddingLimit: plan.carBiddingLimit }),
      });
    } else {
      setFormState({
        ...initialFormState,
        ...(activeTab === "seller"
          ? { carListingLimit: 0 }
          : { carBiddingLimit: 0 }),
      });
    }
  };

  const closeModal = () => setModalType("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If not free plan (price > 0) then ensure tier > 1.
    if (formState.price > 0 && formState.tier <= 1) {
      alert("For non‑free plans, tier must be greater than 1.");
      return;
    }
    try {
      // Convert comma-separated features into an array
      const featuresArray = formState.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);
      const payload = {
        ...formState,
        type: activeTab,
        features: featuresArray,
      };

      if (modalType === "edit" && selectedPlan) {
        await updateSubscription({
          type: activeTab,
          id: selectedPlan._id,
          updateData: payload,
        }).unwrap();
      } else {
        await createSubscription(payload).unwrap();
      }
      refetch();
      closeModal();
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedPlan) return;
    try {
      await deleteSubscription({
        type: activeTab,
        id: selectedPlan._id,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
    closeModal();
  };

  // Filter subscriptions based on activeTab
  const filteredSubscriptions =
    activeTab === "seller"
      ? data?.sellerSubscriptions || []
      : data?.buyerSubscriptions || [];

  return (
    <div className="p-8">
      {/* Tabs for Seller/Buyer */}
      <div className="flex mb-6 ">
        {["seller", "buyer"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 ${
              activeTab === type ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-md mr-2`}
            onClick={() => setActiveTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Plans
          </button>
        ))}
      </div>

      {/* Create Plan Button */}
      <div className="text-right mb-6 ">
        <button
          onClick={() => openModal("create")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Create New Plan
        </button>
      </div>

      {/* Subscription List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching subscriptions.</p>
      ) : (
        <div className="grid gap-4">
          {filteredSubscriptions.map((plan) => {
            // Identify free plan by tier === 1 and price === 0.
            const isFreePlan = plan.tier === 1 && plan.price === 0;
            return (
              <div
                key={plan._id}
                className="p-4 border rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p>
                    ৳{plan.price} / {plan.duration} days
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal("edit", plan)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", plan)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {(modalType === "create" || modalType === "edit") && (
        <SubscriptionModal
          activeTab={activeTab}
          type={modalType}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
      {modalType === "delete" && (
        <DeleteModal onDelete={handleDelete} onClose={closeModal} />
      )}
    </div>
  );
};

export default ManageSubscriptionPlans;
