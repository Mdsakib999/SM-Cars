import React from "react";

const SubscriptionModal = ({
  type,
  formState,
  setFormState,
  onSubmit,
  onClose,
  activeTab,
}) => {
  // Define free plan as having price === 0 and tier === 1.
  const isFreePlan = formState.price === 0 && formState.tier === 1;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {type === "edit" ? "Edit Plan" : "Create New Plan"}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 py-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Plan Name"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 py-2">
                Price (BDT)
              </label>
              <input
                type="number"
                placeholder="Price"
                value={formState.price}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    price: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                required
                // For free plans (editing), lock the price field.
                readOnly={isFreePlan}
                // For new plans, enforce a minimum price of 1.
                min={type === "create" ? 1 : undefined}
              />
            </div>

            {/* Tier */}
            <div>
              <label className="block text-sm font-medium text-gray-700 py-2">
                Tier
              </label>
              <input
                type="number"
                placeholder="Tier"
                value={formState.tier}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    tier: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                required
                // For free plans, lock the tier field.
                disabled={isFreePlan}
                // Otherwise, enforce a minimum tier of 2.
                min={isFreePlan ? 1 : 2}
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 py-2">
                Duration (days)
              </label>
              <input
                type="number"
                placeholder="Duration"
                value={formState.duration}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    duration: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 py-2">
                Features (comma-separated)
              </label>
              <input
                type="text"
                placeholder="Feature 1, Feature 2"
                value={formState.features}
                onChange={(e) =>
                  setFormState({ ...formState, features: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Conditional Field based on activeTab */}
            {activeTab === "seller" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 py-2">
                  Car Listing Limit
                </label>
                <input
                  type="number"
                  placeholder="Listing Limit"
                  value={formState.carListingLimit}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      carListingLimit: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 py-2">
                  Car Bidding Limit
                </label>
                <input
                  type="number"
                  placeholder="Bidding Limit"
                  value={formState.carBiddingLimit}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      carBiddingLimit: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {type === "edit" ? "Save Changes" : "Create Plan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;
